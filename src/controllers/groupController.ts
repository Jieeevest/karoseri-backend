import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();
// Create a Group
export const createGroup = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description } = request.body as {
    name: string;
    description: string;
  };

  try {
    const group = await prisma.group.create({
      data: {
        name,
        description,
        status: "active",
      },
    });

    return sendResponse(reply, 201, {
      success: true,
      message: "Group created successfully",
      data: group,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error creating group",
      error,
    });
  }
};

// Get All Groups
export const getAllGroups = async (
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
      },
    };

    if (status) {
      whereConditions.where.status = {
        equals: status,
        mode: "insensitive",
      };
    }
    const groups = await prisma.group.findMany({
      ...options,
      ...whereConditions,
    });

    /** Count groups */
    const groupCount = await prisma.group.count({
      ...whereConditions,
    });

    return sendResponse(reply, 200, {
      success: true,
      message: "Groups retrieved successfully",
      data: {
        groups,
        totalData: groupCount,
        pageNumber,
        pageSize,
        orderBy: orderField,
        orderDirection,
      },
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving groups",
      error,
    });
  }
};

// Get Group by ID
export const getGroupById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const group = await prisma.group.findUnique({
      where: { id: Number(id) },
    });

    if (!group) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Group not found",
      });
    }

    return sendResponse(reply, 200, {
      success: true,
      message: "Group retrieved successfully",
      data: group,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving group",
      error,
    });
  }
};

// Update Group
export const updateGroup = async (
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
    const updatedGroup = await prisma.group.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        status,
      },
    });

    return sendResponse(reply, 200, {
      success: true,
      message: "Group updated successfully",
      data: updatedGroup,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error updating group",
      error,
    });
  }
};

// Delete Group
export const deleteGroup = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.group.delete({
      where: { id: Number(id) },
    });

    return sendResponse(reply, 200, {
      success: true,
      message: "Group deleted successfully",
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error deleting group",
      error,
    });
  }
};
