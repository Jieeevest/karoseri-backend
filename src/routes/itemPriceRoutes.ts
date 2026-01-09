import { FastifyInstance } from "fastify";
import {
  createItemPrice,
  getAllItemPrices,
  getItemPriceById,
  updateItemPrice,
  deleteItemPrice,
} from "../controllers/itemPriceController";
import { checkSession } from "../middlewares/checkSession";

async function itemPriceRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createItemPrice);
  fastify.get("/", { preHandler: checkSession }, getAllItemPrices);
  fastify.get("/:id", { preHandler: checkSession }, getItemPriceById);
  fastify.put("/:id", { preHandler: checkSession }, updateItemPrice);
  fastify.delete("/:id", { preHandler: checkSession }, deleteItemPrice);
}

export default itemPriceRoutes;
