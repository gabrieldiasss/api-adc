import { IGetCoursesRepository } from "../../controllers/get-course/protocols";
import { MongoClient } from "../../database/mongo";
import { Course } from "../../models/courses";

export class MongoGetCoursesRepository implements IGetCoursesRepository {
  async getCourses(): Promise<Course[]> {
    const Courses = await MongoClient.db
      .collection<Omit<Course, "id">>("courses")
      .find({})
      .toArray();

    return Courses.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
