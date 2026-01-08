import { apiFetch } from './api';

export interface Fee {
  id: string;
  studentName: string;
  studentId: string;
  amount: number;
  amountPaid: number;
  type: 'tuition' | 'exam' | 'activity' | 'other';
  status: 'pending' | 'paid' | 'overdue' | 'partially_paid';
  dueDate: string;
  paidDate?: string;
  notes?: string;
  createdAt: string;
}

export interface CreateFeeData {
  studentName: string;
  studentId: string;
  amount: number;
  type?: 'tuition' | 'exam' | 'activity' | 'other';
  dueDate: string;
  notes?: string;
}

export interface UpdateFeeData {
  amountPaid?: number;
  status?: 'pending' | 'paid' | 'overdue' | 'partially_paid';
  notes?: string;
}

export interface FeeStats {
  totalPaid: number;
  totalUnpaid: number;
  totalStudentsPaid: number;
  totalStudentsUnpaid: number;
}

export const feesApi = {
  // Get all fees
  async getAllFees(): Promise<Fee[]> {
    return apiFetch('/financial/fees');
  },

  // Get fee by ID
  async getFeeById(id: string): Promise<Fee> {
    return apiFetch(`/financial/fees/${id}`);
  },

  // Create new fee
  async createFee(data: CreateFeeData): Promise<Fee> {
    return apiFetch('/financial/fees', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update fee
  async updateFee(id: string, data: UpdateFeeData): Promise<Fee> {
    return apiFetch(`/financial/fees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete fee
  async deleteFee(id: string): Promise<{ message: string }> {
    return apiFetch(`/financial/fees/${id}`, {
      method: 'DELETE',
    });
  },

  // Calculate fee statistics
  async getFeeStats(): Promise<FeeStats> {
    const fees = await this.getAllFees();
    
    const totalPaid = fees
      .filter(fee => fee.status === 'paid')
      .reduce((sum, fee) => sum + fee.amountPaid, 0);
    
    const totalUnpaid = fees
      .filter(fee => fee.status !== 'paid')
      .reduce((sum, fee) => sum + (fee.amount - fee.amountPaid), 0);
    
    const totalStudentsPaid = fees.filter(fee => fee.status === 'paid').length;
    const totalStudentsUnpaid = fees.filter(fee => fee.status !== 'paid').length;

    return {
      totalPaid,
      totalUnpaid,
      totalStudentsPaid,
      totalStudentsUnpaid,
    };
  },
};