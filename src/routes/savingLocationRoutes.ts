import { FastifyInstance } from "fastify";
import {
  createSavingLocation,
  getAllSavingLocations,
  getSavingLocationById,
  updateSavingLocation,
  deleteSavingLocation,
} from "../controllers/savingLocationController";
import { checkSession } from "../middlewares/checkSession";

async function savingLocationRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createSavingLocation);
  fastify.get("/", { preHandler: checkSession }, getAllSavingLocations);
  fastify.get("/:id", { preHandler: checkSession }, getSavingLocationById);
  fastify.put("/:id", { preHandler: checkSession }, updateSavingLocation);
  fastify.delete("/:id", { preHandler: checkSession }, deleteSavingLocation);
}

export default savingLocationRoutes;
