import {
  apiErrorResponse,
  apiSuccessResponse,
  prisma,
} from "../utils/utils.js";
import bcrypt from 'bcryptjs';
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
        password:hashedPassword,
        firstName,
        lastName,
        user_type,
        address,
        city,
        phone_number,
        delivery_type,
      },
      select:{
        email:true,
        firstName:true,
        lastName:true,
      }
    });
    if (user) {
      return apiSuccessResponse(res, 200, "User created successfully", user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const updateUser = async (req,res) =>  {
  const {
    firstName,
    lastName,
    user_type,
    address,
    city,
    phone_number,
    delivery_type,
  } = req.body;
    
}