import { FastifyInstance } from "fastify";
import {
  createPosition,
  getAllPositions,
  getPositionById,
  updatePosition,
  deletePosition,
} from "../controllers/positionController";
import { checkSession } from "../middlewares/checkSession";

async function positionRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createPosition);
  fastify.get("/", { preHandler: checkSession }, getAllPositions);
  fastify.get("/:id", { preHandler: checkSession }, getPositionById);
  fastify.put("/:id", { preHandler: checkSession }, updatePosition);
  fastify.delete("/:id", { preHandler: checkSession }, deletePosition);
}

export default positionRoutes;
