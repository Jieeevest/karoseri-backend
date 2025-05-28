import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

export const getAllKaroseriCategories = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const karoseriCategories = await prisma.karoseriCategory.findMany();
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: karoseriCategories,
  });
};

export const getKaroseriCategoryById = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const karoseriCategory = await prisma.karoseriCategory.findUnique({
    where: { id: Number(id) },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: karoseriCategory,
  });
};

export const createKaroseriCategory = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { name } = req.body as { name: string };
  const karoseriCategory = await prisma.karoseriCategory.create({
    data: { name },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: karoseriCategory,
  });
};

export const updateKaroseriCategory = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const { name } = req.body as { name: string };
  const karoseriCategory = await prisma.karoseriCategory.update({
    where: { id: Number(id) },
    data: { name },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: karoseriCategory,
  });
};

export const deleteKaroseriCategory = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const karoseriCategory = await prisma.karoseriCategory.delete({
    where: { id: Number(id) },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: karoseriCategory,
  });
};
