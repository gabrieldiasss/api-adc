import {
  CreateCoursesParams,
  ICreateCoursesRepository
} from "../../controllers/create-course/protocols";
import { MongoClient } from "../../database/mongo";
import { Course } from "../../models/courses";

export class MongoCreateCourseRepository implements ICreateCoursesRepository {
  async createCourse(params: CreateCoursesParams): Promise<Course> {
    const { insertedId } = await MongoClient.db
      .collection("courses")
      .insertOne(params);

    const Course = await MongoClient.db
      .collection<Omit<Course, "id">>("courses")
      .findOne({ _id: insertedId });

    if (!Course) {
      throw new Error("Course not created");
    }

    const { _id, ...rest } = Course;

    return { id: _id.toHexString(), ...rest };
  }
}
