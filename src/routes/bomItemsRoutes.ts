import { FastifyInstance } from "fastify";
import {
  createBomItem,
  getAllBomItems,
  getBomItemById,
  updateBomItem,
  deleteBomItem,
} from "../controllers/bomItemController";
import { checkSession } from "../middlewares/checkSession";

async function bomItemsRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createBomItem);
  fastify.get("/", { preHandler: checkSession }, getAllBomItems);
  fastify.get("/:id", { preHandler: checkSession }, getBomItemById);
  fastify.put("/:id", { preHandler: checkSession }, updateBomItem);
  fastify.delete("/:id", { preHandler: checkSession }, deleteBomItem);
}

export default bomItemsRoutes;
