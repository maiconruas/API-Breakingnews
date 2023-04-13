import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
const route = Router();

route.use('/', swaggerUi.serve);
route.get('/', swaggerUi.setup(swaggerDocument));

export default route;