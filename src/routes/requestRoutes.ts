import { FastifyInstance } from "fastify";
import {
  createRequest,
  getAllRequests,
} from "../controllers/requestController";
import { checkSession } from "../middlewares/checkSession";

async function requestRoutes(fastify: FastifyInstance) {
  fastify.post("/", { preHandler: checkSession }, createRequest);
  fastify.get("/", { preHandler: checkSession }, getAllRequests);
}

export default requestRoutes;
