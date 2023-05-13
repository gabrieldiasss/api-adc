import express from "express";
import { config } from "dotenv";
import { GetCoursesController } from "./controllers/get-course/get-courses";
import { MongoGetCoursesRepository } from "./repositories/get-courses/mongo-get-courses";
import { MongoClient } from "./database/mongo";
import { MongoCreateCourseRepository } from "./repositories/create-course/mongo-create-course";
import { CreateCourseController } from "./controllers/create-course/create-course";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();
  app.get("/courses", async (req, res) => {
    const mongoGetCoursesRepository = new MongoGetCoursesRepository();
    const getCoursesController = new GetCoursesController(mongoGetCoursesRepository);

    const { body, statusCode } = await getCoursesController.handle();
    res.send(body).status(statusCode);
  });
  const port = process.env.PORT || 8000;

  app.post("/courses", async (req, res) => {
    const mongoCreateCoursesRepository = new MongoCreateCourseRepository();

    const createCoursesController = new CreateCourseController(
      mongoCreateCoursesRepository
    );

    const { body, statusCode } = await createCoursesController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
