import { Course } from "../../models/courses";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateCoursesParams,
  ICreateCourseController,
  ICreateCoursesRepository,
} from "./protocols";

export class CreateCourseController implements ICreateCourseController {
  constructor(private readonly createCourseRepository: ICreateCoursesRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateCoursesParams>
  ): Promise<HttpResponse<Course>> {
    try {
      const { body } = httpRequest;

      if (!body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      const course = await this.createCourseRepository.createCourse(body);

      return {
        statusCode: 201,
        body: course,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
