/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create a Supplier
export const createSupplier = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    name,
    phoneNumber,
    phoneNumberAlt,
    email,
    homeAddress,
    bank,
    bankNumber,
    category,
    bankOwner,
  } = request.body as {
    name: string;
    phoneNumber: string;
    phoneNumberAlt: string;
    email: string;
    homeAddress: string;
    bank: string;
    bankNumber: string;
    category: string;
    bankOwner: string;
  };

  try {
    const supplier = await prisma.supplier.create({
      data: {
        name,
        phoneNumber,
        phoneNumberAlt,
        email,
        homeAddress,
        bank,
        bankNumber,
        category,
        bankOwner,
      },
    });

    return sendResponse(reply, 201, {
      success: true,
      message: "Supplier created successfully",
      data: supplier,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
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
    const whereConditions: any = {
      where: {
        status: {
          contains: "active",
          mode: "insensitive",
          not: "non-active",
        },
      },
    };

    if (status) {
      whereConditions.where.status = {
        equals: status,
        mode: "insensitive",
      };
    }

    /* Commented if someday it will be changed 
      const suppliers = await prisma.supplier.findMany({
        include: {
          request: true,
          inbound: true,
          outbound: true,
        },
      });
    */

    const suppliers = await prisma.supplier.findMany({
      ...options,
      ...whereConditions,
    });

    /** Count groups */
    const supplierCount = await prisma.supplier.count({ ...whereConditions });

    return sendResponse(reply, 200, {
      success: true,
      message: "Suppliers retrieved successfully",
      data: {
        suppliers,
        totalData: supplierCount,
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

    return sendResponse(reply, 200, {
      success: true,
      message: "Supplier retrieved successfully",
      data: supplier,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
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

    return sendResponse(reply, 200, {
      success: true,
      message: "Supplier updated successfully",
      data: updatedSupplier,
    });
  } catch (error) {
    return sendResponse(reply, 500, {
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

    return sendResponse(reply, 200, {
      success: true,
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    return sendResponse(reply, 500, {
      success: false,
      message: "Error deleting supplier",
      error,
    });
  }
};
