import { FastifyInstance } from "fastify";
import {
  createInbound,
  getAllInbounds,
  getInboundById,
  updateInbound,
  deleteInbound,
} from "../controllers/inboundController";
import { checkSession } from "../middlewares/checkSession";

async function inboundRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createInbound);
  fastify.get("/", { preHandler: checkSession }, getAllInbounds);
  fastify.get("/:id", { preHandler: checkSession }, getInboundById);
  fastify.put("/:id", { preHandler: checkSession }, updateInbound);
  fastify.delete("/:id", { preHandler: checkSession }, deleteInbound);
}

export default inboundRoutes;
