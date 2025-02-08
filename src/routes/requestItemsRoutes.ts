import { FastifyInstance } from "fastify";
import {
  createRequestItem,
  getAllRequestItems,
  getRequestItemById,
  updateRequestItem,
  deleteRequestItem,
} from "../controllers/requestItemsController";
import { checkSession } from "../middlewares/checkSession";

async function requestItemRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createRequestItem);
  fastify.get("/", { preHandler: checkSession }, getAllRequestItems);
  fastify.get("/:id", { preHandler: checkSession }, getRequestItemById);
  fastify.put("/:id", { preHandler: checkSession }, updateRequestItem);
  fastify.delete("/:id", { preHandler: checkSession }, deleteRequestItem);
}

export default requestItemRoutes;
