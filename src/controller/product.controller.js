import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {
  apiErrorResponse,
  apiSuccessResponse,
  prisma,
} from "../utils/utils.js";
export const addProduct = async (req, res) => {
  const {
    product_name,
    product_description,
    quantity,
    product_condition,
    price,
    user_id,
    product_category,
    featured,
  } = req.body;

  if (!product_name) {
    return apiErrorResponse(res, 400, "Product name is required");
  }
  if (!user_id) {
    return apiErrorResponse(res, 400, "User Id is required.");
  }
  console.log(req.files?.product_img);
  let uploadedImages = [];
  if (req?.files?.product_img) {
    uploadedImages = await Promise.all(
      req?.files?.product_img?.map(async (file) => {
        const uploadedImage = await uploadOnCloudinary(file.path);
        return uploadedImage.url; // Store only the image URL
      })
    );
  }
  try {
    const product = await prisma.product.create({
      data: {
        product_name,
        product_description,
        quantity: parseInt(quantity, 10),
        product_condition,
        product_img: uploadedImages,
        price: parseInt(price, 10),
        user_id: parseInt(user_id, 10),
        product_category,
        featured: Boolean(featured),
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
  console.log(productId, "fadlfjhldakfj");
  const {
    product_name,
    product_description,
    product_img,
    quantity,
    product_condition,
    price,
    user_id,
    featured,
    product_category,
  } = req.body;
  if (!productId) {
    return apiErrorResponse(res, 400, "Product Id is required");
  }
  if (!product_name) {
    return apiErrorResponse(res, 400, "Product Name is required.");
  }
  try {
    const uploadedImages = await Promise.all(
      req?.files?.product_img?.map(async (file) => {
        const uploadedImage = await uploadOnCloudinary(file.path);
        return uploadedImage.url; // Store only the image URL
      })
    );
    const product = await prisma.product.update({
      where: { id: parseInt(productId, 10), user_id: user_id },
      data: {
        product_name,
        product_description,
        product_img: uploadedImages,
        quantity,
        product_condition,
        price,
        user_id,
        featured,
        product_category,
      },
    });
    if (!product) {
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
    const productExists = await prisma.product.findUnique({
      where: { id: parseInt(productId, 10) },
    });
    if (!productExists) {
      return apiErrorResponse(res, 400, "Product not found.");
    }
    const product = await prisma.product.delete({
      where: { id: parseInt(productId, 10) },
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
  const { page = 1, limit = 10, productId, userId,categoryId,search } = req.query;

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;

  let whereClause = {};
  if (userId) {
    whereClause = { user_id: parseInt(userId, 10) };
  }
  if (productId) {
    whereClause = { ...whereClause, id: parseInt(productId, 10) };
  }
  if(categoryId) {
    whereClause = { ...whereClause, product_category: categoryId };
  }
  if(search) {
    whereClause = { ...whereClause, product_name: { contains: search } };
  }
  try {
    const skip = (pageNum - 1) * limitNum;
    const products = await prisma.product.findMany({
      where: whereClause,
      include:{
        category:true,
        user:true,
      },
      skip: skip >= 0 ? skip : 0, 
      take: limitNum, 
    });
    const totalProducts = await prisma.product.count({ where: whereClause });
    const totalPages = Math.ceil(totalProducts / limitNum);
    return apiSuccessResponse(res, 200, "Products retrieved successfully", {
      products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalProducts,
        limit: limitNum,
      },
    });
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Error getting products");
  }
};

export const getSingleProduct = async (req,res) => {
  const productId = req.params.id;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId, 10) },
    });
    if (!product) {
      return apiErrorResponse(res, 400, "Product not found.");
    }
    if (product) {
      return apiSuccessResponse(res, 200, "Product found successfully.", product);
    }
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Error getting product");
  }
}