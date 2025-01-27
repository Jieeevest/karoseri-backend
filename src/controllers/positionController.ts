import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

export const createPosition = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description, status } = request.body as {
    name: string;
    description: string;
    status: string;
  };

  try {
    const position = await prisma.position.create({
      data: {
        name,
        description,
        status,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Position created successfully",
      data: position,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating position",
      error,
    });
  }
};

// Get All Positions
export const getAllPositions = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const positions = await prisma.position.findMany();

    sendResponse(reply, 200, {
      success: true,
      message: "Positions retrieved successfully",
      data: positions,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving positions",
      error,
    });
  }
};

// Get Position by ID
export const getPositionById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const position = await prisma.position.findUnique({
      where: { id: Number(id) },
    });

    if (!position) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Position not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Position retrieved successfully",
      data: position,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving position",
      error,
    });
  }
};

// Update Position
export const updatePosition = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { name, description, status } = request.body as {
    name?: string;
    description?: string;
    status?: string;
  };

  try {
    const updatedPosition = await prisma.position.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        status,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Position updated successfully",
      data: updatedPosition,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating position",
      error,
    });
  }
};

// Delete Position
export const deletePosition = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.position.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Position deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting position",
      error,
    });
  }
};
