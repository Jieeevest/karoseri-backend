import { FastifyInstance } from "fastify";
import {
  createVehicleOutbound,
  getAllVehicleOutbounds,
  getVehicleOutboundById,
  updateVehicleOutbound,
  deleteVehicleOutbound,
} from "../controllers/vehicleOutboundController";
import { checkSession } from "../middlewares/checkSession";

async function vehicleOutboundRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createVehicleOutbound);
  fastify.get("/", { preHandler: checkSession }, getAllVehicleOutbounds);
  fastify.get("/:id", { preHandler: checkSession }, getVehicleOutboundById);
  fastify.put("/:id", { preHandler: checkSession }, updateVehicleOutbound);
  fastify.delete("/:id", { preHandler: checkSession }, deleteVehicleOutbound);
}

export default vehicleOutboundRoutes;
