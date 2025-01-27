import { FastifyInstance } from "fastify";
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/roleController";
import { checkSession } from "../middlewares/checkSession";

async function roleRoutes(fastify: FastifyInstance) {
  fastify.post("/roles", { preHandler: checkSession }, createRole);
  fastify.get("/roles", { preHandler: checkSession }, getAllRoles);
  fastify.get("/roles/:id", { preHandler: checkSession }, getRoleById);
  fastify.put("/roles/:id", { preHandler: checkSession }, updateRole);
  fastify.delete("/roles/:id", { preHandler: checkSession }, deleteRole);
}

export default roleRoutes;
