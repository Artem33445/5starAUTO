export type Language = 'uk' | 'pl';

export interface ServiceItem {
  id: string;
  nameUk: string;
  namePl: string;
  descUk: string;
  descPl: string;
  category: 'maintenance' | 'diagnostics' | 'chassis' | 'ac' | 'tires' | 'multimedia' | 'towing';
  basePricePln: number;
  isFreeWithRepair?: boolean;
  durationApprox: string;
  iconName: string;
}

export interface BookingFormData {
  selectedServices: string[];
  vehicleModel: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  notes: string;
}
