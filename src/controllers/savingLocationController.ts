import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create a SavingLocation
export const createSavingLocation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description } = request.body as {
    name: string;
    description: string;
  };

  try {
    const newSavingLocation = await prisma.savingLocation.create({
      data: { name, description },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Saving Location created successfully",
      data: newSavingLocation,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating saving location",
      error,
    });
  }
};

export const getAllSavingLocations = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    /** Get query parameters */
    const { page, limit, sortBy, sortOrder } = request.query as {
      page?: string;
      limit?: string;
      sortBy?: string;
      sortOrder?: string;
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

    const locations = await prisma.savingLocation.findMany({
      ...options,
    });

    /** Count vehicles */
    const locationCount = await prisma.savingLocation.count();

    return sendResponse(reply, 200, {
      success: true,
      message: "Locations retrieved successfully",
      data: {
        locations,
        totalData: locationCount,
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
      message: "Error retrieving locations",
      error,
    });
  }
};

// Get SavingLocation by ID
export const getSavingLocationById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const savingLocation = await prisma.savingLocation.findUnique({
      where: { id: Number(id) },
    });

    if (!savingLocation) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Saving Location not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Saving Location retrieved successfully",
      data: savingLocation,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving saving location",
      error,
    });
  }
};

// Update SavingLocation
export const updateSavingLocation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { name, description } = request.body as {
    name?: string;
    description?: string;
  };

  try {
    const updatedSavingLocation = await prisma.savingLocation.update({
      where: { id: Number(id) },
      data: { name, description },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Saving Location updated successfully",
      data: updatedSavingLocation,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating saving location",
      error,
    });
  }
};

// Delete SavingLocation
export const deleteSavingLocation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.savingLocation.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Saving Location deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting saving location",
      error,
    });
  }
};
