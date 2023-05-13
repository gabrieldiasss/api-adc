import { Course } from "../../models/courses";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateCourseController {
    handle(httpRequest: HttpRequest<CreateCoursesParams>): Promise<HttpResponse<Course>>
}

export interface CreateCoursesParams {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface ICreateCoursesRepository {
    createCourse(params: CreateCoursesParams): Promise<Course>
}