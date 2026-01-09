import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create ItemUnit
export const createItemUnit = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, symbol, description, status } = request.body as {
    name: string;
    symbol: string;
    description?: string;
    status?: string;
  };

  try {
    const newItemUnit = await prisma.itemUnit.create({
      data: { name, symbol, description, status },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Item unit created successfully",
      data: newItemUnit,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating item unit",
      error,
    });
  }
};

// Get All ItemUnits
export const getAllItemUnits = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const itemUnits = await prisma.itemUnit.findMany({
      include: {
        _count: {
          select: { inventories: true },
        },
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Item units retrieved successfully",
      data: itemUnits,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving item units",
      error,
    });
  }
};

// Get ItemUnit by ID
export const getItemUnitById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const itemUnit = await prisma.itemUnit.findUnique({
      where: { id: Number(id) },
      include: {
        inventories: true,
      },
    });

    if (!itemUnit) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Item unit not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Item unit retrieved successfully",
      data: itemUnit,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving item unit",
      error,
    });
  }
};

// Update ItemUnit
export const updateItemUnit = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { name, symbol, description, status } = request.body as {
    name?: string;
    symbol?: string;
    description?: string;
    status?: string;
  };

  try {
    const updatedItemUnit = await prisma.itemUnit.update({
      where: { id: Number(id) },
      data: { name, symbol, description, status },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Item unit updated successfully",
      data: updatedItemUnit,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating item unit",
      error,
    });
  }
};

// Delete ItemUnit
export const deleteItemUnit = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.itemUnit.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Item unit deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting item unit",
      error,
    });
  }
};
