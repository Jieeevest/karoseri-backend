import { FastifyInstance } from "fastify";
import {
  createSupplierBill,
  getAllSupplierBills,
  getSupplierBillById,
  updateSupplierBill,
  deleteSupplierBill,
  createBillPayment,
} from "../controllers/supplierBillController";
import { checkSession } from "../middlewares/checkSession";

async function supplierBillRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createSupplierBill);
  fastify.get("/", { preHandler: checkSession }, getAllSupplierBills);
  fastify.get("/:id", { preHandler: checkSession }, getSupplierBillById);
  fastify.put("/:id", { preHandler: checkSession }, updateSupplierBill);
  fastify.delete("/:id", { preHandler: checkSession }, deleteSupplierBill);
  fastify.post("/payment", { preHandler: checkSession }, createBillPayment);
}

export default supplierBillRoutes;
