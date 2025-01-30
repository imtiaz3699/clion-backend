import { apiErrorResponse, apiSuccessResponse, prisma } from "../utils/utils";
export const addProduct = async (req, res) => {
  const {
    product_name,
    product_description,
    product_images,
    quantity,
    product_condition,
    price,
    user_id,
    category,
  } = req.body;
  if (!product_name) {
    return apiErrorResponse(res, 400, "Product name is required");
  }
  if (!user_id) {
    return apiErrorResponse(res, 400, "User Id is required.");
  }
  try {
    const product = await prisma.product.create({
      data: {
        product_name,
        product_description,
        product_images,
        quantity,
        product_condition,
        price,
        user_id,
        category,
      },
      select: {
        product_name: true,
      },
    });
    if (!product) {
      return apiErrorResponse(res, 500, "Error creating product");
    }
    if (product) {
      return apiSuccessResponse(
        res,
        200,
        "Product created successfully",
        product
      );
    }
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Error creating product");
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const {
    product_name,
    product_description,
    product_images,
    quantity,
    product_condition,
    price,
    user_id,
    category,
  } = req.body;
  if (!productId) {
    return apiErrorResponse(res, 400, "Product Id is required");
  }
  if (!product_name) {
    return apiErrorResponse(res, 400, "Product Name is required.");
  }
  try {
    const product = await prisma.product.update({
      where: { product_id: productId, user_id: user_id },
      data: {
        product_name,
        product_description,
        product_images,
        quantity,
        product_condition,
        price,
        user_id,
        category,
      },
      select: {
        product_name: true,
      },
    });
    if (!product.id) {
      return apiErrorResponse(res, 400, "Product not found.");
    }
    if (product) {
      return apiSuccessResponse(
        res,
        200,
        "Product updated successfully",
        product
      );
    }
  } catch (error) {
    console.log(error);
    apiErrorResponse(res, 500, "Error updating product");
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return apiErrorResponse(res, 400, "Product Id is required.");
  }
  try {
    const product = await prisma.product.delete({
      where: { product_id: productId, user_id: req.user.id },
    });
    if (product) {
      return apiSuccessResponse(res, 200, {}, "Product deleted successfully.");
    }
  } catch (error) {
    console.log(error);
    apiErrorResponse(res, 500, "Error deleting product");
  }
};
export const getProducts = async (req, res) => {
  const productId = req.query.id;
  try {
    const products = await prisma.product.findMany({
      where: { user_id: req.user.id,id:productId },
      select: {
        product_name: true,
        product_description: true,
        product_images: true,
        quantity: true,
        product_condition: true,
        price: true,
        category: true,
        },
    });
    if (!products) {
      return apiErrorResponse(res, 400, "Products not found.");
    }
    if (products) {
      return apiSuccessResponse(
        res,
        200,
        "Products found successfully",
        products
      );
    }
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Error getting products");
  }
};