import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create an OutboundItem
export const createOutboundItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { outboundId, inventoryId, amount, typeId } = request.body as {
    outboundId: number;
    inventoryId: number;
    amount: number;
    typeId: number;
  };

  try {
    const newOutboundItem = await prisma.outboundItems.create({
      data: {
        outboundId,
        inventoryId,
        amount,
        typeId,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Outbound Item created successfully",
      data: newOutboundItem,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating outbound item",
      error,
    });
  }
};

// Get All OutboundItems
export const getAllOutboundItems = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const outboundItems = await prisma.outboundItems.findMany({
      include: {
        outbound: true,
        inventory: true,
        type: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Outbound Items retrieved successfully",
      data: outboundItems,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving outbound items",
      error,
    });
  }
};

// Get OutboundItem by ID
export const getOutboundItemById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const outboundItem = await prisma.outboundItems.findUnique({
      where: { id: Number(id) },
      include: {
        outbound: true,
        inventory: true,
        type: true,
      },
    });

    if (!outboundItem) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Outbound Item not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Outbound Item retrieved successfully",
      data: outboundItem,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving outbound item",
      error,
    });
  }
};

// Update OutboundItem
export const updateOutboundItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { outboundId, inventoryId, amount, typeId } = request.body as {
    outboundId?: number;
    inventoryId?: number;
    amount?: number;
    typeId?: number;
  };

  try {
    const updatedOutboundItem = await prisma.outboundItems.update({
      where: { id: Number(id) },
      data: {
        outboundId,
        inventoryId,
        amount,
        typeId,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Outbound Item updated successfully",
      data: updatedOutboundItem,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating outbound item",
      error,
    });
  }
};

// Delete OutboundItem
export const deleteOutboundItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.outboundItems.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Outbound Item deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting outbound item",
      error,
    });
  }
};
