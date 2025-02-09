/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create an Employee
export const createEmployee = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    nik,
    fullName,
    email,
    phoneNumber,
    password,
    roleId,
    groupId,
    positionId,
    status,
  } = request.body as {
    nik: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    roleId: number;
    groupId: number;
    positionId: number;
    status: string;
  };

  try {
    const employee = await prisma.employee.create({
      data: {
        nik,
        fullName,
        email,
        phoneNumber,
        password, // Handle hashing before saving to DB
        roleId,
        groupId,
        positionId,
        status,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating employee",
      error,
    });
  }
};

// Get All Employees
export const getAllEmployees = async (
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
      include: {
        role: true,
        group: true,
        position: true,
      },
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
    const employees = await prisma.employee.findMany({
      ...options,
      ...whereConditions,
    });

    /** Count teams */
    const employeeCount = await prisma.employee.count({
      ...whereConditions,
    });

    return sendResponse(reply, 200, {
      success: true,
      message: "Employees retrieved successfully",
      data: {
        employees,
        totalData: employeeCount,
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
      message: "Error retrieving employees",
      error,
    });
  }
};

// Get an Employee by ID
export const getEmployeeById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
      include: {
        role: true,
        group: true,
        position: true,
      },
    });

    if (!employee) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Employee not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Employee retrieved successfully",
      data: employee,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving employee",
      error,
    });
  }
};

// Update an Employee
export const updateEmployee = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { fullName, email, phoneNumber, roleId, groupId, positionId, status } =
    request.body as {
      fullName?: string;
      email?: string;
      phoneNumber?: string;
      roleId?: number;
      groupId?: number;
      positionId?: number;
      status?: string;
    };

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: {
        fullName,
        email,
        phoneNumber,
        roleId,
        groupId,
        positionId,
        status,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating employee",
      error,
    });
  }
};

// Delete an Employee
export const deleteEmployee = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.employee.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting employee",
      error,
    });
  }
};
