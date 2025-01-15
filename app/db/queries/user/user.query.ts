import User from "@/models/users.model";

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({
    email: email,
  }).lean();

  if (!user) return new Error("User not found");

  return {
    ...user,
    _id: user._id.toString(),
  };
};
