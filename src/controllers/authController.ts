import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
// const SALT_ROUNDS = 10;

export const getCurrentUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendResponse(reply, 401, {
      success: false,
      message: "Authorization header is missing or invalid",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    // Find employee based on ID from token
    const employee = await prisma.employee.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        nik: true,
        email: true,
        phoneNumber: true,
        fullName: true,
        employeeNumber: true,
        role: true,
        group: true,
        position: true,
        status: true,
      },
    });

    if (!employee) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Employee not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Current employee retrieved successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    sendResponse(reply, 401, {
      success: false,
      message: "You are not authenticated",
    });
  }
};

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { client_url, email } = request.body as {
    client_url: string;
    email: string;
    password: string;
  };

  try {
    const employee = await prisma.employee.findFirst({
      where: { email },
      select: {
        id: true,
        nik: true,
        email: true,
        password: true,
        phoneNumber: true,
        fullName: true,
        employeeNumber: true,
        group: true,
        role: true,
        position: true,
      },
    });

    if (!employee || !employee.password) {
      return sendResponse(reply, 401, {
        success: false,
        message: "Invalid email or password",
      });
    }

    // If password validation is required, use bcrypt here
    // const isPasswordValid = await bcrypt.compare(password, employee.password);
    // if (!isPasswordValid) {
    //   return sendResponse(reply, 401, {
    //     success: false,
    //     message: "Invalid email or password",
    //   });
    // }

    const token = jwt.sign(
      { id: employee.id, email: employee.email },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const mappedEmployee = {
      id: employee.id,
      nik: employee.nik,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      fullName: employee.fullName,
      employeeNumber: employee.employeeNumber,
      group: employee.group,
      role: employee.role,
      position: employee.position,
    };

    sendResponse(reply, 200, {
      success: true,
      message: "Login successful",
      data: {
        token,
        ...mappedEmployee,
        client_url,
        authorized_url: `http://${client_url}/${token}`,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    sendResponse(reply, 500, {
      success: false,
      message: "Error during login",
      error,
    });
  }
};

export const forgetPassword = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email } = request.body as { email: string };

  try {
    const employee = await prisma.employee.findFirst({ where: { email } });

    if (!employee) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Employee not found",
      });
    }

    // Generate password reset token
    const resetToken = jwt.sign({ id: employee.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Generate password reset link
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${employee.fullName},</p>
        <p>You requested a password reset. Please click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>The link will expire in 7 days.</p>
      `,
    };

    // Send the reset email
    await transporter.sendMail(mailOptions);

    sendResponse(reply, 200, {
      success: true,
      message: "Password reset link has been sent to your email",
    });
  } catch (error) {
    console.error("Error generating or sending reset token:", error);
    sendResponse(reply, 500, {
      success: false,
      message: "Error generating or sending reset token",
      error,
    });
  }
};

export const resetPassword = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { resetToken, newPassword } = request.body as {
    resetToken: string;
    newPassword: string;
  };

  try {
    const decoded = jwt.verify(resetToken, JWT_SECRET) as { id: number };

    // Hash the password before saving it
    // const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    const hashedPassword = newPassword; // Use plain text for now (replace with bcrypt in the future)

    await prisma.employee.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    sendResponse(reply, 500, {
      success: false,
      message: "Error resetting password",
      error,
    });
  }
};

export const updateProfile = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id, fullName, phoneNumber, homeAddress } = request.body as {
    id: number;
    fullName?: string;
    phoneNumber?: string;
    homeAddress?: string;
  };

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: { fullName, phoneNumber, homeAddress },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Profile updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating profile",
      error,
    });
  }
};
