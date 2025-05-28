import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

export const getAllBomItems = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const bomItems = await prisma.bOMItem.findMany();
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: bomItems,
  });
};

export const getBomItemById = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const bomItem = await prisma.bOMItem.findUnique({
    where: { id: Number(id) },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: bomItem,
  });
};

export const createBomItem = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { categoryId, inventoryId, quantity } = req.body as {
    categoryId: number;
    inventoryId: number;
    quantity: string;
  };
  const bomItem = await prisma.bOMItem.create({
    data: {
      karoseriCategoryId: categoryId,
      inventoryId,
      quantityPerUnit: quantity ? Number(quantity) : 0,
    },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: bomItem,
  });
};

export const updateBomItem = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const { quantity } = req.body as { quantity: string };
  const bomItem = await prisma.bOMItem.update({
    where: { id: Number(id) },
    data: {
      quantityPerUnit: quantity ? Number(quantity) : 0,
    },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: bomItem,
  });
};

export const deleteBomItem = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const bomItem = await prisma.bOMItem.delete({
    where: { id: Number(id) },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: bomItem,
  });
};
