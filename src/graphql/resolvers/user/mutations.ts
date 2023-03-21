import { User } from "../../../db/models";
import { UserInterface } from "../../../db/models/user";
import { Auth } from "../../../utils/auth";
import { AppError } from "../../../utils/error";

const user = new User();

const userMutations = {
  signup: async (_: any, args: UserInterface) => {
    console.log(args);

    if (await user.findByEmail(args.email)) {
      new AppError("Supplied email is already registered!", 400).badUserInput();
    }
    const newUser = await user.create(args);

    return new Auth().authenticate(newUser);
  },

  login: async (_: any, args: UserInterface) => {
    console.log(args);

    const savedUser = await user.findByEmail(args.email);

    const correctPassword = await user.comparePasswords(
      args.password,
      savedUser.password
    );
    if (!savedUser || !correctPassword) {
      new AppError("Supplied invalid email or password", 400).badUserInput();
    }
    return new Auth().authenticate(savedUser);
  },

  //   updateUser: async (_, args) => {},
  //   updatePassword: async (_, args) => {},
};

export default userMutations;
