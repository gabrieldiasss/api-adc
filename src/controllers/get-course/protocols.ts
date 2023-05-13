import { Course } from "../../models/courses";
import { HttpResponse } from "../protocols";

export interface IGetCoursesController {
  handle(): Promise<HttpResponse<Course[]>>;
}

export interface IGetCoursesRepository {
  getCourses(): Promise<Course[]>;
}
