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
  fastify.post("/types", { preHandler: checkSession }, createType);
  fastify.get("/types", { preHandler: checkSession }, getAllTypes);
  fastify.get("/types/:id", { preHandler: checkSession }, getTypeById);
  fastify.put("/types/:id", { preHandler: checkSession }, updateType);
  fastify.delete("/types/:id", { preHandler: checkSession }, deleteType);
}
export default typeRoutes;
