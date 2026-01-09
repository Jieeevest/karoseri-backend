import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create VehicleInbound
export const createVehicleInbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    inboundNumber,
    customerId,
    vehicleTypeId,
    vehicleBrand,
    plateNumber,
    chasisNumber,
    machineNumber,
    color,
    inboundDate,
    initialCondition,
    notes,
  } = request.body as {
    inboundNumber: string;
    customerId: number;
    vehicleTypeId: number;
    vehicleBrand?: string;
    plateNumber?: string;
    chasisNumber?: string;
    machineNumber?: string;
    color?: string;
    inboundDate?: string;
    initialCondition?: string;
    notes?: string;
  };

  try {
    const newVehicleInbound = await prisma.vehicleInbound.create({
      data: {
        inboundNumber,
        customerId,
        vehicleTypeId,
        vehicleBrand,
        plateNumber,
        chasisNumber,
        machineNumber,
        color,
        inboundDate: inboundDate ? new Date(inboundDate) : new Date(),
        initialCondition,
        notes,
      },
      include: {
        customer: true,
        vehicleType: true,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Vehicle inbound created successfully",
      data: newVehicleInbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating vehicle inbound",
      error,
    });
  }
};

// Get All VehicleInbounds
export const getAllVehicleInbounds = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { status, customerId, vehicleTypeId } = request.query as {
    status?: string;
    customerId?: string;
    vehicleTypeId?: string;
  };

  try {
    const where: any = {};
    if (status) where.status = status;
    if (customerId) where.customerId = Number(customerId);
    if (vehicleTypeId) where.vehicleTypeId = Number(vehicleTypeId);

    const vehicleInbounds = await prisma.vehicleInbound.findMany({
      where,
      include: {
        customer: true,
        vehicleType: true,
        orderSpecs: {
          include: {
            items: {
              include: {
                inventory: true,
              },
            },
          },
        },
        vehicleOutbound: true,
      },
      orderBy: {
        inboundDate: "desc",
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle inbounds retrieved successfully",
      data: vehicleInbounds,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving vehicle inbounds",
      error,
    });
  }
};

// Get VehicleInbound by ID
export const getVehicleInboundById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const vehicleInbound = await prisma.vehicleInbound.findUnique({
      where: { id: Number(id) },
      include: {
        customer: true,
        vehicleType: true,
        orderSpecs: {
          include: {
            items: {
              include: {
                inventory: true,
              },
            },
          },
        },
        vehicleOutbound: true,
      },
    });

    if (!vehicleInbound) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Vehicle inbound not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle inbound retrieved successfully",
      data: vehicleInbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving vehicle inbound",
      error,
    });
  }
};

// Update VehicleInbound
export const updateVehicleInbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { status, initialCondition, notes } = request.body as {
    status?: string;
    initialCondition?: string;
    notes?: string;
  };

  try {
    const updatedVehicleInbound = await prisma.vehicleInbound.update({
      where: { id: Number(id) },
      data: {
        status,
        initialCondition,
        notes,
      },
      include: {
        customer: true,
        vehicleType: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle inbound updated successfully",
      data: updatedVehicleInbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating vehicle inbound",
      error,
    });
  }
};

// Delete VehicleInbound
export const deleteVehicleInbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.vehicleInbound.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle inbound deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting vehicle inbound",
      error,
    });
  }
};
