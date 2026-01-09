import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create ItemCategory
export const createItemCategory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description, status } = request.body as {
    name: string;
    description?: string;
    status?: string;
  };

  try {
    const newItemCategory = await prisma.itemCategory.create({
      data: { name, description, status },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Item category created successfully",
      data: newItemCategory,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating item category",
      error,
    });
  }
};

// Get All ItemCategories
export const getAllItemCategories = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const itemCategories = await prisma.itemCategory.findMany({
      include: {
        _count: {
          select: { inventories: true },
        },
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Item categories retrieved successfully",
      data: itemCategories,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving item categories",
      error,
    });
  }
};

// Get ItemCategory by ID
export const getItemCategoryById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const itemCategory = await prisma.itemCategory.findUnique({
      where: { id: Number(id) },
      include: {
        inventories: true,
      },
    });

    if (!itemCategory) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Item category not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Item category retrieved successfully",
      data: itemCategory,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving item category",
      error,
    });
  }
};

// Update ItemCategory
export const updateItemCategory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { name, description, status } = request.body as {
    name?: string;
    description?: string;
    status?: string;
  };

  try {
    const updatedItemCategory = await prisma.itemCategory.update({
      where: { id: Number(id) },
      data: { name, description, status },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Item category updated successfully",
      data: updatedItemCategory,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating item category",
      error,
    });
  }
};

// Delete ItemCategory
export const deleteItemCategory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.itemCategory.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Item category deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting item category",
      error,
    });
  }
};
