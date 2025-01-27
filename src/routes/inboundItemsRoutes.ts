import { FastifyInstance } from "fastify";
import {
  createInboundItem,
  getAllInboundItems,
  getInboundItemById,
  updateInboundItem,
  deleteInboundItem,
} from "../controllers/inboundItemsController";
import { checkSession } from "../middlewares/checkSession";

async function inboundItemsRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createInboundItem);
  fastify.get("/", { preHandler: checkSession }, getAllInboundItems);
  fastify.get("/:id", { preHandler: checkSession }, getInboundItemById);
  fastify.put("/:id", { preHandler: checkSession }, updateInboundItem);
  fastify.delete("/:id", { preHandler: checkSession }, deleteInboundItem);
}

export default inboundItemsRoutes;
