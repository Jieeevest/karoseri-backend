import { FastifyInstance } from "fastify";
import {
  createPurchaseOrderConfirmation,
  getAllConfirmations,
  getConfirmationById,
  deleteConfirmation,
} from "../controllers/purchaseOrderConfirmationController";
import { checkSession } from "../middlewares/checkSession";

async function purchaseOrderConfirmationRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    { preHandler: checkSession },
    createPurchaseOrderConfirmation
  );
  fastify.get("/", { preHandler: checkSession }, getAllConfirmations);
  fastify.get("/:id", { preHandler: checkSession }, getConfirmationById);
  fastify.delete("/:id", { preHandler: checkSession }, deleteConfirmation);
}

export default purchaseOrderConfirmationRoutes;
