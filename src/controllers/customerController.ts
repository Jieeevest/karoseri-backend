import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create Customer
export const createCustomer = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, companyName, phoneNumber, email, address, city, notes } =
    request.body as {
      name: string;
      companyName?: string;
      phoneNumber?: string;
      email?: string;
      address?: string;
      city?: string;
      notes?: string;
    };

  try {
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        companyName,
        phoneNumber,
        email,
        address,
        city,
        notes,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Customer created successfully",
      data: newCustomer,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating customer",
      error,
    });
  }
};

// Get All Customers
export const getAllCustomers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        _count: {
          select: { vehicleInbounds: true },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Customers retrieved successfully",
      data: customers,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving customers",
      error,
    });
  }
};

// Get Customer by ID
export const getCustomerById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
      include: {
        vehicleInbounds: {
          include: {
            vehicleType: true,
            orderSpecs: true,
          },
          orderBy: {
            inboundDate: "desc",
          },
        },
      },
    });

    if (!customer) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Customer not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Customer retrieved successfully",
      data: customer,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving customer",
      error,
    });
  }
};

// Update Customer
export const updateCustomer = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { name, companyName, phoneNumber, email, address, city, notes } =
    request.body as {
      name?: string;
      companyName?: string;
      phoneNumber?: string;
      email?: string;
      address?: string;
      city?: string;
      notes?: string;
    };

  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        name,
        companyName,
        phoneNumber,
        email,
        address,
        city,
        notes,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating customer",
      error,
    });
  }
};

// Delete Customer
export const deleteCustomer = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.customer.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting customer",
      error,
    });
  }
};
