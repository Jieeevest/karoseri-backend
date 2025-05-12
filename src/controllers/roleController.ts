import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();
export const createRole = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description, status } = request.body as {
    name: string;
    description: string;
    status: string;
  };

  try {
    const role = await prisma.role.create({
      data: {
        name,
        description,
        status,
      },
    });

    return sendResponse(reply, 201, {
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error creating role",
      error,
    });
  }
};

// Get All Roles
export const getAllRoles = async (
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
    const roles = await prisma.role.findMany({
      ...options,
      ...whereConditions,
    });

    /** Count roles */
    const roleCount = await prisma.role.count({
      ...whereConditions,
    });

    return sendResponse(reply, 200, {
      success: true,
      message: "Roles retrieved successfully",
      data: {
        roles,
        totalData: roleCount,
        pageNumber,
        pageSize,
        orderBy: orderField,
        orderDirection,
      },
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving roles",
      error,
    });
  }
};

// Get Role by ID
export const getRoleById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const role = await prisma.role.findUnique({
      where: { id: Number(id) },
    });

    if (!role) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Role not found",
      });
    }

    return sendResponse(reply, 200, {
      success: true,
      message: "Role retrieved successfully",
      data: role,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving role",
      error,
    });
  }
};

// Update Role
export const updateRole = async (
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
    const updatedRole = await prisma.role.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        status,
      },
    });

    return sendResponse(reply, 200, {
      success: true,
      message: "Role updated successfully",
      data: updatedRole,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error updating role",
      error,
    });
  }
};

// Delete Role
export const deleteRole = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.role.delete({
      where: { id: Number(id) },
    });

    return sendResponse(reply, 200, {
      success: true,
      message: "Role deleted successfully",
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error deleting role",
      error,
    });
  }
};
