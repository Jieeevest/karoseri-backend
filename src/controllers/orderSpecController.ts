import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create OrderSpec with Items
export const createOrderSpec = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { vehicleInboundId, specName, description, estimatedCost, items } =
    request.body as {
      vehicleInboundId: number;
      specName: string;
      description?: string;
      estimatedCost?: number;
      items?: Array<{
        inventoryId: number;
        quantity: number;
        notes?: string;
      }>;
    };

  try {
    const newOrderSpec = await prisma.orderSpec.create({
      data: {
        vehicleInboundId,
        specName,
        description,
        estimatedCost,
        items: items
          ? {
              create: items.map((item) => ({
                inventoryId: item.inventoryId,
                quantity: item.quantity,
                notes: item.notes,
              })),
            }
          : undefined,
      },
      include: {
        vehicleInbound: {
          include: {
            customer: true,
            vehicleType: true,
          },
        },
        items: {
          include: {
            inventory: true,
          },
        },
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Order spec created successfully",
      data: newOrderSpec,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating order spec",
      error,
    });
  }
};

// Get All OrderSpecs
export const getAllOrderSpecs = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { vehicleInboundId } = request.query as {
    vehicleInboundId?: string;
  };

  try {
    const where: any = {};
    if (vehicleInboundId) where.vehicleInboundId = Number(vehicleInboundId);

    const orderSpecs = await prisma.orderSpec.findMany({
      where,
      include: {
        vehicleInbound: {
          include: {
            customer: true,
            vehicleType: true,
          },
        },
        items: {
          include: {
            inventory: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Order specs retrieved successfully",
      data: orderSpecs,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving order specs",
      error,
    });
  }
};

// Get OrderSpec by ID
export const getOrderSpecById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const orderSpec = await prisma.orderSpec.findUnique({
      where: { id: Number(id) },
      include: {
        vehicleInbound: {
          include: {
            customer: true,
            vehicleType: true,
          },
        },
        items: {
          include: {
            inventory: {
              include: {
                itemCategory: true,
                itemUnit: true,
              },
            },
          },
        },
      },
    });

    if (!orderSpec) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Order spec not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Order spec retrieved successfully",
      data: orderSpec,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving order spec",
      error,
    });
  }
};

// Update OrderSpec
export const updateOrderSpec = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { specName, description, estimatedCost } = request.body as {
    specName?: string;
    description?: string;
    estimatedCost?: number;
  };

  try {
    const updatedOrderSpec = await prisma.orderSpec.update({
      where: { id: Number(id) },
      data: {
        specName,
        description,
        estimatedCost,
      },
      include: {
        vehicleInbound: true,
        items: {
          include: {
            inventory: true,
          },
        },
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Order spec updated successfully",
      data: updatedOrderSpec,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating order spec",
      error,
    });
  }
};

// Add Item to OrderSpec
export const addOrderSpecItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { orderSpecId, inventoryId, quantity, notes } = request.body as {
    orderSpecId: number;
    inventoryId: number;
    quantity: number;
    notes?: string;
  };

  try {
    const newItem = await prisma.orderSpecItem.create({
      data: {
        orderSpecId,
        inventoryId,
        quantity,
        notes,
      },
      include: {
        inventory: true,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Order spec item added successfully",
      data: newItem,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error adding order spec item",
      error,
    });
  }
};

// Delete OrderSpec
export const deleteOrderSpec = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.orderSpec.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Order spec deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting order spec",
      error,
    });
  }
};
