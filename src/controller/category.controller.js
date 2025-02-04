import {
  apiErrorResponse,
  apiSuccessResponse,
  prisma,
} from "../utils/utils.js";

export const createCategory = async (req, res) => {
  const { category_name, description } = req.body;
  if (!category_name) {
    return apiErrorResponse(res, 400, "Category name is required.");
  }
  try {
    const categoryExists = await prisma.category.findFirst({
      where: {
        category_name: category_name,
      },
    });
    if (categoryExists) {
      return apiErrorResponse(res, 400, "Category already exists.");
    }

    const category = await prisma.category.create({
      data: {
        category_name,
        description,
      },
      select: {
        id: true,
        category_name: true,
        description: true,
      },
    });
    if (category) {
      return apiSuccessResponse(
        res,
        200,
        "Category created successfully.",
        category
      );
    }
  } catch (error) {
    console.log(error.message);
    apiErrorResponse(error, 500, "Error creating category.");
  }
};

export const updatedCategory = async (req, res) => {
  const { category_name, description } = req.body;
  const { id } = req.params;
  if (!id) {
    apiErrorResponse(res, 400, "Category id is required.");
  }
  if (!category_name) {
    return apiErrorResponse(res, 400, "Category name is required.");
  }
  try {
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: id,
      },
      select: { id: true },
    });
    if (!categoryExists) {
      return apiErrorResponse(res, 400, "Category not found.");
    }

    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        category_name,
        description,
      },
      select: {
        id: true,
        category_name: true,
        description: true,
      },
    });
    if (category) {
      return apiSuccessResponse(
        res,
        200,
        "Category updated successfully.",
        category
      );
    }
  } catch (e) {
    console.log(e.message);
    apiErrorResponse(res, 500, "Error updating category.");
  }
};
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return apiErrorResponse(res, 400, "Category id is required.");
  }
  try {
    const categoryExists = await prisma.findUnique({
      where: { id: id },
    });
    if (!categoryExists) {
      return apiErrorResponse(res, 400, "Category not found.");
    }
    const deletedCategory = await prisma.category.delete({
      where: { id: id },
    });
    if (deletedCategory) {
      return apiSuccessResponse(res, 200, "Category deleted successfully.", {});
    }
  } catch (error) {
    console.log(error.message);
    apiErrorResponse(res, 500, "Error deleting category.");
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    return apiSuccessResponse(
      res,
      200,
      "Categories found successfully.",
      categories
    );
  } catch (e) {
    console.log(e)
    apiErrorResponse(res, 500, "Error getting categories.");
  }
};
