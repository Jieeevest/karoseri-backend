import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create a Supplier
export const createSupplier = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, phoneNumber, phoneNumberAlt, email, homeAddress } =
    request.body as {
      name: string;
      phoneNumber: string;
      phoneNumberAlt: string;
      email: string;
      homeAddress: string;
    };

  try {
    const supplier = await prisma.supplier.create({
      data: {
        name,
        phoneNumber,
        phoneNumberAlt,
        email,
        homeAddress,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Supplier created successfully",
      data: supplier,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating supplier",
      error,
    });
  }
};

// Get All Suppliers
export const getAllSuppliers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        request: true,
        inbound: true,
        outbound: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Suppliers retrieved successfully",
      data: suppliers,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving suppliers",
      error,
    });
  }
};

// Get Supplier by ID
export const getSupplierById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
      include: {
        request: true,
        inbound: true,
        outbound: true,
      },
    });

    if (!supplier) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Supplier not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Supplier retrieved successfully",
      data: supplier,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving supplier",
      error,
    });
  }
};

// Update Supplier
export const updateSupplier = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { name, phoneNumber, phoneNumberAlt, email, homeAddress } =
    request.body as {
      name?: string;
      phoneNumber?: string;
      phoneNumberAlt?: string;
      email?: string;
      homeAddress?: string;
    };

  try {
    const updatedSupplier = await prisma.supplier.update({
      where: { id: Number(id) },
      data: {
        name,
        phoneNumber,
        phoneNumberAlt,
        email,
        homeAddress,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Supplier updated successfully",
      data: updatedSupplier,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating supplier",
      error,
    });
  }
};

// Delete Supplier
export const deleteSupplier = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.supplier.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting supplier",
      error,
    });
  }
};
