import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/users";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Gabriel",
        lastName: "Dias",
        email: "gabriel@gmail.com",
        password: "123",
      },
    ];
  }
}
