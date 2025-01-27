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
  fastify.post("/suppliers", { preHandler: checkSession }, createSupplier);
  fastify.get("/suppliers", { preHandler: checkSession }, getAllSuppliers);
  fastify.get("/suppliers/:id", { preHandler: checkSession }, getSupplierById);
  fastify.put("/suppliers/:id", { preHandler: checkSession }, updateSupplier);
  fastify.delete(
    "/suppliers/:id",
    { preHandler: checkSession },
    deleteSupplier
  );
}

export default supplierRoutes;
