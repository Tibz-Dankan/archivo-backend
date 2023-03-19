import { User } from "../../../db/models";
import { UserInterface } from "../../../db/models/user";
import { Auth } from "../../../utils/auth";

const user = new User();

const userMutations = {
  signup: async (_: any, args: UserInterface) => {
    console.log(args);

    if (await user.findByEmail(args.email)) {
      throw new Error("Supplied email is already registered!");
    }
    const newUser = await user.create(args);

    return new Auth().authenticate(newUser);
  },

  login: async (_: any, args: UserInterface) => {
    console.log(args);

    const savedUser = await user.findByEmail(args.email);

    const isCorrectPassword = await user.comparePasswords(
      args.password,
      savedUser.password
    );
    if (!savedUser || !isCorrectPassword) {
      throw new Error("Supplied invalid email or password");
    }
    return new Auth().authenticate(savedUser);
  },

  //   updateUser: async (_, args) => {},
  //   updatePassword: async (_, args) => {},
};

export default userMutations;
