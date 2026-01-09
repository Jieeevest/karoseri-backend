import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create VehicleBrand
export const createVehicleBrand = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description, status } = request.body as {
    name: string;
    description?: string;
    status?: string;
  };

  try {
    const newVehicleBrand = await prisma.vehicleBrand.create({
      data: { name, description, status },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Vehicle brand created successfully",
      data: newVehicleBrand,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating vehicle brand",
      error,
    });
  }
};

// Get All VehicleBrands
export const getAllVehicleBrands = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const vehicleBrands = await prisma.vehicleBrand.findMany({
      include: {
        _count: {
          select: { vehicles: true },
        },
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle brands retrieved successfully",
      data: vehicleBrands,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving vehicle brands",
      error,
    });
  }
};

// Get VehicleBrand by ID
export const getVehicleBrandById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const vehicleBrand = await prisma.vehicleBrand.findUnique({
      where: { id: Number(id) },
      include: {
        vehicles: true,
      },
    });

    if (!vehicleBrand) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Vehicle brand not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle brand retrieved successfully",
      data: vehicleBrand,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving vehicle brand",
      error,
    });
  }
};

// Update VehicleBrand
export const updateVehicleBrand = async (
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
    const updatedVehicleBrand = await prisma.vehicleBrand.update({
      where: { id: Number(id) },
      data: { name, description, status },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle brand updated successfully",
      data: updatedVehicleBrand,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating vehicle brand",
      error,
    });
  }
};

// Delete VehicleBrand
export const deleteVehicleBrand = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.vehicleBrand.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle brand deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting vehicle brand",
      error,
    });
  }
};
