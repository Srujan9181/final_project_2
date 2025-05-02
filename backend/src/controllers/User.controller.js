import { Account, Staff } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const sendResponse = (res, status, message, data = {}) => {
  res.status(status).json({ message, ...data });
};

const hashPassword = async (password) => await bcrypt.hash(password, 10);

const validateUserExistence = async (email) => {
  const user = await Account.findOne({ email });
  const member = await Staff.findOne({ email });
  return { user, member };
};

const Signin = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    const { user, member } = await validateUserExistence(email);

    if (member) return sendResponse(res, 400, "User is already in a team", { member });

    if (!user) {
      const hashedPassword = await hashPassword(password);
      const newUser = new Account({ firstname, lastname, email, role, password: hashedPassword });
      const savedUser = await newUser.save();
      return sendResponse(res, 201, "User created successfully", { user: savedUser });
    }
    sendResponse(res, 400, "User already exists", { user });
  } catch (error) {
    sendResponse(res, 500, "Error creating user", { error: error.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const { _id, password, ...updatedFields } = req.body;
    const hashedPassword = await hashPassword(password);
    const updatedUser = await Account.findByIdAndUpdate(_id, { ...updatedFields, password: hashedPassword }, { new: true });
    sendResponse(res, 200, "Profile updated successfully", { updatedUser });
  } catch (error) {
    sendResponse(res, 500, "Error updating profile", { error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, member } = await validateUserExistence(email);

    if (!user && !member) return sendResponse(res, 400, "User not found");

    const comparePassword = async (account) => await bcrypt.compare(password, account.password);

    if (user) {
      const isMatch = await comparePassword(user);
      if (!isMatch) return sendResponse(res, 400, "Invalid password", { user });
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      return sendResponse(res, 200, "User logged in successfully", { token, user });
    }

    if (member) {
      const isMatch = await comparePassword(member);
      if (!isMatch) return sendResponse(res, 400, "Invalid password", { member });
      const token = jwt.sign({ id: member._id }, process.env.SECRET_KEY);
      return sendResponse(res, 200, "Staff member logged in successfully", { token, member });
    }
  } catch (error) {
    sendResponse(res, 500, "Error logging in user", { error: error.message });
  }
};

const Addteammember = async (req, res) => {
  try {
    const { fullname, email, phone, password, role, createdBy } = req.body;
    const { user, member } = await validateUserExistence(email);

    if (member) return sendResponse(res, 400, "Staff member already exists", { member });
    if (user) return sendResponse(res, 400, "User already exists", { user });

    const hashedPassword = await hashPassword(password);
    const newTeamMember = new Staff({ fullname, email, phone, password: hashedPassword, role, createdBy });
    const savedTeamMember = await newTeamMember.save();
    sendResponse(res, 201, "Team member created successfully", { member: savedTeamMember });
  } catch (error) {
    sendResponse(res, 500, "Error adding team member", { error: error.message });
  }
};

const fetchTeammembers = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMembers = await Staff.find({ createdBy: id }).select("-password");
    sendResponse(res, 200, "Team members fetched successfully", { teamMembers });
  } catch (error) {
    sendResponse(res, 500, "Error fetching team members", { error: error.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedMember = await Team.findByIdAndDelete(id);
    sendResponse(res, 200, "Team member deleted successfully", { deletedMember });
  } catch (error) {
    sendResponse(res, 500, "Error deleting team member", { error: error.message });
  }
};

export {
  Signin,
  editProfile,
  Login,
  Addteammember,
  fetchTeammembers,
  deleteMember
};
