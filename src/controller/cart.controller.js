import {
  apiErrorResponse,
  apiSuccessResponse,
  prisma,
} from "../utils/utils.js";

export const addRemoveFromCart = async (req, res) => {
  const { userId, productId, quantity, guestId } = req.body;
  if (!guestId && !productId) {
    return apiErrorResponse(res, 400, "Product id and user id is required.");
  }
  if (quantity < 1) {
    return apiErrorResponse(res, 400, "Quantity is required.");
  }
  try {
    const cartExists = await prisma.cart.findFirst({
      where: { product_id: productId, guestId: guestId },
    });
    if (cartExists) {
      const updateCart = await prisma.cart.update({
        where: { id:cartExists.id,product_id: productId, guestId: guestId },
        data: { quantity: quantity },
      });
      return apiSuccessResponse(res, 200, "Product added to cart", updateCart);
    } else {
      const createCart = await prisma.cart.create({
        data: {
          ...(userId && { user_id: userId }),
          product_id: productId,
          quantity: quantity,
          guestId: guestId,
        },
      });
      return apiSuccessResponse(res, 200, "Product added to cart", createCart);
    }
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Internal server error.");
  }
};
export const updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { userId, productId, quantity } = req.body;
  if (!cartId) {
    return apiErrorResponse(res, 400, "Cart id is required");
  }
  if (!productId) {
    return apiErrorResponse(res, 400, "Product Id is required");
  }
  if (!userId) {
    return apiErrorResponse(res, 400, "User id is required.");
  }
  try {
    const cartExists = await prisma.cart.findUnique({
      where: { id: cartId },
    });
    if (!cartExists) {
      return apiErrorResponse(res, 400, "Cart does not exists.");
    }
    const update = await prisma.cart.update({
      where: { id: cartId, user_id: userId },
      data: {
        product_id: productId,
        quantity: quantity,
      },
    });
    return apiSuccessResponse(res, 200, "Cart updated", update);
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Internal server error.");
  }
};
export const getCart = async (req, res) => {
  const userId = req.query.userId;
  const { page = 1, limit = 10, guestId } = req.query;
  console.log(guestId, "fadsfljaskfhdas");
  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const cart = await prisma.cart.findMany({
      where: { guestId: guestId },
      include: { product: true },
    });
    const totalAmount = cart.reduce((total, product) => {
      return total + product?.product?.price * product?.product?.quantity;
    }, 0);
    console.log(cart, totalAmount);
    const data = {
      products: cart,
      totalAmount: totalAmount,
    };
    return apiSuccessResponse(res, 200, "Cart fetched successfully.", data);
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Internal server error.");
  }
};

export const removeFromCart = async (req, res) => {
  const cartId = req.params.id;

  if (!cartId) {
    return apiErrorResponse(res, 200, "Cart does not exists.");
  }
  try {
    const isCartExisted = await prisma.cart.findUnique({
      where: { id: cartId },
    });
    if (!isCartExisted?.id) {
      return apiErrorResponse(res, 400, "Cart does not exist.");
    }
    const deleteCart = await prisma.cart.delete({
      where: { id: cartId },
    });
    return apiSuccessResponse(
      res,
      200,
      "Product has been removed from cart",
      []
    );
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Internal Server error.");
  }
};
