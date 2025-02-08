import {
  apiErrorResponse,
  apiSuccessResponse,
  prisma,
} from "../utils/utils.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const createUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    user_type,
    address,
    city,
    phone_number,
    delivery_type,
  } = req.body;
  if (!email || !password) {
    return apiErrorResponse(res, 400, "Email and password are required");
  }

  try {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (emailExists) {
      return apiErrorResponse(res, 400, "Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        user_type,
        address,
        city,
        phone_number,
        delivery_type,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        id: true,
      },
    });
    if (user) {
      return apiSuccessResponse(res, 200, "User created successfully", user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return apiErrorResponse(res, 400, "User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return apiErrorResponse(res, 400, "Invalid password");
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        user_type: user.user_type,
        address: user.address,
        city: user.city,
        phone_number: user.phone_number,
        delivery_type: user.delivery_type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const data = {
      data: user,
      token: token,
    };
    return apiSuccessResponse(res, 200, "User logged in successfully", data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  console.log(req, "fadsUserRequrest");
  const id = parseInt(req.params.id, 10);
  const {
    firstName,
    lastName,
    user_type,
    address,
    city,
    phone_number,
    delivery_type,
  } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });
    if (!existingUser) {
      return apiErrorResponse(res, 400, "User not found");
    }
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName,
        lastName,
        user_type,
        address,
        city,
        phone_number,
        delivery_type,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        id: true,
      },
    });
    if (user.id) {
      return apiSuccessResponse(res, 200, "User updated successfully", user);
    }
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Server error");
  }
};
export const updatePassword = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { oldPassword, newPassword, confirmPassword } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        password:true,
      },
    });

    if (!existingUser) {
      return apiErrorResponse(res, 400, "User not found");
    }
    if(newPassword !== confirmPassword) {
      return apiErrorResponse(res, 400, "Password and confirm password does not match");
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, existingUser.password);
    if (!isPasswordValid) {
      return apiErrorResponse(res, 400, "Old Password is wrong");
    }

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password:newPassword,
      },
    });
    if (user.id) {
      return apiSuccessResponse(res, 200, "User updated successfully", user);
    }
  } catch (e) {
    console.log(e);
    return apiErrorResponse(res, 500, "Server error");
  }
};
export const getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return apiErrorResponse(res, 400, "User not found");
    }
    return apiSuccessResponse(res, 200, "User found successfully", user);
  } catch (e) {}
  return;
};
