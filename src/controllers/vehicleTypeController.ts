import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create VehicleType
export const createVehicleType = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description, status } = request.body as {
    name: string;
    description?: string;
    status?: string;
  };

  try {
    const newVehicleType = await prisma.vehicleType.create({
      data: { name, description, status },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Vehicle type created successfully",
      data: newVehicleType,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating vehicle type",
      error,
    });
  }
};

// Get All VehicleTypes
export const getAllVehicleTypes = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const vehicleTypes = await prisma.vehicleType.findMany({
      include: {
        _count: {
          select: {
            vehicles: true,
            vehicleInbounds: true,
          },
        },
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle types retrieved successfully",
      data: vehicleTypes,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving vehicle types",
      error,
    });
  }
};

// Get VehicleType by ID
export const getVehicleTypeById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const vehicleType = await prisma.vehicleType.findUnique({
      where: { id: Number(id) },
      include: {
        vehicles: true,
        vehicleInbounds: true,
      },
    });

    if (!vehicleType) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Vehicle type not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle type retrieved successfully",
      data: vehicleType,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving vehicle type",
      error,
    });
  }
};

// Update VehicleType
export const updateVehicleType = async (
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
    const updatedVehicleType = await prisma.vehicleType.update({
      where: { id: Number(id) },
      data: { name, description, status },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle type updated successfully",
      data: updatedVehicleType,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating vehicle type",
      error,
    });
  }
};

// Delete VehicleType
export const deleteVehicleType = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.vehicleType.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle type deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting vehicle type",
      error,
    });
  }
};
