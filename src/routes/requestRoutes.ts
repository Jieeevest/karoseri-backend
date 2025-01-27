import { FastifyInstance } from "fastify";
import {
  createRequest,
  getAllRequests,
} from "../controllers/requestController";
import { checkSession } from "../middlewares/checkSession";

async function requestRoutes(fastify: FastifyInstance) {
  fastify.post("/requests", { preHandler: checkSession }, createRequest);
  fastify.get("/requests", { preHandler: checkSession }, getAllRequests);
}

export default requestRoutes;
