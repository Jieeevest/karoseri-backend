import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create PurchaseOrder with Items
export const createPurchaseOrder = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    poNumber,
    supplierId,
    poDate,
    expectedDate,
    notes,
    items,
    createdById,
  } = request.body as {
    poNumber: string;
    supplierId: number;
    poDate?: string;
    expectedDate?: string;
    notes?: string;
    items: Array<{
      inventoryId: number;
      quantity: number;
      unitPrice: number;
      notes?: string;
    }>;
    createdById: number;
  };

  try {
    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      return sum + subtotal;
    }, 0);

    const newPurchaseOrder = await prisma.purchaseOrder.create({
      data: {
        poNumber,
        supplierId,
        poDate: poDate ? new Date(poDate) : new Date(),
        expectedDate: expectedDate ? new Date(expectedDate) : null,
        totalAmount,
        notes,
        createdById,
        items: {
          create: items.map((item) => ({
            inventoryId: item.inventoryId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subtotal: item.quantity * item.unitPrice,
            notes: item.notes,
          })),
        },
      },
      include: {
        supplier: true,
        items: {
          include: {
            inventory: true,
          },
        },
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Purchase order created successfully",
      data: newPurchaseOrder,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating purchase order",
      error,
    });
  }
};

// Get All PurchaseOrders
export const getAllPurchaseOrders = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { status, supplierId } = request.query as {
    status?: string;
    supplierId?: string;
  };

  try {
    const where: any = {};
    if (status) where.status = status;
    if (supplierId) where.supplierId = Number(supplierId);

    const purchaseOrders = await prisma.purchaseOrder.findMany({
      where,
      include: {
        supplier: true,
        items: {
          include: {
            inventory: true,
          },
        },
        confirmations: true,
      },
      orderBy: {
        poDate: "desc",
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Purchase orders retrieved successfully",
      data: purchaseOrders,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving purchase orders",
      error,
    });
  }
};

// Get PurchaseOrder by ID
export const getPurchaseOrderById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const purchaseOrder = await prisma.purchaseOrder.findUnique({
      where: { id: Number(id) },
      include: {
        supplier: true,
        items: {
          include: {
            inventory: true,
          },
        },
        confirmations: {
          orderBy: {
            confirmDate: "desc",
          },
        },
      },
    });

    if (!purchaseOrder) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Purchase order not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Purchase order retrieved successfully",
      data: purchaseOrder,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving purchase order",
      error,
    });
  }
};

// Update PurchaseOrder
export const updatePurchaseOrder = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { status, expectedDate, notes, approvedById } = request.body as {
    status?: string;
    expectedDate?: string;
    notes?: string;
    approvedById?: number;
  };

  try {
    const data: any = {};
    if (status !== undefined) data.status = status;
    if (expectedDate !== undefined)
      data.expectedDate = expectedDate ? new Date(expectedDate) : null;
    if (notes !== undefined) data.notes = notes;
    if (approvedById !== undefined) data.approvedById = approvedById;

    const updatedPurchaseOrder = await prisma.purchaseOrder.update({
      where: { id: Number(id) },
      data,
      include: {
        supplier: true,
        items: {
          include: {
            inventory: true,
          },
        },
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Purchase order updated successfully",
      data: updatedPurchaseOrder,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating purchase order",
      error,
    });
  }
};

// Delete PurchaseOrder
export const deletePurchaseOrder = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.purchaseOrder.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Purchase order deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting purchase order",
      error,
    });
  }
};
