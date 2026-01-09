import { FastifyInstance } from "fastify";
import {
  createVehicleBrand,
  getAllVehicleBrands,
  getVehicleBrandById,
  updateVehicleBrand,
  deleteVehicleBrand,
} from "../controllers/vehicleBrandController";
import { checkSession } from "../middlewares/checkSession";

async function vehicleBrandRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createVehicleBrand);
  fastify.get("/", { preHandler: checkSession }, getAllVehicleBrands);
  fastify.get("/:id", { preHandler: checkSession }, getVehicleBrandById);
  fastify.put("/:id", { preHandler: checkSession }, updateVehicleBrand);
  fastify.delete("/:id", { preHandler: checkSession }, deleteVehicleBrand);
}

export default vehicleBrandRoutes;
