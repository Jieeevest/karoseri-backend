import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create a Type
export const createType = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description } = request.body as {
    name: string;
    description: string;
  };

  try {
    const newType = await prisma.type.create({
      data: {
        name,
        description,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Type created successfully",
      data: newType,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating type",
      error,
    });
  }
};

// Get All Types
export const getAllTypes = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const types = await prisma.type.findMany({
      include: {
        inventory: true,
        requestItems: true,
        inboundItems: true,
        outboundItems: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Types retrieved successfully",
      data: types,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving types",
      error,
    });
  }
};

// Get Type by ID
export const getTypeById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const type = await prisma.type.findUnique({
      where: { id: Number(id) },
      include: {
        inventory: true,
        requestItems: true,
        inboundItems: true,
        outboundItems: true,
      },
    });

    if (!type) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Type not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Type retrieved successfully",
      data: type,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving type",
      error,
    });
  }
};

// Update Type
export const updateType = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { name, description } = request.body as {
    name?: string;
    description?: string;
  };

  try {
    const updatedType = await prisma.type.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Type updated successfully",
      data: updatedType,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating type",
      error,
    });
  }
};

// Delete Type
export const deleteType = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.type.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Type deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting type",
      error,
    });
  }
};
