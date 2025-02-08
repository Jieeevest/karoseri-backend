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
  fastify.post("/", { preHandler: checkSession }, createRole);
  fastify.get("/", { preHandler: checkSession }, getAllRoles);
  fastify.get("/:id", { preHandler: checkSession }, getRoleById);
  fastify.put("/:id", { preHandler: checkSession }, updateRole);
  fastify.delete("/:id", { preHandler: checkSession }, deleteRole);
}

export default roleRoutes;
