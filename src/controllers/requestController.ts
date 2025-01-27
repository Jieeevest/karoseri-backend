import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create a Request
export const createRequest = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { incomingDate, supplierId, submitter, approver } = request.body as {
    incomingDate: Date;
    supplierId: number;
    submitter: number;
    approver: number;
  };

  try {
    const newRequest = await prisma.request.create({
      data: {
        incomingDate,
        supplierId,
        submitter,
        approver,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Request created successfully",
      data: newRequest,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating request",
      error,
    });
  }
};

// Get All Requests
export const getAllRequests = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const requests = await prisma.request.findMany({
      include: {
        requestItem: true,
        supplier: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Requests retrieved successfully",
      data: requests,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving requests",
      error,
    });
  }
};
