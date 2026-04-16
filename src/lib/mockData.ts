export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  condition: 'NEW' | 'USED';
  images: string[];
  description: string;
}

export interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  carInterest: string;
  status: 'NEW' | 'CONTACTED' | 'NEGOTIATION' | 'CLOSED';
  source?: string;
  assignedTo?: string;
  date?: string;
}

export interface Deal {
  id: string;
  customerName: string;
  customer?: string;
  vehicleId?: string;
  vehicleName: string;
  vehicle?: string;
  amount: number;
  status: 'PROSPECT' | 'QUOTATION' | 'FINANCING' | 'CLOSED' | 'NEGOTIATION';
  probability?: number;
  date?: string;
}

export interface TestDrive {
  id: string;
  customerName: string;
  vehicleName: string;
  date: string;
  time: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

export interface ServiceJob {
  id: string;
  vehicleName: string;
  customerName: string;
  type: string;
  status: 'WAITING' | 'IN_PROGRESS' | 'DONE';
  technician: string;
}

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  stock: number;
  alertLevel: number;
  price: number;
}

// 20 Luxury Vehicles Demo Data
export const mockInventory: Vehicle[] = [
  { id: '1', make: 'Tesla', model: 'Model S Plaid', year: 2024, price: 89990, mileage: '0', fuelType: 'Electric', transmission: 'Automatic', status: 'AVAILABLE', condition: 'NEW', images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800'], description: 'The ultimate electric performance sedan.' },
  { id: '2', make: 'Porsche', model: '911 GT3 RS', year: 2023, price: 223800, mileage: '500', fuelType: 'Gasoline', transmission: 'PDK', status: 'AVAILABLE', condition: 'USED', images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'], description: 'Track-focused precision engineering.' },
  { id: '3', make: 'Rolls-Royce', model: 'Phantom', year: 2024, price: 460000, mileage: '10', fuelType: 'Gasoline', transmission: 'Automatic', status: 'RESERVED', condition: 'NEW', images: ['/rolls_royce_phantom_luxury.png'], description: 'The pinnacle of automotive luxury.' },
  { id: '4', make: 'Ferrari', model: 'SF90 Stradale', year: 2024, price: 524000, mileage: '0', fuelType: 'Hybrid', transmission: 'DCT', status: 'AVAILABLE', condition: 'NEW', images: ['https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800'], description: '1000HP of Prancing Horse hybrid power.' },
  { id: '5', make: 'Bugatti', model: 'Chiron Super Sport', year: 2023, price: 3800000, mileage: '120', fuelType: 'Gasoline', transmission: 'DSG', status: 'AVAILABLE', condition: 'USED', images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800'], description: 'The king of speed. W16 masterpiece.' },
  { id: '6', make: 'Lamborghini', model: 'Revuelto', year: 2024, price: 608000, mileage: '0', fuelType: 'Hybrid', transmission: 'DCT', status: 'AVAILABLE', condition: 'NEW', images: ['https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800'], description: 'V12 hybrid high performance electrified vehicle.' },
  { id: '7', make: 'Bentley', model: 'Continental GT Mulliner', year: 2024, price: 320000, mileage: '40', fuelType: 'Gasoline', transmission: 'Automatic', status: 'AVAILABLE', condition: 'NEW', images: ['/bentley_continental_mulliner.png'], description: 'The grand tourer of choice.' },
  { id: '8', make: 'Aston Martin', model: 'DBS Volante', year: 2023, price: 397000, mileage: '1200', fuelType: 'Gasoline', transmission: 'Automatic', status: 'AVAILABLE', condition: 'USED', images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'], description: 'Elegance with a twin-turbo V12 roar.' },
  { id: '9', make: 'Mercedes-Maybach', model: 'S680', year: 2024, price: 229000, mileage: '0', fuelType: 'Gasoline', transmission: 'Automatic', status: 'SOLD', condition: 'NEW', images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'], description: 'Defining the standard of rear-seat comfort.' },
  { id: '10', make: 'McLaren', model: '750S Spider', year: 2024, price: 345000, mileage: '0', fuelType: 'Gasoline', transmission: 'SSG', status: 'AVAILABLE', condition: 'NEW', images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800'], description: 'Lighter. More powerful. Pure exhilaration.' },
  { id: '11', make: 'Range Rover', model: 'SV Autobiography', year: 2024, price: 218000, mileage: '100', fuelType: 'Gasoline', transmission: 'Automatic', status: 'AVAILABLE', condition: 'NEW', images: ['/range_rover_sv_autobiography.png'], description: 'Go anywhere in absolute refinement.' },
  { id: '12', make: 'Lucid', model: 'Air Sapphire', year: 2024, price: 249000, mileage: '0', fuelType: 'Electric', transmission: 'Single-speed', status: 'AVAILABLE', condition: 'NEW', images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800'], description: 'The world\'s most powerful electric sedan.' },
  { id: '13', make: 'Ferrari', model: 'Purosangue', year: 2024, price: 398000, mileage: '20', fuelType: 'Gasoline', transmission: 'DCT', status: 'RESERVED', condition: 'NEW', images: ['https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800'], description: 'Ferrari\'s first four-door, four-seater V12.' },
  { id: '14', make: 'Porsche', model: 'Taycan Turbo GT', year: 2024, price: 230000, mileage: '0', fuelType: 'Electric', transmission: 'Automatic', status: 'AVAILABLE', condition: 'NEW', images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800'], description: 'The fastest electric sedan from Stuttgart.' },
  { id: '15', make: 'Rimac', model: 'Nevera', year: 2023, price: 2400000, mileage: '300', fuelType: 'Electric', transmission: 'Direct Drive', status: 'AVAILABLE', condition: 'USED', images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800'], description: '1,914HP hyper-electric beast.' },
  { id: '16', make: 'Koenigsegg', model: 'Jesko Absolut', year: 2024, price: 3000000, mileage: '0', fuelType: 'Gasoline', transmission: 'LST', status: 'AVAILABLE', condition: 'NEW', images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800'], description: 'Designed to break the 300MPH barrier.' },
  { id: '17', make: 'Maserati', model: 'MC20 Cielo', year: 2024, price: 275000, mileage: '50', fuelType: 'Gasoline', transmission: 'DCT', status: 'AVAILABLE', condition: 'NEW', images: ['https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800'], description: 'Open-top Italian passion with a twin-turbo V6.' },
  { id: '18', make: 'Audi', model: 'RS e-tron GT', year: 2024, price: 147000, mileage: '0', fuelType: 'Electric', transmission: 'Automatic', status: 'AVAILABLE', condition: 'NEW', images: ['https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=800'], description: 'Sleek, futuristic, and fast.' },
  { id: '19', make: 'BMW', model: 'i7 M70', year: 2024, price: 168000, mileage: '10', fuelType: 'Electric', transmission: 'Automatic', status: 'AVAILABLE', condition: 'NEW', images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800'], description: 'Luxury meets zero-emission performance.' },
  { id: '20', make: 'Lexus', model: 'LFA Nurburgring', year: 2012, price: 1200000, mileage: '4500', fuelType: 'Gasoline', transmission: 'Sequential', status: 'AVAILABLE', condition: 'USED', images: ['https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800'], description: 'The greatest sounding engine ever produced.' },
];

export const mockStats = [
  { label: 'Total Inventory', value: '142 Vehicles', trend: '+12%', color: 'blue' },
  { label: 'Monthly Revenue', value: '$2.4M', trend: '+18%', color: 'green' },
  { label: 'Active Leads', value: '48 Leads', trend: '+5%', color: 'amber' },
  { label: 'Deliveries', value: '18 Sold', trend: '-2%', color: 'purple' },
];

export const mockSalesData = [
  { name: 'Jan', revenue: 1800000 },
  { name: 'Feb', revenue: 2100000 },
  { name: 'Mar', revenue: 1950000 },
  { name: 'Apr', revenue: 2400000 },
  { name: 'May', revenue: 2200000 },
  { name: 'Jun', revenue: 2600000 },
];

export const mockLeads: Lead[] = [
  { id: 'L1', customerName: 'Raymend', email: 'ray@nexova.com', phone: '+1 555-0100', carInterest: 'Tesla Model S', status: 'NEW', source: 'Website Inquiry', assignedTo: 'John Doe', date: '2 days ago' },
  { id: 'L2', customerName: 'Sarah Smith', email: 'sarah@me.com', phone: '+1 555-0101', carInterest: 'Porsche 911', status: 'CONTACTED', source: 'Showroom Visit', assignedTo: 'Jane Wilson', date: '3 days ago' },
];

export const mockDeals: Deal[] = [
  { id: 'D1', customerName: 'Max Power', customer: 'Max Power', vehicleId: '2', vehicleName: 'Porsche 911 GT3 RS', vehicle: 'Porsche 911 GT3 RS', amount: 223800, status: 'FINANCING', probability: 85, date: 'Mar 15, 2026' },
  { id: 'D2', customerName: 'Elena Gilbert', customer: 'Elena Gilbert', vehicleId: '3', vehicleName: 'Rolls-Royce Phantom', vehicle: 'Rolls-Royce Phantom', amount: 460000, status: 'PROSPECT', probability: 40, date: 'Mar 18, 2026' },
];

export const mockTestDrives: TestDrive[] = [
  { id: 'T1', customerName: 'James Bond', vehicleName: 'Aston Martin DBS', date: '2026-04-08', time: '10:00 AM', status: 'SCHEDULED' },
];

export const mockServiceJobs: ServiceJob[] = [
  { id: 'S1', vehicleName: 'Tesla Model 3', customerName: 'Tom Holland', type: 'Battery Check', status: 'IN_PROGRESS', technician: 'Mike Rogers' },
];

export const mockParts: Part[] = [
  { id: 'P1', name: 'Brake Pads (Ceramic)', partNumber: 'BP-992-GT3', category: 'Braking', stock: 12, alertLevel: 15, price: 850 },
  { id: 'P2', name: 'Tires (Michelin Pilot Sport)', partNumber: 'TI-20-MPS4', category: 'Tires', stock: 45, alertLevel: 10, price: 420 },
];
