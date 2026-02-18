
import { Medicine, Customer } from './types';

export const INITIAL_MEDICINES: Medicine[] = [
  { id: '1', name: 'Napa Extend', genericName: 'Paracetamol', category: 'Fever', price: 15.00, stock: 500, expiryDate: '2025-12-01', unit: 'tablet', description: "Used for fever and pain; avoid taking on an empty stomach.", image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop' },
  { id: '2', name: 'Seclo 20', genericName: 'Omeprazole', category: 'Gastric', price: 7.00, stock: 300, expiryDate: '2026-05-15', unit: 'capsule', image: 'https://images.unsplash.com/photo-1550572017-ed20015ade0e?w=400&h=400&fit=crop' },
  { id: '3', name: 'Alatrol', genericName: 'Cetirizine', category: 'Allergy', price: 5.00, stock: 150, expiryDate: '2025-08-20', unit: 'tablet', image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&h=400&fit=crop' },
  { id: '4', name: 'Tofen 1mg', genericName: 'Ketotifen', category: 'Asthma', price: 12.00, stock: 50, expiryDate: '2024-11-10', unit: 'syrup', image: 'https://images.unsplash.com/photo-1471864190281-ad5f9f34244a?w=400&h=400&fit=crop' },
  { id: '5', name: 'Amodis 500', genericName: 'Metronidazole', category: 'Antiprotozoal', price: 8.50, stock: 200, expiryDate: '2026-01-10', unit: 'tablet', image: 'https://images.unsplash.com/photo-1626716493137-b67fe9501e76?w=400&h=400&fit=crop' },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Abdur Rahman', phone: '01711223344', points: 450, lifetimeSpend: 4500, joinDate: '2024-01-15', totalDebt: 0, creditHistory: [] },
  { id: 'c2', name: 'Fatima Begum', phone: '01855667788', points: 120, lifetimeSpend: 1200, joinDate: '2024-02-10', totalDebt: 0, creditHistory: [] },
  { id: 'c3', name: 'Saiful Islam', phone: '01999887766', points: 890, lifetimeSpend: 8900, joinDate: '2023-11-05', totalDebt: 0, creditHistory: [] },
];

export const PHARMACY_INFO = {
  name: "Saiful Pharmacy",
  location: "Club More, Atulia, Shyamnagar",
  contact: "+880 17XX-XXXXXX",
  tagline: "Your Health, Our Priority",
  taglineBn: "আপনার সুস্থতা, আমাদের অঙ্গীকার"
};

export const HEALTH_TIPS = [
  { title: "Hydration", titleBn: "শরীরে পানির ভারসাম্য", desc: "Drink 8-10 glasses of water.", descBn: "দিনে অন্তত ৮-১০ গ্লাস পানি পান করুন।" },
  { title: "Avoid Self-Medication", titleBn: "নিজে নিজে ঔষধ খাবেন না", desc: "Consult a doctor before antibiotics.", descBn: "অ্যান্টিবায়োটিক খাওয়ার আগে ডাক্তার দেখান।" },
  { title: "Storage", titleBn: "ঔষধ সংরক্ষণ", desc: "Keep medicines in a cool, dry place.", descBn: "ঔষধ ঠান্ডা ও শুষ্ক স্থানে রাখুন।" }
];

export const PROMO_OFFERS = [
  { id: 1, title: "10% Discount", titleBn: "১০% ডিসকাউন্ট", desc: "On all Baby Food items", descBn: "সকল বেবি ফুড আইটেমে ১০% ছাড়" },
  { id: 2, title: "Free Pressure Check", titleBn: "ফ্রি প্রেশার চেক", desc: "Available for elderly citizens", descBn: "বয়স্কদের জন্য প্রেশার চেক সম্পূর্ণ ফ্রি" },
  { id: 3, title: "Home Delivery", titleBn: "হোম ডেলিভারি", desc: "Free delivery within Atulia", descBn: "অতুলিয়ার মধ্যে ফ্রি হোম ডেলিভারি সেবা" }
];

export const TRUSTED_BRANDS = ["Square", "Incepta", "Beximco", "Renata", "ACME", "Bata", "Radiant", "SK+F"];

export const PHARMACY_STATS = [
  { label: "Happy Clients", value: "2K+", labelBn: "সন্তুষ্ট কাস্টমার" },
  { label: "Genuine Products", value: "100%", labelBn: "আসল পন্য" },
  { label: "Support", value: "24/7", labelBn: "সাপোর্ট" }
];

export const LOYALTY_RULES = {
  POINTS_PER_TK: 1,
  TK_PER_10_POINTS: 1,
};

export const TRANSLATIONS = {
  en: {
    heroTitle: "Premium Healthcare Services",
    heroSub: "The most trusted pharmacy and digital service hub in Shyamnagar.",
    services: "Explore Services",
    medicineSales: "Pharmacy",
    recharge: "Recharge",
    bkash: "bKash",
    nagad: "Nagad",
    emergencyExchange: "Balance Exchange",
    bkToNagad: "bKash to Nagad",
    nagadToBk: "Nagad to bKash",
    searchMed: "Find your medicine...",
    contactUs: "Contact Us",
    address: "Location",
    phone: "Hotline",
    requestMed: "Need something else?",
    submit: "Send Request",
    adminLogin: "Staff Login",
    featured: "Our Catalog",
    healthTips: "Wellness Hub",
    offers: "Hot Deals",
    brands: "Top Manufacturers",
    faqs: "Customer Support FAQ"
  },
  bn: {
    heroTitle: "সেরা স্বাস্থ্যসেবা এখন আপনার হাতের নাগালে",
    heroSub: "শ্যামনগর অতুলিয়ার সবচেয়ে বিশ্বস্ত ফার্মাসি এবং ডিজিটাল সার্ভিস পয়েন্ট।",
    services: "সেবাসমূহ",
    medicineSales: "ফার্মাসি",
    recharge: "ফ্লেক্সিলোড",
    bkash: "বিকাশ",
    nagad: "নগদ",
    emergencyExchange: "ব্যালেন্স এক্সচেঞ্জ",
    bkToNagad: "বিকাশ টু নগদ",
    nagadToBk: "নগদ টু বিকাশ",
    searchMed: "ঔষধ খুঁজুন...",
    contactUs: "যোগাযোগ",
    address: "ঠিকানা",
    phone: "হটলাইন",
    requestMed: "ঔষধ খুঁজে পাচ্ছেন না?",
    submit: "অনুরোধ পাঠান",
    adminLogin: "স্টাফ লগইন",
    featured: "ঔষধের তালিকা",
    healthTips: "স্বাস্থ্য কথা",
    offers: "সেরা অফারসমূহ",
    brands: "প্রস্তুতকারক কোম্পানি",
    faqs: "সাধারণ জিজ্ঞাসা"
  }
};
