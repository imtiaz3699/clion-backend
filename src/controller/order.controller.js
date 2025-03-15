import {
  apiErrorResponse,
  apiSuccessResponse,
  prisma,
} from "../utils/utils.js";

// export const createOrder = async (req, res) => {
//   try {
//     const {
//       email,
//       first_name,
//       last_name,
//       address,
//       city,
//       postal_code,
//       phone_number,
//       user_id,
//       cartIds,
//       products,
//       quantity,
//     } = req.body;
//     if (!products || products.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Cart IDs and products are required." });
//     }

//     // Create order with multiple carts and products
//     const order = await prisma.order.create({
//       data: {
//         email,
//         first_name,
//         last_name,
//         address,
//         city,
//         postal_code,
//         phone_number,
//         user_id,
//         products: {
//           connect: products.map(({ productId, quantity }) => ({
//             id:parseInt(productId,10), // Directly reference productId
//           })),
//         },
//       },
//       include: {
//         products: { include: { product: true } },
//       },
//     });
//     res.status(201).json({ message: "Order created successfully", order });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ message: "Internal server error" ,error});
//   }
// };

export const createOrder = async (req, res) => {
  try {
    const {
      email,
      first_name,
      last_name,
      address,
      city,
      postal_code,
      phone_number,
      user_id,
      quantity,
      products, // Array of { productId, quantity }
    } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Products are required." });
    }

    // Create the order first
    const order = await prisma.order.create({
      data: {
        email,
        first_name,
        last_name,
        address,
        city,
        postal_code,
        phone_number,
        user_id,
      },
    });

    const orderProducts = await Promise.all(
      products.map(({ productId, quantity }) =>
        prisma.orderProducts.create({
          data: {
            orderId: order.id,
            productId: parseInt(productId, 10),
            quantity: quantity,
          },
        })
      )
    );

    // Fetch the complete order with products
    const completeOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        products: { include: { product: true } },
      },
    });

    res.status(201).json({
      message: "Order created successfully",
      order: completeOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// export const updateOrder = async (req, res) => {
//   const orderId = req.params.id;
//   try {
//     const { products, ...orderData } = req.body;

//     // Update order details
//     const updatedOrder = await prisma.order.update({
//       where: { id: orderId },
//       data: orderData,
//     });

//     if (!updatedOrder) {
//       return apiErrorResponse(res, 400, "Order does not exist.");
//     }

//     if (products && products.length > 0) {
//       await Promise.all(
//         products.map(async ({ productId }) => {
//           await prisma.orderProducts.upsert({
//             where: {
//               orderId_productId: { orderId, productId: parseInt(productId, 10) }, // ✅ Now works!
//             },
//             update: {},
//             create: {
//               orderId: orderId,
//               productId: parseInt(productId, 10),
//             },
//           });
//         })
//       );
//     }

//     // Fetch updated order with products
//     const completeOrderUpdate = await prisma.order.findUnique({
//       where: { id: updatedOrder.id },
//       include: {
//         products: { include: { product: true } },
//       },
//     });

//     return apiSuccessResponse(res, 200, "Order updated successfully.", completeOrderUpdate);
//   } catch (e) {
//     console.log(e);
//     return apiErrorResponse(res, 500, "Internal server error.");
//   }
// };

export const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { products, ...orderData } = req.body;

  try {
    // Step 1: Update the order details
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: orderData,
    });

    if (!updatedOrder) {
      return apiErrorResponse(res, 400, "Order does not exist.");
    }

    // Step 2: Delete existing orderProducts to prevent duplication
    await prisma.orderProducts.deleteMany({
      where: { orderId: orderId },
    });

    // Step 3: Insert updated products with correct quantity
    const updatedOrderProducts = await Promise.all(
      products.map(({ productId, quantity }) =>
        prisma.orderProducts.create({
          data: {
            orderId: orderId,
            productId: parseInt(productId, 10),
            quantity: parseInt(quantity, 10),
          },
        })
      )
    );

    // Step 4: Fetch the updated order with product details
    const completeOrderUpdate = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        products: { include: { product: true } },
      },
    });

    return apiSuccessResponse(
      res,
      200,
      "Order updated successfully.",
      completeOrderUpdate
    );
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Internal server error.");
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        products: { include: { product: true } },
      },
    });
    return apiSuccessResponse(res, 200, "Orders fetched successfully.", {
      orders,
    });
  } catch (e) {
    console.log(e);
    return apiSuccessResponse(res, 500, "Internal server error.");
  }
};
