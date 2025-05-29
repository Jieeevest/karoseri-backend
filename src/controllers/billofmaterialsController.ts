import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Get all BOMs with their items
export const getAllBOMs = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const boms = await prisma.bOM.findMany({
      include: {
        karoseriCategory: true,
        bomItems: {
          include: { inventory: true },
        },
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Success",
      data: boms,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Failed to fetch BOMs",
      error,
    });
  }
};

// Get a specific BOM by ID with items
export const getBOMById = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };

    const bom = await prisma.bOM.findUnique({
      where: { id: Number(id) },
      include: {
        karoseriCategory: true,
        bomItems: {
          include: { inventory: true },
        },
      },
    });

    if (!bom) {
      return sendResponse(reply, 404, {
        success: false,
        message: "BOM not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Success",
      data: bom,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Failed to fetch BOM",
      error,
    });
  }
};

// Create new BOM
export const createBOM = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { karoseriCategoryId, name, description } = req.body as {
      karoseriCategoryId: number;
      name: string;
      description?: string;
    };

    const bom = await prisma.bOM.create({
      data: {
        name,
        description,
        karoseriCategoryId,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "BOM created successfully",
      data: bom,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Failed to create BOM",
      error,
    });
  }
};

// Update BOM
export const updateBOM = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };
    const { name, description } = req.body as {
      name?: string;
      description?: string;
    };

    const bom = await prisma.bOM.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "BOM updated successfully",
      data: bom,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Failed to update BOM",
      error,
    });
  }
};

// Delete BOM
export const deleteBOM = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };

    // Optionally: delete related BOMItems first if cascade not configured
    await prisma.bOMItem.deleteMany({
      where: { bomId: Number(id) },
    });

    const bom = await prisma.bOM.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "BOM deleted successfully",
      data: bom,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Failed to delete BOM",
      error,
    });
  }
};
