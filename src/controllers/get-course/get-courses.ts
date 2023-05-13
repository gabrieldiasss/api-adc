import { IGetCoursesController, IGetCoursesRepository } from "./protocols";

export class GetCoursesController implements IGetCoursesController {
  constructor(private readonly getCoursesRepository: IGetCoursesRepository) {}

  async handle() {
    try {
      const courses = await this.getCoursesRepository.getCourses();

      return {
        statusCode: 200,
        body: courses,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
