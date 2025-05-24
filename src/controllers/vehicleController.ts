import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create a Vehicle
export const createVehicle = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    showroomName,
    ownerName,
    expeditionName,
    merk,
    series,
    color,
    type,
    chasisNumber,
    machineNumber,
    description,
  } = request.body as {
    showroomName: string;
    ownerName: string;
    expeditionName: string;
    merk: string;
    series: string;
    color: string;
    type: string;
    chasisNumber: string;
    machineNumber: string;
    description: string;
  };

  try {
    const newVehicle = await prisma.vehicle.create({
      data: {
        showroomName,
        ownerName,
        expeditionName,
        merk,
        series,
        color,
        type,
        chasisNumber,
        machineNumber,
        description,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Vehicle created successfully",
      data: newVehicle,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating vehicle",
      error,
    });
  }
};

export const getAllVehicles = async (
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

    const vehicles = await prisma.vehicle.findMany({
      ...options,
    });

    /** Count vehicles */
    const vehicleCount = await prisma.vehicle.count();

    return sendResponse(reply, 200, {
      success: true,
      message: "Vehicles retrieved successfully",
      data: {
        vehicles,
        totalData: vehicleCount,
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
      message: "Error retrieving vehicles",
      error,
    });
  }
};

// Get Vehicle by ID
export const getVehicleById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: Number(id) },
    });

    if (!vehicle) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Vehicle not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle retrieved successfully",
      data: vehicle,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving vehicle",
      error,
    });
  }
};

// Update Vehicle
export const updateVehicle = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const {
    showroomName,
    ownerName,
    expeditionName,
    merk,
    series,
    color,
    type,
    chasisNumber,
    machineNumber,
    description,
  } = request.body as {
    showroomName?: string;
    ownerName?: string;
    expeditionName?: string;
    merk?: string;
    series?: string;
    color?: string;
    type?: string;
    chasisNumber?: string;
    machineNumber?: string;
    description?: string;
  };

  try {
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: Number(id) },
      data: {
        showroomName,
        ownerName,
        expeditionName,
        merk,
        series,
        color,
        type,
        chasisNumber,
        machineNumber,
        description,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating vehicle",
      error,
    });
  }
};

// Delete Vehicle
export const deleteVehicle = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.vehicle.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting vehicle",
      error,
    });
  }
};
