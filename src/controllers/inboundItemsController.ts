import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create an InboundItem
export const createInboundItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { inboundId, inventoryId, amount, typeId } = request.body as {
    inboundId: number;
    inventoryId: number;
    amount: number;
    typeId: number;
  };

  try {
    const newInboundItem = await prisma.inboundItems.create({
      data: {
        inboundId,
        inventoryId,
        amount,
        typeId,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Inbound Item created successfully",
      data: newInboundItem,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating inbound item",
      error,
    });
  }
};

// Get All InboundItems
export const getAllInboundItems = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const inboundItems = await prisma.inboundItems.findMany({
      include: {
        inbound: true,
        inventory: true,
        type: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Inbound Items retrieved successfully",
      data: inboundItems,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving inbound items",
      error,
    });
  }
};

// Get InboundItem by ID
export const getInboundItemById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const inboundItem = await prisma.inboundItems.findUnique({
      where: { id: Number(id) },
      include: {
        inbound: true,
        inventory: true,
        type: true,
      },
    });

    if (!inboundItem) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Inbound Item not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Inbound Item retrieved successfully",
      data: inboundItem,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving inbound item",
      error,
    });
  }
};

// Update InboundItem
export const updateInboundItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { inboundId, inventoryId, amount, typeId } = request.body as {
    inboundId?: number;
    inventoryId?: number;
    amount?: number;
    typeId?: number;
  };

  try {
    const updatedInboundItem = await prisma.inboundItems.update({
      where: { id: Number(id) },
      data: {
        inboundId,
        inventoryId,
        amount,
        typeId,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Inbound Item updated successfully",
      data: updatedInboundItem,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating inbound item",
      error,
    });
  }
};

// Delete InboundItem
export const deleteInboundItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.inboundItems.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Inbound Item deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting inbound item",
      error,
    });
  }
};
