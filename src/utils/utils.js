import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()




export const apiSuccessResponse = (res, statusCode = 200, message = "Request successful", data = null) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

export const apiErrorResponse = (res, statusCode = 500, message = "An error occurred", error = null) => {
    res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  };