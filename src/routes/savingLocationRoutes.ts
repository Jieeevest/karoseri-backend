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
  fastify.post(
    "/saving-locations",
    { preHandler: checkSession },
    createSavingLocation
  );
  fastify.get(
    "/saving-locations",
    { preHandler: checkSession },
    getAllSavingLocations
  );
  fastify.get(
    "/saving-locations/:id",
    { preHandler: checkSession },
    getSavingLocationById
  );
  fastify.put(
    "/saving-locations/:id",
    { preHandler: checkSession },
    updateSavingLocation
  );
  fastify.delete(
    "/saving-locations/:id",
    { preHandler: checkSession },
    deleteSavingLocation
  );
}

export default savingLocationRoutes;
