
export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  price: number;
  stock: number;
  expiryDate: string;
  unit: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream';
  description?: string;
  image?: string;
}

export interface CreditEntry {
  id: string;
  date: string;
  amount: number;
  description: string;
  type: 'debt' | 'payment';
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  points: number;
  lifetimeSpend: number;
  joinDate: string;
  totalDebt: number;
  creditHistory: CreditEntry[];
}

export interface SaleItem {
  medicineId: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

export interface SaleRecord {
  id: string;
  date: string;
  items: SaleItem[];
  totalAmount: number;
  discountAmount?: number;
  customerId?: string;
  pointsEarned?: number;
  pointsRedeemed?: number;
  status: 'completed' | 'returned';
  returnDate?: string;
}

export interface MedicineRequest {
  id: string;
  customerName: string;
  phone: string;
  medicineName: string;
  message: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface ServiceRecord {
  id: string;
  date: string;
  type: 'Recharge' | 'bKash' | 'Nagad';
  amount: number;
  commission: number;
  description: string;
}

export interface Expense {
  id: string;
  date: string;
  category: 'Rent' | 'Electricity' | 'Salary' | 'Transport' | 'Others';
  amount: number;
  description: string;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  address: string;
  contactPerson: string;
  email?: string;
  paymentTerms?: string;
}

export interface PurchaseRecord {
  id: string;
  date: string;
  medicineId: string;
  medicineName: string;
  supplierId: string;
  quantity: number;
  costPrice: number;
  dueDate: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  phone: string;
  joinDate: string;
}

export interface PharmacySettings {
  name: string;
  location: string;
  phone: string;
  tagline: string;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  SALES = 'sales',
  INVENTORY = 'inventory',
  CUSTOMERS = 'customers',
  LEDGER = 'ledger',
  AI_ADVISOR = 'ai_advisor',
  SERVICES = 'services',
  REQUESTS = 'requests',
  REPORTS = 'reports',
  EXPENSES = 'expenses',
  PURCHASES = 'purchases',
  SUPPLIERS = 'suppliers',
  HISTORY = 'history',
  SETTINGS = 'settings',
  MORE = 'more',
  STAFF = 'staff',
  RETURNS = 'returns'
}

export type Language = 'en' | 'bn';
