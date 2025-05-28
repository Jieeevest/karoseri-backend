import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

export const getAllProjects = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const projects = await prisma.project.findMany();
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: projects,
  });
};

export const getProjectById = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: project,
  });
};

export const createProject = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    customerName,
    name,
    karoseriCategoryId,
    unitCount,
    status,
    startDate,
    endDate,
  } = req.body as {
    customerName: string;
    name: string;
    karoseriCategoryId: number;
    unitCount: number;
    status: string;
    startDate: Date;
    endDate: Date;
  };
  const project = await prisma.project.create({
    data: {
      customerName,
      name,
      karoseriCategoryId,
      unitCount,
      status,
      startDate,
      endDate,
    },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: project,
  });
};

export const updateProject = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const {
    customerName,
    name,
    karoseriCategoryId,
    unitCount,
    status,
    startDate,
    endDate,
  } = req.body as {
    customerName: string;
    name: string;
    karoseriCategoryId: number;
    unitCount: number;
    status: string;
    startDate: Date;
    endDate: Date;
  };
  const project = await prisma.project.update({
    where: { id: Number(id) },
    data: {
      customerName,
      name,
      karoseriCategoryId,
      unitCount,
      status,
      startDate,
      endDate,
    },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: project,
  });
};

export const deleteProject = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  const project = await prisma.project.delete({
    where: { id: Number(id) },
  });
  sendResponse(reply, 200, {
    success: true,
    message: "Success",
    data: project,
  });
};
