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
  fastify.post(
    "/request-items",
    { preHandler: checkSession },
    createRequestItem
  );
  fastify.get(
    "/request-items",
    { preHandler: checkSession },
    getAllRequestItems
  );
  fastify.get(
    "/request-items/:id",
    { preHandler: checkSession },
    getRequestItemById
  );
  fastify.put(
    "/request-items/:id",
    { preHandler: checkSession },
    updateRequestItem
  );
  fastify.delete(
    "/request-items/:id",
    { preHandler: checkSession },
    deleteRequestItem
  );
}

export default requestItemRoutes;
