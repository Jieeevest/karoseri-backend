import { FastifyInstance } from "fastify";
import {
  createType,
  getAllTypes,
  getTypeById,
  updateType,
  deleteType,
} from "../controllers/typeController";
import { checkSession } from "../middlewares/checkSession";

async function typeRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createType);
  fastify.get("/", { preHandler: checkSession }, getAllTypes);
  fastify.get("/:id", { preHandler: checkSession }, getTypeById);
  fastify.put("/:id", { preHandler: checkSession }, updateType);
  fastify.delete("/:id", { preHandler: checkSession }, deleteType);
}
export default typeRoutes;
