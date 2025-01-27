import { FastifyInstance } from "fastify";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { checkSession } from "../middlewares/checkSession";

async function categoryRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createCategory);
  fastify.get("/", { preHandler: checkSession }, getAllCategories);
  fastify.get("/:id", { preHandler: checkSession }, getCategoryById);
  fastify.put("/:id", { preHandler: checkSession }, updateCategory);
  fastify.delete("/:id", { preHandler: checkSession }, deleteCategory);
}

export default categoryRoutes;
