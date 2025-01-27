import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create a RequestItem
export const createRequestItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { requestId, inventoryId, amount, typeId } = request.body as {
    requestId: number;
    inventoryId: number;
    amount: number;
    typeId: number;
  };

  try {
    const newRequestItem = await prisma.requestItems.create({
      data: {
        requestId,
        inventoryId,
        amount,
        typeId,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Request Item created successfully",
      data: newRequestItem,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating request item",
      error,
    });
  }
};

// Get All RequestItems
export const getAllRequestItems = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const requestItems = await prisma.requestItems.findMany({
      include: {
        request: true,
        inventory: true,
        type: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Request Items retrieved successfully",
      data: requestItems,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving request items",
      error,
    });
  }
};

// Get RequestItem by ID
export const getRequestItemById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const requestItem = await prisma.requestItems.findUnique({
      where: { id: Number(id) },
      include: {
        request: true,
        inventory: true,
        type: true,
      },
    });

    if (!requestItem) {
      return sendResponse(reply, 404, {
        success: false,
        message: "RequestItem not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Request Item retrieved successfully",
      data: requestItem,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving request item",
      error,
    });
  }
};

// Update RequestItem
export const updateRequestItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { inventoryId, amount, typeId } = request.body as {
    inventoryId?: number;
    amount?: number;
    typeId?: number;
  };

  try {
    const updatedRequestItem = await prisma.requestItems.update({
      where: { id: Number(id) },
      data: {
        inventoryId,
        amount,
        typeId,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Request Item updated successfully",
      data: updatedRequestItem,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating request item",
      error,
    });
  }
};

// Delete RequestItem
export const deleteRequestItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.requestItems.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Request Item deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting request item",
      error,
    });
  }
};
