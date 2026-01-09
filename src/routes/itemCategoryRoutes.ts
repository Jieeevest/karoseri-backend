import { FastifyInstance } from "fastify";
import {
  createItemCategory,
  getAllItemCategories,
  getItemCategoryById,
  updateItemCategory,
  deleteItemCategory,
} from "../controllers/itemCategoryController";
import { checkSession } from "../middlewares/checkSession";

async function itemCategoryRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createItemCategory);
  fastify.get("/", { preHandler: checkSession }, getAllItemCategories);
  fastify.get("/:id", { preHandler: checkSession }, getItemCategoryById);
  fastify.put("/:id", { preHandler: checkSession }, updateItemCategory);
  fastify.delete("/:id", { preHandler: checkSession }, deleteItemCategory);
}

export default itemCategoryRoutes;
