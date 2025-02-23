import {
  apiErrorResponse,
  apiSuccessResponse,
  prisma,
} from "../utils/utils.js";

export const addBannerProducts = async (req, res) => {
  const { product_id, title, description, show } = req.body;
  if (!product_id?.length) {
    return apiErrorResponse(res, 400, "Product is required");
  }
  try {
    const existingProducts = await prisma.product.findMany({
      where: {
        id: { in: product_id },
      },
      select: { id: true },
    });
    const validProductIds = existingProducts.map((p) => p.id);
    if (validProductIds.length !== product_id.length) {
      return apiErrorResponse(res, 400, "Some products do not exist.");
    }
    const banner = await prisma.banner.create({
      data: {
        product: {
          connect: product_id?.map((element) => ({
            id: element,
          })),
        },
        title,
        description,
        show,
      },
    });
    if (banner) {
      return apiSuccessResponse(res, 200, "Banner added successfully", banner);
    }
  } catch (e) {
    console.log(e);
    return apiErrorResponse(
      res,
      500,
      "Internal Server Error.Please try again."
    );
  }
};
export const updateBannerProducts = async (req, res) => {
  const bannerId = req.params.id;
  const { product_id, title, description, show } = req.body;
  if (!bannerId) {
    return apiErrorResponse(res, 400, "Banner id is required.");
  }
  try {
    const existingProducts = await prisma.product.findMany({
      where: {
        id: { in: product_id },
      },
      select: { id: true }, // Only fetch the IDs
    });
    const validProductIds = existingProducts.map((p) => p.id);
    if (validProductIds.length !== product_id.length) {
      return apiErrorResponse(res, 400, "Some products do not exist.");
    }
    const bannerExists = await prisma.banner.findUnique({
      where: { id: bannerId },
    });
    if (bannerExists) {
      const banner = await prisma.banner.update({
        where: { id: bannerId },
        data: {
          product: {
            connect: product_id?.map((element) => ({
              id: element,
            })),
          },
          title,
          description,
          show,
        },
      });
      if (banner) {
        return apiErrorResponse(
          res,
          200,
          "Banner updated successfully",
          banner
        );
      }
    } else {
      return apiErrorResponse(res, 400, "Banner not found.");
    }
  } catch (e) {
    console.log(e);
    apiErrorResponse(res, 500, "Internal Server Error.");
  }
};

export const getBannerProducts = async (req, res) => {
  try {
    const banner = await prisma.banner.findMany({
      where: { show: true },
      include: {
        product: true,
      },
    });
    if (banner) {
      return apiSuccessResponse(
        res,
        200,
        "Banner product fetched successfully.",
        banner
      );
    }
  } catch (e) {
    console.log(e);
    return apiErrorResponse(
      res,
      500,
      "Internal Server Error.Please try again."
    );
  }
};
export const deleteBanner = async (req, res) => {
  const bannerId = req.params.id;
  if (!bannerId) {
    return apiErrorResponse(res, 400, "Banner id is required.");
  }
  try {
    const bannerExists = await prisma.banner.findUnique({
      where: { id: bannerId },
    });

    if (bannerExists) {
      const banner = await prisma.banner.delete({
        where: { id: bannerId },
        include: {
          product: true,
        },
      });
      if (banner) {
        return apiSuccessResponse(
          res,
          200,
          "Banner deleted successfully.",
          null
        );
      }
    } else {
      return apiErrorResponse(res, 400, "Banner not found.");
    }
  } catch (e) {
    console.log(e);
    return apiSuccessResponse(
      res,
      500,
      "Internal Server error.Please try again later."
    );
  }
};
