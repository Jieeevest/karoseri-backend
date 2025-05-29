/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";
import Fuse from "fuse.js"; // Import fuse.js for fuzzy searching

const prisma = new PrismaClient();

// Helper function for fuzzy matching inventory name
const fuzzySearch = (inventory: any[], searchTerm: string) => {
  const options = {
    keys: ["name"],
    threshold: 0.3, // Lower is more strict, higher allows more fuzziness (0-1)
  };
  const fuse = new Fuse(inventory, options);
  return fuse.search(searchTerm).map((result) => result.item);
};

// Fuzzy comparison for amount and minimumStock
const isStockNearThreshold = (
  amount: number,
  minimumStock: number,
  tolerance: number = 5
) => {
  return Math.abs(amount - minimumStock) <= tolerance;
};

// Create an Inventory Item
export const createInventory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    name,
    amount,
    typeId,
    locationId,
    supplierId,
    price,
    unit,
    minimumStock,
    description,
  } = request.body as {
    name: string;
    amount: number;
    typeId: number;
    categoryId: number;
    locationId: number;
    supplierId: number;
    price: number;
    unit: string;
    minimumStock: number;
    description?: string;
  };

  try {
    const inventory = await prisma.inventory.create({
      data: {
        name,
        amount,
        typeId,
        price,
        unit,
        supplierId,
        locationId,
        minimumStock,
        currentStock: 0,
        description,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Inventory item created successfully",
      data: inventory,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating inventory item",
      error,
    });
  }
};

// Get All Inventory Items (with fuzzy search)
export const getAllInventory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { search } = request.query as { search?: string }; // Search term from query params

  try {
    // Fetch all inventory items
    const inventoryItems = await prisma.inventory.findMany({
      include: {
        type: true,
        supplier: true,
        location: true,
      },
    });

    let filteredInventory = inventoryItems;

    // Apply fuzzy search if a search term is provided
    if (search) {
      filteredInventory = fuzzySearch(inventoryItems, search);
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Inventory items retrieved successfully",
      data: filteredInventory,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving inventory items",
      error,
    });
  }
};

// Get an Inventory Item by ID
export const getInventoryById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const inventoryItem = await prisma.inventory.findUnique({
      where: { id: Number(id) },
      include: {
        type: true,
        supplier: true,
        location: true,
      },
    });

    if (!inventoryItem) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Inventory item not found",
      });
    }

    // Check if the stock is near the minimum threshold
    const isNearThreshold = isStockNearThreshold(
      inventoryItem.amount,
      inventoryItem.minimumStock
    );

    sendResponse(reply, 200, {
      success: true,
      message: "Inventory item retrieved successfully",
      data: {
        ...inventoryItem,
        isNearThreshold, // Adding a flag to show if stock is near minimum threshold
      },
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving inventory item",
      error,
    });
  }
};

// Update an Inventory Item
export const updateInventory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const {
    name,
    amount,
    typeId,
    locationId,
    supplierId,
    price,
    unit,
    minimumStock,
    description,
  } = request.body as {
    name?: string;
    amount?: number;
    typeId?: number;
    locationId?: number;
    supplierId?: number;
    price?: number;
    unit?: string;
    minimumStock?: number;
    description?: string;
  };

  try {
    const updatedInventory = await prisma.inventory.update({
      where: { id: Number(id) },
      data: {
        name,
        amount,
        typeId,
        supplierId,
        price,
        unit,
        locationId,
        minimumStock,
        currentStock: 0,
        description,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Inventory item updated successfully",
      data: updatedInventory,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating inventory item",
      error,
    });
  }
};

// Delete an Inventory Item
export const deleteInventory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.inventory.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Inventory item deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting inventory item",
      error,
    });
  }
};
