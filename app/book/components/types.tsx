export interface Service {
  id: string;
  name: string;
  icon: any;
  description: string;
  basePrice: number;
  isHourly?: boolean;
}

export interface BedroomOption {
  value: string;
  label: string;
  priceMultiplier: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

export interface BookingStepProps {
  step: number;
  setStep: (step: number) => void;
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
  bedrooms: string;
  setBedrooms: (bedrooms: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  timeSlot: string;
  setTimeSlot: (timeSlot: string) => void;
  selectedAddOns: string[];
  setSelectedAddOns: (
    addOns: string[] | ((prev: string[]) => string[])
  ) => void;
  hours: number;
  setHours: (hours: number | ((prev: number) => number)) => void;
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  services: Service[];
  bedroomOptions: BedroomOption[];
  addOns: AddOn[];
  selectedServiceData: Service | undefined;
  selectedBedroomData: BedroomOption | undefined;
  calculatePrice: () => number;
  toggleAddOn: (addOnId: string) => void;
  canProceedStep1: boolean;
  canProceedStep2: boolean;
  canProceedStep3: boolean;
}
