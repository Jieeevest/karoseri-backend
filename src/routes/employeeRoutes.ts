import { FastifyInstance } from "fastify";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";
import { checkSession } from "../middlewares/checkSession";

async function employeeRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createEmployee);
  fastify.get("/", { preHandler: checkSession }, getAllEmployees);
  fastify.get("/:id", { preHandler: checkSession }, getEmployeeById);
  fastify.put("/:id", { preHandler: checkSession }, updateEmployee);
  fastify.delete("/:id", { preHandler: checkSession }, deleteEmployee);
}

export default employeeRoutes;
