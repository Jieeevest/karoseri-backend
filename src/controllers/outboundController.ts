import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create an Outbound
export const createOutbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { outcomingDate, supplierId, submitter, approver, deliveryNumber } =
    request.body as {
      outcomingDate: Date;
      supplierId: number;
      submitter: number;
      approver: number;
      deliveryNumber: string;
    };

  try {
    const newOutbound = await prisma.outbound.create({
      data: {
        outcomingDate,
        supplierId,
        submitter,
        approver,
        deliveryNumber,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Outbound created successfully",
      data: newOutbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating outbound",
      error,
    });
  }
};

// Get All Outbounds
export const getAllOutbounds = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const outbounds = await prisma.outbound.findMany({
      include: {
        supplier: true,
        outboundItems: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Outbounds retrieved successfully",
      data: outbounds,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving outbounds",
      error,
    });
  }
};

// Get Outbound by ID
export const getOutboundById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const outbound = await prisma.outbound.findUnique({
      where: { id: Number(id) },
      include: {
        supplier: true,
        outboundItems: true,
      },
    });

    if (!outbound) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Outbound not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Outbound retrieved successfully",
      data: outbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving outbound",
      error,
    });
  }
};

// Update Outbound
export const updateOutbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { outcomingDate, supplierId, submitter, approver, deliveryNumber } =
    request.body as {
      outcomingDate: Date;
      supplierId: number;
      submitter: number;
      approver: number;
      deliveryNumber: string;
    };

  try {
    const updatedOutbound = await prisma.outbound.update({
      where: { id: Number(id) },
      data: {
        outcomingDate,
        supplierId,
        submitter,
        approver,
        deliveryNumber,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Outbound updated successfully",
      data: updatedOutbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating outbound",
      error,
    });
  }
};

// Delete Outbound
export const deleteOutbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.outbound.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Outbound deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting outbound",
      error,
    });
  }
};
