import { FastifyInstance } from "fastify";
import {
  createKaroseriCategory,
  getAllKaroseriCategories,
  getKaroseriCategoryById,
  updateKaroseriCategory,
  deleteKaroseriCategory,
} from "../controllers/karoseriCategoryController";
import { checkSession } from "../middlewares/checkSession";

async function karoseriCategoriesRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createKaroseriCategory);
  fastify.get("/", { preHandler: checkSession }, getAllKaroseriCategories);
  fastify.get("/:id", { preHandler: checkSession }, getKaroseriCategoryById);
  fastify.put("/:id", { preHandler: checkSession }, updateKaroseriCategory);
  fastify.delete("/:id", { preHandler: checkSession }, deleteKaroseriCategory);
}

export default karoseriCategoriesRoutes;
