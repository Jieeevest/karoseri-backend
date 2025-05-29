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
  karoseriCategoriesRoutes,
  billofmaterialsRoutes,
  projectRoutes,
} from "./routes";

const server = Fastify({
  logger: true,
});

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

server.get("/", function () {
  return "Hello world!";
});

const prefix = "/api/v1";

server.register(authenticationRoutes, { prefix: prefix + "/auth" });
server.register(categoryRoutes, { prefix: prefix + "/categories" });
server.register(employeeRoutes, { prefix: prefix + "/employees" });
server.register(groupRoutes, { prefix: prefix + "/groups" });
server.register(inboundRoutes, { prefix: prefix + "/inbounds" });
server.register(inboundItemsRoutes, { prefix: prefix + "/inbound-items" });
server.register(inventoryRoutes, { prefix: prefix + "/inventory" });
server.register(outboundRoutes, { prefix: prefix + "/outbounds" });
server.register(outboundItemsRoutes, { prefix: prefix + "/outbound-items" });
server.register(positionRoutes, { prefix: prefix + "/positions" });
server.register(requestItemRoutes, { prefix: prefix + "/request-items" });
server.register(requestRoutes, { prefix: prefix + "/requests" });
server.register(roleRoutes, { prefix: prefix + "/roles" });
server.register(savingLocationRoutes, { prefix: prefix + "/locations" });
server.register(typeRoutes, { prefix: prefix + "/types" });
server.register(supplierRoutes, { prefix: prefix + "/suppliers" });
server.register(vehicleRoutes, { prefix: prefix + "/vehicles" });
server.register(karoseriCategoriesRoutes, {
  prefix: prefix + "/karoseri-categories",
});
server.register(billofmaterialsRoutes, { prefix: prefix + "/billofmaterials" });
server.register(projectRoutes, { prefix: prefix + "/projects" });

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
