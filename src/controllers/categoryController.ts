import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create a Category
export const createCategory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, description } = request.body as {
    name: string;
    description: string;
  };

  try {
    const newCategory = await prisma.category.create({
      data: { name, description },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating category",
      error,
    });
  }
};

// Get All Categories
export const getAllCategories = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const categories = await prisma.category.findMany();

    sendResponse(reply, 200, {
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving categories",
      error,
    });
  }
};

// Get Category by ID
export const getCategoryById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Category not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving category",
      error,
    });
  }
};

// Update Category
export const updateCategory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { name, description } = request.body as {
    name?: string;
    description?: string;
  };

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name, description },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating category",
      error,
    });
  }
};

// Delete Category
export const deleteCategory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.category.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting category",
      error,
    });
  }
};
