import Fastify from "fastify";
import cors from "@fastify/cors";
import {
  authenticationRoutes,
  categoryRoutes,
  employeeRoutes,
  groupRoutes,
  inboundRoutes,
  inboundItemsRoutes,
  inventoryRoutes,
  outboundRoutes,
  outboundItemsRoutes,
  positionRoutes,
  requestItemRoutes,
  requestRoutes,
  roleRoutes,
  savingLocationRoutes,
  typeRoutes,
  supplierRoutes,
  vehicleRoutes,
} from "./routes";

const server = Fastify();

// Register CORS middleware
server.register(cors, {
  origin: "*", // Allow all origins (not recommended in production)
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
});
server.get("/", function () {
  return "Hello world!";
});

server.register(authenticationRoutes, { prefix: "api/auth" });
server.register(categoryRoutes, { prefix: "api/category" });
server.register(employeeRoutes, { prefix: "api/employee" });
server.register(groupRoutes, { prefix: "api/group" });
server.register(inboundRoutes, { prefix: "api/inbound" });
server.register(inboundItemsRoutes, { prefix: "api/inbound-item" });
server.register(inventoryRoutes, { prefix: "api/inventory" });
server.register(outboundRoutes, { prefix: "api/outbound" });
server.register(outboundItemsRoutes, { prefix: "api/outbound-item" });
server.register(positionRoutes, { prefix: "api/position" });
server.register(requestItemRoutes, { prefix: "api/request-item" });
server.register(requestRoutes, { prefix: "api/request" });
server.register(roleRoutes, { prefix: "api/role" });
server.register(savingLocationRoutes, { prefix: "api/saving-location" });
server.register(typeRoutes, { prefix: "api/type" });
server.register(supplierRoutes, { prefix: "api/supplier" });
server.register(vehicleRoutes, { prefix: "api/vehicle" });

const start = async () => {
  try {
    // Set host to 0.0.0.0 and port to process.env.PORT or 3000
    await server.listen({
      host: "0.0.0.0",
      port: Number(process.env.PORT) || 3000,
    });
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
  } catch (err) {
    server.log.error(err);
  }
};

start();
