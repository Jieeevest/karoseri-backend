import { FastifyInstance } from "fastify";
import {
  createVehicleType,
  getAllVehicleTypes,
  getVehicleTypeById,
  updateVehicleType,
  deleteVehicleType,
} from "../controllers/vehicleTypeController";
import { checkSession } from "../middlewares/checkSession";

async function vehicleTypeRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createVehicleType);
  fastify.get("/", { preHandler: checkSession }, getAllVehicleTypes);
  fastify.get("/:id", { preHandler: checkSession }, getVehicleTypeById);
  fastify.put("/:id", { preHandler: checkSession }, updateVehicleType);
  fastify.delete("/:id", { preHandler: checkSession }, deleteVehicleType);
}

export default vehicleTypeRoutes;
