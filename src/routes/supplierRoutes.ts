import { FastifyInstance } from "fastify";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController";
import { checkSession } from "../middlewares/checkSession";

async function supplierRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createSupplier);
  fastify.get("/", { preHandler: checkSession }, getAllSuppliers);
  fastify.get("/:id", { preHandler: checkSession }, getSupplierById);
  fastify.put("/:id", { preHandler: checkSession }, updateSupplier);
  fastify.delete("/:id", { preHandler: checkSession }, deleteSupplier);
}

export default supplierRoutes;
