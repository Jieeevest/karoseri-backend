import { FastifyInstance } from "fastify";
import {
  createBOM,
  getAllBOMs,
  getBOMById,
  updateBOM,
  deleteBOM,
} from "../controllers/billofmaterialsController";
import { checkSession } from "../middlewares/checkSession";

async function billofmaterialsRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createBOM);
  fastify.get("/", { preHandler: checkSession }, getAllBOMs);
  fastify.get("/:id", { preHandler: checkSession }, getBOMById);
  fastify.put("/:id", { preHandler: checkSession }, updateBOM);
  fastify.delete("/:id", { preHandler: checkSession }, deleteBOM);
}

export default billofmaterialsRoutes;
