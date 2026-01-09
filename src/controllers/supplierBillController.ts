import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helpers";

const prisma = new PrismaClient();

// Create SupplierBill
export const createSupplierBill = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { billNumber, supplierId, billDate, dueDate, totalAmount, notes } =
    request.body as {
      billNumber: string;
      supplierId: number;
      billDate?: string;
      dueDate: string;
      totalAmount: number;
      notes?: string;
    };

  try {
    const newSupplierBill = await prisma.supplierBill.create({
      data: {
        billNumber,
        supplierId,
        billDate: billDate ? new Date(billDate) : new Date(),
        dueDate: new Date(dueDate),
        totalAmount,
        notes,
      },
      include: {
        supplier: true,
        payments: true,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Supplier bill created successfully",
      data: newSupplierBill,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating supplier bill",
      error,
    });
  }
};

// Get All SupplierBills
export const getAllSupplierBills = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { status, supplierId } = request.query as {
    status?: string;
    supplierId?: string;
  };

  try {
    const where: any = {};
    if (status) where.status = status;
    if (supplierId) where.supplierId = Number(supplierId);

    const supplierBills = await prisma.supplierBill.findMany({
      where,
      include: {
        supplier: true,
        payments: true,
      },
      orderBy: {
        billDate: "desc",
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Supplier bills retrieved successfully",
      data: supplierBills,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving supplier bills",
      error,
    });
  }
};

// Get SupplierBill by ID
export const getSupplierBillById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const supplierBill = await prisma.supplierBill.findUnique({
      where: { id: Number(id) },
      include: {
        supplier: true,
        payments: {
          orderBy: {
            paymentDate: "desc",
          },
        },
      },
    });

    if (!supplierBill) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Supplier bill not found",
      });
    }

    sendResponse(reply, 200, {
      success: true,
      message: "Supplier bill retrieved successfully",
      data: supplierBill,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error retrieving supplier bill",
      error,
    });
  }
};

// Create Payment for SupplierBill
export const createBillPayment = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { supplierBillId, amount, paymentMethod, notes, paymentDate } =
    request.body as {
      supplierBillId: number;
      amount: number;
      paymentMethod?: string;
      notes?: string;
      paymentDate?: string;
    };

  try {
    // Get current bill
    const bill = await prisma.supplierBill.findUnique({
      where: { id: supplierBillId },
    });

    if (!bill) {
      return sendResponse(reply, 404, {
        success: false,
        message: "Supplier bill not found",
      });
    }

    // Create payment
    const payment = await prisma.supplierBillPayment.create({
      data: {
        supplierBillId,
        amount,
        paymentMethod,
        notes,
        paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
      },
    });

    // Update bill paid amount and status
    const newPaidAmount = bill.paidAmount + amount;
    let newStatus = "unpaid";
    if (newPaidAmount >= bill.totalAmount) {
      newStatus = "paid";
    } else if (newPaidAmount > 0) {
      newStatus = "partial";
    }

    await prisma.supplierBill.update({
      where: { id: supplierBillId },
      data: {
        paidAmount: newPaidAmount,
        status: newStatus,
      },
    });

    sendResponse(reply, 201, {
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error creating payment",
      error,
    });
  }
};

// Update SupplierBill
export const updateSupplierBill = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { dueDate, notes, status } = request.body as {
    dueDate?: string;
    notes?: string;
    status?: string;
  };

  try {
    const data: any = {};
    if (dueDate !== undefined) data.dueDate = new Date(dueDate);
    if (notes !== undefined) data.notes = notes;
    if (status !== undefined) data.status = status;

    const updatedSupplierBill = await prisma.supplierBill.update({
      where: { id: Number(id) },
      data,
      include: {
        supplier: true,
        payments: true,
      },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Supplier bill updated successfully",
      data: updatedSupplierBill,
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error updating supplier bill",
      error,
    });
  }
};

// Delete SupplierBill
export const deleteSupplierBill = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.supplierBill.delete({
      where: { id: Number(id) },
    });

    sendResponse(reply, 200, {
      success: true,
      message: "Supplier bill deleted successfully",
    });
  } catch (error) {
    sendResponse(reply, 500, {
      success: false,
      message: "Error deleting supplier bill",
      error,
    });
  }
};
