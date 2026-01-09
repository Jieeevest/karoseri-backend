import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create VehicleOutbound
export const createVehicleOutbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    outboundNumber,
    vehicleInboundId,
    outboundDate,
    finalCondition,
    notes,
    receivedBy,
  } = request.body as {
    outboundNumber: string;
    vehicleInboundId: number;
    outboundDate?: string;
    finalCondition?: string;
    notes?: string;
    receivedBy?: string;
  };

  try {
    const newVehicleOutbound = await prisma.vehicleOutbound.create({
      data: {
        outboundNumber,
        vehicleInboundId,
        outboundDate: outboundDate ? new Date(outboundDate) : new Date(),
        finalCondition,
        notes,
        receivedBy,
      },
      include: {
        vehicleInbound: {
          include: {
            customer: true,
            vehicleType: true,
          },
        },
      },
    });

    // Update vehicle inbound status to completed
    await prisma.vehicleInbound.update({
      where: { id: vehicleInboundId },
      data: { status: "completed" },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Vehicle outbound created successfully",
      data: newVehicleOutbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating vehicle outbound",
      error,
    });
  }
};

// Get All VehicleOutbounds
export const getAllVehicleOutbounds = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const vehicleOutbounds = await prisma.vehicleOutbound.findMany({
      include: {
        vehicleInbound: {
          include: {
            customer: true,
            vehicleType: true,
          },
        },
      },
      orderBy: {
        outboundDate: "desc",
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle outbounds retrieved successfully",
      data: vehicleOutbounds,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving vehicle outbounds",
      error,
    });
  }
};

// Get VehicleOutbound by ID
export const getVehicleOutboundById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const vehicleOutbound = await prisma.vehicleOutbound.findUnique({
      where: { id: Number(id) },
      include: {
        vehicleInbound: {
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
          },
        },
      },
    });

    if (!vehicleOutbound) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Vehicle outbound not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle outbound retrieved successfully",
      data: vehicleOutbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving vehicle outbound",
      error,
    });
  }
};

// Update VehicleOutbound
export const updateVehicleOutbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { finalCondition, notes, receivedBy } = request.body as {
    finalCondition?: string;
    notes?: string;
    receivedBy?: string;
  };

  try {
    const updatedVehicleOutbound = await prisma.vehicleOutbound.update({
      where: { id: Number(id) },
      data: {
        finalCondition,
        notes,
        receivedBy,
      },
      include: {
        vehicleInbound: {
          include: {
            customer: true,
            vehicleType: true,
          },
        },
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle outbound updated successfully",
      data: updatedVehicleOutbound,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating vehicle outbound",
      error,
    });
  }
};

// Delete VehicleOutbound
export const deleteVehicleOutbound = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const outbound = await prisma.vehicleOutbound.findUnique({
      where: { id: Number(id) },
    });

    if (outbound) {
      // Revert vehicle inbound status
      await prisma.vehicleInbound.update({
        where: { id: outbound.vehicleInboundId },
        data: { status: "in_progress" },
      });
    }

    await prisma.vehicleOutbound.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Vehicle outbound deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting vehicle outbound",
      error,
    });
  }
};
