import {
  apiErrorResponse,
  apiSuccessResponse,
  prisma,
} from "../utils/utils.js";

export const addRemoveFromCart = async (res, req) => {
  const { userId, productId } = req.body;

  if (!userId && !productId) {
    return apiErrorResponse(res, 400, "Product id and user id is required.");
  }
  try {
    const createCart = await prisma.cart.create({
      data: {
        user_id: userId,
        product_id: productId,
      },
    });
    return apiSuccessResponse(res, 200, "Product added to cart", createCart);
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Internal server error.");
  }
};

export const getCart = async (req, res) => {
  const userId = req.query.userId;
  try {
    const cart = await prisma.cart.findMany({
      where: { user_id: userId },
    });
    return apiSuccessResponse(res, 200, "Cart fetched successfully.", cart);
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Internal server error.");
  }
};

export const removeFromCart = async (req, res) => {
  console.log(req, "fadsljfhk"); // You can remove or adjust this for debugging
  const { cartId, userId } = req.body;

  if (!cartId || !userId) {
    return apiErrorResponse(res, 200, "Cart does not exists.");
  }

  try {
    const isCartExisted = await prisma.cart.findUnique({
      where: { id: cartId, user_id: userId },
    });

    if (!isCartExisted?.id) {
      return apiErrorResponse(res, 400, "Cart does not exist.");
    }

    const deleteCart = await prisma.cart.delete({
      where: { user_id: userId, id: cartId },
    });

    return apiSuccessResponse(
      res,
      200,
      "Product has been removed from cart",
      deleteCart
    );
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Internal Server error.");
  }
};
