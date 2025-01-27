import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create an Inbound
export const createInbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { incomingDate, supplierId, receiver, deliveryNumber } =
    request.body as {
      incomingDate: Date;
      supplierId: number;
      receiver: number;
      deliveryNumber: string;
    };

  try {
    const newInbound = await prisma.inbound.create({
      data: {
        incomingDate,
        supplierId,
        receiver,
        deliveryNumber,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Inbound created successfully",
      data: newInbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating inbound",
      error,
    });
  }
};

// Get All Inbounds
export const getAllInbounds = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const inbounds = await prisma.inbound.findMany({
      include: {
        supplier: true,
        inboundItem: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Inbounds retrieved successfully",
      data: inbounds,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving inbounds",
      error,
    });
  }
};

// Get Inbound by ID
export const getInboundById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const inbound = await prisma.inbound.findUnique({
      where: { id: Number(id) },
      include: {
        supplier: true,
        inboundItem: true,
      },
    });

    if (!inbound) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Inbound not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Inbound retrieved successfully",
      data: inbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving inbound",
      error,
    });
  }
};

// Update Inbound
export const updateInbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { incomingDate, supplierId, receiver, deliveryNumber } =
    request.body as {
      incomingDate?: Date;
      supplierId?: number;
      receiver?: number;
      deliveryNumber?: string;
    };

  try {
    const updatedInbound = await prisma.inbound.update({
      where: { id: Number(id) },
      data: {
        incomingDate,
        supplierId,
        receiver,
        deliveryNumber,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Inbound updated successfully",
      data: updatedInbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating inbound",
      error,
    });
  }
};

// Delete Inbound
export const deleteInbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.inbound.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Inbound deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting inbound",
      error,
    });
  }
};
