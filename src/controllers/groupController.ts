import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();
// Create a Group
export const createGroup = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description, status } = request.body as {
    name: string;
    description: string;
    status: string;
  };

  try {
    const group = await prisma.group.create({
      data: {
        name,
        description,
        status,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Group created successfully",
      data: group,
    });
  } catch (error) {
    sendResponse(reply, 500, {
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
    const groups = await prisma.group.findMany();

    sendResponse(reply, 200, {
      success: true,
      message: "Groups retrieved successfully",
      data: groups,
    });
  } catch (error) {
    sendResponse(reply, 500, {
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

    sendResponse(reply, 200, {
      success: true,
      message: "Group retrieved successfully",
      data: group,
    });
  } catch (error) {
    sendResponse(reply, 500, {
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

    sendResponse(reply, 200, {
      success: true,
      message: "Group updated successfully",
      data: updatedGroup,
    });
  } catch (error) {
    sendResponse(reply, 500, {
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

    sendResponse(reply, 200, {
      success: true,
      message: "Group deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting group",
      error,
    });
  }
};
