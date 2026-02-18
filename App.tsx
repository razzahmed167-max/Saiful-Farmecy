
import React, { useState, useEffect } from 'react';
import { Medicine, SaleRecord, SaleItem, AppTab, Customer, CreditEntry, MedicineRequest, ServiceRecord, Expense, Supplier, PurchaseRecord, Staff, Language, PharmacySettings } from './types';
import { INITIAL_MEDICINES, PHARMACY_INFO, INITIAL_CUSTOMERS, LOYALTY_RULES } from './constants';
import Dashboard from './components/Dashboard';
import SalesPOS from './components/SalesPOS';
import InventoryManager from './components/InventoryManager';
import AIAdvisor from './components/AIAdvisor';
import CustomerLoyalty from './components/CustomerLoyalty';
import CreditLedger from './components/CreditLedger';
import VoiceAssistant from './components/VoiceAssistant';
import LandingPage from './components/LandingPage';
import ServicesManager from './components/ServicesManager';
import MedicineRequests from './components/MedicineRequests';
import ExpenseManager from './components/ExpenseManager';
import FinancialReports from './components/FinancialReports';
import MoreMenu from './components/MoreMenu';
import PurchaseManager from './components/PurchaseManager';
import SupplierManager from './components/SupplierManager';
import TransactionHistory from './components/TransactionHistory';
import Settings from './components/Settings';
import StaffManager from './components/StaffManager';
import ReturnsManager from './components/ReturnsManager';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('bn');
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  
  const [settings, setSettings] = useState<PharmacySettings>(() => {
    const saved = localStorage.getItem('sp_settings');
    return saved ? JSON.parse(saved) : {
      name: PHARMACY_INFO.name,
      location: PHARMACY_INFO.location,
      phone: PHARMACY_INFO.contact,
      tagline: PHARMACY_INFO.tagline
    };
  });

  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem('sp_inventory');
    return saved ? JSON.parse(saved) : INITIAL_MEDICINES;
  });
  
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('sp_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });
  
  const [sales, setSales] = useState<SaleRecord[]>(() => {
    const saved = localStorage.getItem('sp_sales');
    return saved ? JSON.parse(saved) : [];
  });

  const [requests, setRequests] = useState<MedicineRequest[]>(() => {
    const saved = localStorage.getItem('sp_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>(() => {
    const saved = localStorage.getItem('sp_services');
    return saved ? JSON.parse(saved) : [];
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('sp_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem('sp_suppliers');
    return saved ? JSON.parse(saved) : [];
  });

  const [purchases, setPurchases] = useState<PurchaseRecord[]>(() => {
    const saved = localStorage.getItem('sp_purchases');
    return saved ? JSON.parse(saved) : [];
  });

  const [staff, setStaff] = useState<Staff[]>(() => {
    const saved = localStorage.getItem('sp_staff');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Hide splash after 3 seconds for better experience with enhanced animations
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('sp_settings', JSON.stringify(settings));
    localStorage.setItem('sp_inventory', JSON.stringify(medicines));
    localStorage.setItem('sp_customers', JSON.stringify(customers));
    localStorage.setItem('sp_sales', JSON.stringify(sales));
    localStorage.setItem('sp_requests', JSON.stringify(requests));
    localStorage.setItem('sp_services', JSON.stringify(serviceRecords));
    localStorage.setItem('sp_expenses', JSON.stringify(expenses));
    localStorage.setItem('sp_suppliers', JSON.stringify(suppliers));
    localStorage.setItem('sp_purchases', JSON.stringify(purchases));
    localStorage.setItem('sp_staff', JSON.stringify(staff));
  }, [settings, medicines, customers, sales, requests, serviceRecords, expenses, suppliers, purchases, staff]);

  const handleCompleteSale = (items: SaleItem[], customerId?: string, pointsRedeemed?: number, manualDiscountPercent: number = 0) => {
    const totalBeforePoints = items.reduce((acc, curr) => acc + curr.total, 0);
    const pointsDiscount = pointsRedeemed ? pointsRedeemed / 10 : 0;
    const afterPoints = totalBeforePoints - pointsDiscount;
    const manualDiscountValue = (afterPoints * manualDiscountPercent) / 100;
    const finalAmount = afterPoints - manualDiscountValue;
    const totalDiscount = pointsDiscount + manualDiscountValue;
    const pointsEarned = Math.floor(finalAmount * LOYALTY_RULES.POINTS_PER_TK);

    const newSale: SaleRecord = {
      id: 'S' + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      items,
      totalAmount: finalAmount,
      discountAmount: totalDiscount,
      customerId,
      pointsEarned,
      pointsRedeemed,
      status: 'completed'
    };

    const updatedMedicines = medicines.map(med => {
      const soldItem = items.find(item => item.medicineId === med.id);
      if (soldItem) return { ...med, stock: Math.max(0, med.stock - soldItem.quantity) };
      return med;
    });

    setSales(prev => [...prev, newSale]);
    setMedicines(updatedMedicines);

    if (customerId) {
      setCustomers(prev => prev.map(c => {
        if (c.id === customerId) {
          return {
            ...c,
            points: c.points - (pointsRedeemed || 0) + pointsEarned,
            lifetimeSpend: c.lifetimeSpend + finalAmount
          };
        }
        return c;
      }));
    }
  };

  const handleReturnSale = (saleId: string) => {
    const sale = sales.find(s => s.id === saleId);
    if (!sale || sale.status === 'returned') return;

    setSales(prev => prev.map(s => s.id === saleId ? { ...s, status: 'returned', returnDate: new Date().toISOString() } : s));
    setMedicines(prev => prev.map(med => {
      const soldItem = sale.items.find(item => item.medicineId === med.id);
      if (soldItem) return { ...med, stock: med.stock + soldItem.quantity };
      return med;
    }));

    if (sale.customerId) {
      setCustomers(prev => prev.map(c => {
        if (c.id === sale.customerId) {
          return {
            ...c,
            points: Math.max(0, c.points - (sale.pointsEarned || 0) + (sale.pointsRedeemed || 0)),
            lifetimeSpend: Math.max(0, c.lifetimeSpend - sale.totalAmount)
          };
        }
        return c;
      }));
    }
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 mesh-bg flex flex-col items-center justify-center z-[1000] overflow-hidden">
        {/* Ambient Pulse Ring */}
        <div className="absolute w-64 h-64 rounded-full border-4 border-white/10 animate-pulse-ring"></div>
        <div className="absolute w-64 h-64 rounded-full border-2 border-white/5 animate-pulse-ring [animation-delay:0.8s]"></div>
        
        {/* Core Logo Container */}
        <div className="relative animate-logo-reveal">
           <div className="w-36 h-36 logo-glass rounded-[2.5rem] flex items-center justify-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] animate-float">
             {/* Shimmer Effect */}
             <div className="shimmer-bar animate-shimmer"></div>
             
             {/* Negative Space Plus Cross (Subtle) */}
             <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-4 bg-emerald-600 rounded-full"></div>
                <div className="w-4 h-20 bg-emerald-600 rounded-full absolute"></div>
             </div>

             <span className="text-emerald-600 text-7xl font-black relative z-20 drop-shadow-sm">S</span>
           </div>
        </div>

        <div className="text-center mt-12 relative z-20">
          <h1 className="text-white text-4xl font-black tracking-[-0.05em] mb-2 drop-shadow-lg">
             Saiful <span className="opacity-70 font-light">Pharmacy</span>
          </h1>
          <p className="text-emerald-200 text-[10px] font-black uppercase animate-tracking">
            {settings.tagline}
          </p>
        </div>

        {/* Dynamic Loading Indicator */}
        <div className="absolute bottom-16 flex flex-col items-center">
           <div className="flex gap-2">
             <div className="w-2 h-2 bg-white/20 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
             <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
             <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
           </div>
           <span className="text-white/30 text-[8px] font-black uppercase tracking-[0.6em] mt-4">Initializing Systems</span>
        </div>
      </div>
    );
  }

  const renderAdminContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD: return <Dashboard medicines={medicines} sales={sales} serviceRecords={serviceRecords} />;
      case AppTab.SALES: return <SalesPOS medicines={medicines} customers={customers} onCompleteSale={handleCompleteSale} />;
      case AppTab.INVENTORY: return <InventoryManager medicines={medicines} onAddMedicine={(m) => setMedicines([...medicines, {...m, id: 'M'+Date.now()}])} onUpdateMedicine={(id, u) => setMedicines(medicines.map(m => m.id === id ? {...m, ...u} : m))} />;
      case AppTab.CUSTOMERS: return <CustomerLoyalty customers={customers} onAddCustomer={(c) => setCustomers([...customers, {...c, id: 'c'+Date.now(), points: 0, lifetimeSpend: 0, joinDate: new Date().toISOString().split('T')[0], totalDebt: 0, creditHistory: []}])} onUpdateCustomer={(id, u) => setCustomers(customers.map(c => c.id === id ? {...c, ...u} : c))} />;
      case AppTab.LEDGER: return <CreditLedger customers={customers} onAddCredit={(cid, amt, d, t) => setCustomers(customers.map(c => {
        if (c.id === cid) {
          const entry: CreditEntry = { id: Date.now().toString(), date: new Date().toISOString().split('T')[0], amount: amt, description: d, type: t };
          const debtChange = t === 'debt' ? amt : -amt;
          return { ...c, totalDebt: Math.max(0, c.totalDebt + debtChange), creditHistory: [...c.creditHistory, entry] };
        }
        return c;
      }))} />;
      case AppTab.SERVICES: return <ServicesManager records={serviceRecords} onAddRecord={(r) => setServiceRecords([...serviceRecords, { ...r, id: 'SR'+Date.now(), date: new Date().toISOString() }])} />;
      case AppTab.REQUESTS: return <MedicineRequests requests={requests} onUpdateStatus={(id, status) => setRequests(requests.map(r => r.id === id ? {...r, status} : r))} />;
      case AppTab.AI_ADVISOR: return <AIAdvisor medicines={medicines} sales={sales} expenses={expenses} services={serviceRecords} purchases={purchases} onUpdateMedicine={(id, u) => setMedicines(medicines.map(m => m.id === id ? {...m, ...u} : m))} />;
      case AppTab.EXPENSES: return <ExpenseManager expenses={expenses} onAddExpense={(ex) => setExpenses([...expenses, { ...ex, id: 'EX'+Date.now(), date: new Date().toISOString() }])} />;
      // Fix: Added missing medicines and purchases props to FinancialReports
      case AppTab.REPORTS: return <FinancialReports sales={sales} expenses={expenses} serviceRecords={serviceRecords} medicines={medicines} purchases={purchases} />;
      case AppTab.PURCHASES: return <PurchaseManager medicines={medicines} suppliers={suppliers} onAddPurchase={(pur) => {
        const newPur = { ...pur, id: 'PUR'+Date.now(), date: new Date().toISOString() };
        setPurchases([...purchases, newPur]);
        setMedicines(medicines.map(m => m.id === pur.medicineId ? { ...m, stock: m.stock + pur.quantity } : m));
      }} purchases={purchases} />;
      case AppTab.SUPPLIERS: return <SupplierManager suppliers={suppliers} onAddSupplier={(s) => setSuppliers([...suppliers, { ...s, id: 'S'+Date.now() }])} onDeleteSupplier={(id) => setSuppliers(suppliers.filter(s => s.id !== id))} />;
      case AppTab.HISTORY: return <TransactionHistory sales={sales} onReturnSale={handleReturnSale} />;
      case AppTab.STAFF: return <StaffManager staff={staff} onAddStaff={(s) => setStaff([...staff, { ...s, id: 'ST'+Date.now(), joinDate: new Date().toISOString() }])} onRemoveStaff={(id) => setStaff(staff.filter(st => st.id !== id))} />;
      case AppTab.RETURNS: return <ReturnsManager sales={sales} />;
      case AppTab.SETTINGS: return <Settings language={language} onLanguageToggle={() => setLanguage(language === 'en' ? 'bn' : 'en')} settings={settings} onUpdateSettings={setSettings} />;
      case AppTab.MORE: return <MoreMenu onSelectTab={setActiveTab} />;
      default: return <Dashboard medicines={medicines} sales={sales} serviceRecords={serviceRecords} />;
    }
  };

  if (!isAdmin) {
    return <LandingPage medicines={medicines} settings={settings} onAdminLogin={() => setIsAdmin(true)} language={language} onLanguageToggle={() => setLanguage(language === 'en' ? 'bn' : 'en')} onSubmitRequest={(r) => setRequests([{ ...r, id: 'R'+Date.now(), date: new Date().toISOString(), status: 'pending' }, ...requests])} />;
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 shadow-2xl overflow-hidden relative border-x border-gray-100">
      <div className="px-4 pt-4 pb-2 bg-white flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div onClick={() => setActiveTab(AppTab.MORE)} className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100 cursor-pointer overflow-hidden relative">
             <div className="shimmer-bar animate-shimmer opacity-30"></div>
             <span className="text-white text-xl font-black relative z-10">S</span>
          </div>
          <div>
            <p className="text-sm font-black text-gray-900 leading-none">{settings.name}</p>
            <p className="text-[10px] text-gray-400 font-medium tracking-tight mt-1">{settings.location}</p>
          </div>
        </div>
        <button onClick={() => setIsAdmin(false)} className="text-[10px] font-black uppercase text-red-500 tracking-widest px-3 py-1 bg-red-50 rounded-lg">Logout</button>
      </div>

      <main className="flex-1 overflow-y-auto bg-gray-50 no-scrollbar">
        {renderAdminContent()}
      </main>

      <nav className="h-16 bg-white border-t border-gray-100 flex items-center justify-around px-2 sticky bottom-0 z-50">
        <NavBtn active={activeTab === AppTab.DASHBOARD} onClick={() => setActiveTab(AppTab.DASHBOARD)} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} label="Home" />
        <NavBtn active={activeTab === AppTab.SALES} onClick={() => setActiveTab(AppTab.SALES)} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>} label="POS" />
        <NavBtn active={activeTab === AppTab.INVENTORY} onClick={() => setActiveTab(AppTab.INVENTORY)} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>} label="Stock" />
        <NavBtn active={activeTab === AppTab.AI_ADVISOR} onClick={() => setActiveTab(AppTab.AI_ADVISOR)} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} label="AI" />
        <NavBtn active={activeTab === AppTab.MORE} onClick={() => setActiveTab(AppTab.MORE)} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>} label="Menu" />
      </nav>
    </div>
  );
};

const NavBtn = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center space-y-1 w-10 ${active ? 'text-emerald-600 scale-105' : 'text-gray-300'}`}>
    {icon}
    <span className="text-[7px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
