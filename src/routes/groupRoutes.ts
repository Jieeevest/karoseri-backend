import { FastifyInstance } from "fastify";
import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} from "../controllers/groupController";
import { checkSession } from "../middlewares/checkSession";

async function groupRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createGroup);
  fastify.get("/", { preHandler: checkSession }, getAllGroups);
  fastify.get("/:id", { preHandler: checkSession }, getGroupById);
  fastify.put("/:id", { preHandler: checkSession }, updateGroup);
  fastify.delete("/:id", { preHandler: checkSession }, deleteGroup);
}

export default groupRoutes;
