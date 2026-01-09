import { FastifyInstance } from "fastify";
import {
  createItemUnit,
  getAllItemUnits,
  getItemUnitById,
  updateItemUnit,
  deleteItemUnit,
} from "../controllers/itemUnitController";
import { checkSession } from "../middlewares/checkSession";

async function itemUnitRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createItemUnit);
  fastify.get("/", { preHandler: checkSession }, getAllItemUnits);
  fastify.get("/:id", { preHandler: checkSession }, getItemUnitById);
  fastify.put("/:id", { preHandler: checkSession }, updateItemUnit);
  fastify.delete("/:id", { preHandler: checkSession }, deleteItemUnit);
}

export default itemUnitRoutes;
