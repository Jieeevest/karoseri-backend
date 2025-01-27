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
  fastify.post("/vehicles", { preHandler: checkSession }, createVehicle);
  fastify.get("/vehicles", { preHandler: checkSession }, getAllVehicles);
  fastify.get("/vehicles/:id", { preHandler: checkSession }, getVehicleById);
  fastify.put("/vehicles/:id", { preHandler: checkSession }, updateVehicle);
  fastify.delete("/vehicles/:id", { preHandler: checkSession }, deleteVehicle);
}

export default vehicleRoutes;
