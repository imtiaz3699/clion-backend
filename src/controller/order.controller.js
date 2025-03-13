import { prisma } from "../utils/utils.js";

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
      cartIds,
      products,
    } = req.body;

    if (
      !cartIds ||
      cartIds.length === 0 ||
      !products ||
      products.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Cart IDs and products are required." });
    }

    // Create order with multiple carts and products
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
        carts: { connect: cartIds.map((cartId) => ({ id: cartId })) },
        products: {
          create: products.map(({ productId, quantity }) => ({
            product: { connect: { id: productId } },
            quantity,
          })),
        },
      },
      include: {
        carts: true,
        products: { include: { product: true } },
      },
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
