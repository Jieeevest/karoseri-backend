import { FastifyInstance } from "fastify";
import {
  createOutbound,
  getAllOutbounds,
  getOutboundById,
  updateOutbound,
  deleteOutbound,
} from "../controllers/outboundController";
import { checkSession } from "../middlewares/checkSession";

async function outboundRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createOutbound);
  fastify.get("/", { preHandler: checkSession }, getAllOutbounds);
  fastify.get("/:id", { preHandler: checkSession }, getOutboundById);
  fastify.put("/:id", { preHandler: checkSession }, updateOutbound);
  fastify.delete("/:id", { preHandler: checkSession }, deleteOutbound);
}

export default outboundRoutes;
