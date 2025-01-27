import { FastifyInstance } from "fastify";
import {
  createOutboundItem,
  getAllOutboundItems,
  getOutboundItemById,
  updateOutboundItem,
  deleteOutboundItem,
} from "../controllers/outboundItemsController";
import { checkSession } from "../middlewares/checkSession";

async function outboundItemRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createOutboundItem);
  fastify.get("/", { preHandler: checkSession }, getAllOutboundItems);
  fastify.get("/:id", { preHandler: checkSession }, getOutboundItemById);
  fastify.put("/:id", { preHandler: checkSession }, updateOutboundItem);
  fastify.delete("/:id", { preHandler: checkSession }, deleteOutboundItem);
}

export default outboundItemRoutes;
