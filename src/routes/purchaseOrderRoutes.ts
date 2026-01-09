import { FastifyInstance } from "fastify";
import {
  createPurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder,
  deletePurchaseOrder,
} from "../controllers/purchaseOrderController";
import { checkSession } from "../middlewares/checkSession";

async function purchaseOrderRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createPurchaseOrder);
  fastify.get("/", { preHandler: checkSession }, getAllPurchaseOrders);
  fastify.get("/:id", { preHandler: checkSession }, getPurchaseOrderById);
  fastify.put("/:id", { preHandler: checkSession }, updatePurchaseOrder);
  fastify.delete("/:id", { preHandler: checkSession }, deletePurchaseOrder);
}

export default purchaseOrderRoutes;
