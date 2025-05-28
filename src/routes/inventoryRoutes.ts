import { FastifyInstance } from "fastify";
import {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController";
import { checkSession } from "../middlewares/checkSession";

async function inventoryRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createInventory);
  fastify.get("/", { preHandler: checkSession }, getAllInventory);
  fastify.get("/:id", { preHandler: checkSession }, getInventoryById);
  fastify.put("/:id", { preHandler: checkSession }, updateInventory);
  fastify.delete("/:id", { preHandler: checkSession }, deleteInventory);
}

export default inventoryRoutes;
