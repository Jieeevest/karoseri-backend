import { FastifyInstance } from "fastify";
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController";
import { checkSession } from "../middlewares/checkSession";

async function vehicleRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createVehicle);
  fastify.get("/", { preHandler: checkSession }, getAllVehicles);
  fastify.get("/:id", { preHandler: checkSession }, getVehicleById);
  fastify.put("/:id", { preHandler: checkSession }, updateVehicle);
  fastify.delete("/:id", { preHandler: checkSession }, deleteVehicle);
}

export default vehicleRoutes;
