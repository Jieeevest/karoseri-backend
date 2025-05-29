import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

export const getAllKaroseriCategories = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    /** Get query parameters */
    const { page, limit, sortBy, sortOrder } = request.query as {
      page?: string;
      limit?: string;
      sortBy?: string;
      sortOrder?: string;
      keyword?: string;
    };

    /** Set pagination parameters */
    const pageNumber = parseInt(page || "1", 10);
    const pageSize = parseInt(limit || "10", 10);
    const orderField = sortBy || "createdAt";
    const orderDirection = sortOrder?.toLowerCase() === "desc" ? "desc" : "asc";

    /** Set options */
    const options = {
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: { [orderField]: orderDirection },
    };

    const categories = await prisma.karoseriCategory.findMany({
      ...options,
    });

    /** Count vehicles */
    const locationCount = await prisma.karoseriCategory.count();

    return sendResponse(reply, 200, {
      success: true,
      message: "Categories retrieved successfully",
      data: {
        categories,
        totalData: locationCount,
        pageNumber,
        pageSize,
        orderBy: orderField,
        orderDirection,
      },
    });
  } catch (error) {
    console.log(error);
    return sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving categories",
      error,
    });
  }
};

export const getKaroseriCategoryById = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const karoseriCategory = await prisma.karoseriCategory.findUnique({
    where: { id: Number(id) },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: karoseriCategory,
  });
};

export const createKaroseriCategory = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description } = req.body as {
    name: string;
    description: string;
  };
  const karoseriCategory = await prisma.karoseriCategory.create({
    data: { name, description },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: karoseriCategory,
  });
};

export const updateKaroseriCategory = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const { name, description } = req.body as {
    name: string;
    description: string;
  };
  const karoseriCategory = await prisma.karoseriCategory.update({
    where: { id: Number(id) },
    data: { name, description },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: karoseriCategory,
  });
};

export const deleteKaroseriCategory = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const karoseriCategory = await prisma.karoseriCategory.delete({
    where: { id: Number(id) },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success ",
    data: karoseriCategory,
  });
};
