import { FastifyInstance } from "fastify";
import {
  createOrderSpec,
  getAllOrderSpecs,
  getOrderSpecById,
  updateOrderSpec,
  deleteOrderSpec,
  addOrderSpecItem,
} from "../controllers/orderSpecController";
import { checkSession } from "../middlewares/checkSession";

async function orderSpecRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createOrderSpec);
  fastify.get("/", { preHandler: checkSession }, getAllOrderSpecs);
  fastify.get("/:id", { preHandler: checkSession }, getOrderSpecById);
  fastify.put("/:id", { preHandler: checkSession }, updateOrderSpec);
  fastify.delete("/:id", { preHandler: checkSession }, deleteOrderSpec);
  fastify.post("/item", { preHandler: checkSession }, addOrderSpecItem);
}

export default orderSpecRoutes;
