import { FastifyInstance } from "fastify";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { checkSession } from "../middlewares/checkSession";

async function projectRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createProject);
  fastify.get("/", { preHandler: checkSession }, getAllProjects);
  fastify.get("/:id", { preHandler: checkSession }, getProjectById);
  fastify.put("/:id", { preHandler: checkSession }, updateProject);
  fastify.delete("/:id", { preHandler: checkSession }, deleteProject);
}

export default projectRoutes;
