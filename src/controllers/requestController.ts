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
    /** Get query parameters */
    const { page, limit, sortBy, sortOrder } = request.query as {
      page?: string;
      limit?: string;
      sortBy?: string;
      sortOrder?: string;
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

    const requests = await prisma.request.findMany({
      ...options,
    });

    /** Count requests */
    const requestCount = await prisma.request.count();

    return sendResponse(reply, 200, {
      success: true,
      message: "Requests retrieved successfully",
      data: {
        requests,
        totalData: requestCount,
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
      message: "Error retrieving vehicles",
      error,
    });
  }
};
