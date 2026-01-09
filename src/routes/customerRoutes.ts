import { FastifyInstance } from "fastify";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController";
import { checkSession } from "../middlewares/checkSession";

async function customerRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createCustomer);
  fastify.get("/", { preHandler: checkSession }, getAllCustomers);
  fastify.get("/:id", { preHandler: checkSession }, getCustomerById);
  fastify.put("/:id", { preHandler: checkSession }, updateCustomer);
  fastify.delete("/:id", { preHandler: checkSession }, deleteCustomer);
}

export default customerRoutes;
