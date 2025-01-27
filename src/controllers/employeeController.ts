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
    const employees = await prisma.employee.findMany({
      include: {
        role: true,
        group: true,
        position: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    });
  } catch (error) {
    sendResponse(reply, 500, {
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
