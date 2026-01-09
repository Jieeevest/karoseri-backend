import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create ItemPrice
export const createItemPrice = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { inventoryId, supplierId, price, validFrom, validUntil, isActive } =
    request.body as {
      inventoryId: number;
      supplierId?: number;
      price: number;
      validFrom?: string;
      validUntil?: string;
      isActive?: boolean;
    };

  try {
    const newItemPrice = await prisma.itemPrice.create({
      data: {
        inventoryId,
        supplierId,
        price,
        validFrom: validFrom ? new Date(validFrom) : new Date(),
        validUntil: validUntil ? new Date(validUntil) : null,
        isActive: isActive !== undefined ? isActive : true,
      },
      include: {
        inventory: true,
        supplier: true,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Item price created successfully",
      data: newItemPrice,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating item price",
      error,
    });
  }
};

// Get All ItemPrices
export const getAllItemPrices = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { inventoryId, supplierId, isActive } = request.query as {
    inventoryId?: string;
    supplierId?: string;
    isActive?: string;
  };

  try {
    const where: any = {};
    if (inventoryId) where.inventoryId = Number(inventoryId);
    if (supplierId) where.supplierId = Number(supplierId);
    if (isActive !== undefined) where.isActive = isActive === "true";

    const itemPrices = await prisma.itemPrice.findMany({
      where,
      include: {
        inventory: true,
        supplier: true,
      },
      orderBy: {
        validFrom: "desc",
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Item prices retrieved successfully",
      data: itemPrices,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving item prices",
      error,
    });
  }
};

// Get ItemPrice by ID
export const getItemPriceById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const itemPrice = await prisma.itemPrice.findUnique({
      where: { id: Number(id) },
      include: {
        inventory: true,
        supplier: true,
      },
    });

    if (!itemPrice) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Item price not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Item price retrieved successfully",
      data: itemPrice,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving item price",
      error,
    });
  }
};

// Update ItemPrice
export const updateItemPrice = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { price, validUntil, isActive } = request.body as {
    price?: number;
    validUntil?: string;
    isActive?: boolean;
  };

  try {
    const data: any = {};
    if (price !== undefined) data.price = price;
    if (validUntil !== undefined)
      data.validUntil = validUntil ? new Date(validUntil) : null;
    if (isActive !== undefined) data.isActive = isActive;

    const updatedItemPrice = await prisma.itemPrice.update({
      where: { id: Number(id) },
      data,
      include: {
        inventory: true,
        supplier: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Item price updated successfully",
      data: updatedItemPrice,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating item price",
      error,
    });
  }
};

// Delete ItemPrice
export const deleteItemPrice = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.itemPrice.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Item price deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting item price",
      error,
    });
  }
};
