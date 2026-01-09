import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create PurchaseOrderConfirmation
export const createPurchaseOrderConfirmation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { purchaseOrderId, confirmedById, status, notes } = request.body as {
    purchaseOrderId: number;
    confirmedById: number;
    status: string;
    notes?: string;
  };

  try {
    const confirmation = await prisma.purchaseOrderConfirmation.create({
      data: {
        purchaseOrderId,
        confirmedById,
        status,
        notes,
      },
      include: {
        purchaseOrder: {
          include: {
            supplier: true,
            items: true,
          },
        },
      },
    });

    // Update PurchaseOrder status based on confirmation
    if (status === "approved") {
      await prisma.purchaseOrder.update({
        where: { id: purchaseOrderId },
        data: {
          status: "confirmed",
          approvedById: confirmedById,
        },
      });
    } else if (status === "rejected") {
      await prisma.purchaseOrder.update({
        where: { id: purchaseOrderId },
        data: { status: "cancelled" },
      });
    }

    sendResponse(reply, 201, {
      success: true,
      message: "Purchase order confirmation created successfully",
      data: confirmation,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating purchase order confirmation",
      error,
    });
  }
};

// Get All Confirmations
export const getAllConfirmations = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { purchaseOrderId, status } = request.query as {
    purchaseOrderId?: string;
    status?: string;
  };

  try {
    const where: any = {};
    if (purchaseOrderId) where.purchaseOrderId = Number(purchaseOrderId);
    if (status) where.status = status;

    const confirmations = await prisma.purchaseOrderConfirmation.findMany({
      where,
      include: {
        purchaseOrder: {
          include: {
            supplier: true,
          },
        },
      },
      orderBy: {
        confirmDate: "desc",
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Confirmations retrieved successfully",
      data: confirmations,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving confirmations",
      error,
    });
  }
};

// Get Confirmation by ID
export const getConfirmationById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const confirmation = await prisma.purchaseOrderConfirmation.findUnique({
      where: { id: Number(id) },
      include: {
        purchaseOrder: {
          include: {
            supplier: true,
            items: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });

    if (!confirmation) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Confirmation not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Confirmation retrieved successfully",
      data: confirmation,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving confirmation",
      error,
    });
  }
};

// Delete Confirmation
export const deleteConfirmation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.purchaseOrderConfirmation.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Confirmation deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting confirmation",
      error,
    });
  }
};
