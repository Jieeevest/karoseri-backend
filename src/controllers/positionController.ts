import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

export const createPosition = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description } = request.body as {
    name: string;
    description: string;
  };

  try {
    const position = await prisma.position.create({
      data: {
        name,
        description,
        status: "active",
      },
    });

    return sendResponse(reply, 201, {
      success: true,
      message: "Position created successfully",
      data: position,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
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
    /** Get query parameters */
    const { page, limit, sortBy, sortOrder, status } = request.query as {
      page?: string;
      limit?: string;
      sortBy?: string;
      sortOrder?: string;
      status?: string;
      keyword?: string;
    };

    /** Set pagination parameters */
    const pageNumber = parseInt(page || "1", 10);
    const pageSize = parseInt(limit || "10", 10);
    const orderField = sortBy || "createdAt";
    const orderDirection = sortOrder?.toLowerCase() === "desc" ? "desc" : "asc";

    /** Set options */
    const options = {
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: { [orderField]: orderDirection },
    };

    /** Filter parameters */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereConditions: any = {
      where: {
        status: {
          contains: "active",
          mode: "insensitive",
          not: "non-active",
        },
        id: {
          gt: 1,
        },
      },
    };

    if (status) {
      whereConditions.where.status = {
        equals: status,
        mode: "insensitive",
      };
    }
    const positions = await prisma.position.findMany({
      ...options,
      ...whereConditions,
    });

    /** Count positions */
    const positionCount = await prisma.position.count({
      ...whereConditions,
    });

    return sendResponse(reply, 200, {
      success: true,
      message: "Positions retrieved successfully",
      data: {
        positions,
        totalData: positionCount,
        pageNumber,
        pageSize,
        orderBy: orderField,
        orderDirection,
      },
    });
  } catch (error) {
    console.log(error);
    return sendResponse(reply, 500, {
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

    return sendResponse(reply, 200, {
      success: true,
      message: "Position retrieved successfully",
      data: position,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
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

    return sendResponse(reply, 200, {
      success: true,
      message: "Position updated successfully",
      data: updatedPosition,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
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

    return sendResponse(reply, 200, {
      success: true,
      message: "Position deleted successfully",
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error deleting position",
      error,
    });
  }
};
