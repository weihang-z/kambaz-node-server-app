import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import UserModel from "./model.js";

export default function UsersDao() {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);  
  };

  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };

  
  const findAllUsers = () => model.find();
  
  const findUserById = (userId) => UserModel.findById(userId);
  
  const findUserByUsername = (username) => UserModel.findOne({ username });
  
  const findUserByCredentials = (username, password) =>
    UserModel.findOne({ username, password });

  const updateUser = (userId, user) => {
    return model.updateOne({ _id: userId }, { $set: user });
  };
  
  const deleteUser = (userId) => {
    return UserModel.findByIdAndDelete(userId);
  };

  const findUsersByCourse = (courseId) => {
    return UserModel.find({ courses: courseId });
  };
  const findUsersByRole = (role) => model.find({ role: role });


  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
    findUsersByCourse,
    findUsersByRole,
    findUsersByPartialName
  };
}