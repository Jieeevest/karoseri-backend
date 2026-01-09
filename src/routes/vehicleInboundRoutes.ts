import { FastifyInstance } from "fastify";
import {
  createVehicleInbound,
  getAllVehicleInbounds,
  getVehicleInboundById,
  updateVehicleInbound,
  deleteVehicleInbound,
} from "../controllers/vehicleInboundController";
import { checkSession } from "../middlewares/checkSession";

async function vehicleInboundRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createVehicleInbound);
  fastify.get("/", { preHandler: checkSession }, getAllVehicleInbounds);
  fastify.get("/:id", { preHandler: checkSession }, getVehicleInboundById);
  fastify.put("/:id", { preHandler: checkSession }, updateVehicleInbound);
  fastify.delete("/:id", { preHandler: checkSession }, deleteVehicleInbound);
}

export default vehicleInboundRoutes;
