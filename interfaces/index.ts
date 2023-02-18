export interface ApiError {
  message: string;
  error?: any;
}

export interface HotelsResponse {
  hotels: {
    hotels: Hotel[];
    checkIn: string;
    total: null;
    checkOut: string;
  };
}

export interface Hotel {
  code: number;
  name: string;
  categoryCode: string;
  categoryName: string;
  destinationCode: string;
  destinationName: string;
  zoneCode: number;
  zoneName: string;
  latitude: string;
  longitude: string;
  rooms?: RoomsEntity[] | null;
  minRate: string;
  maxRate: string;
  currency: string;
}
export interface RoomsEntity {
  code: string;
  name: string;
  rates?: RatesEntity[] | null;
}
export interface RatesEntity {
  rateKey: string;
  rateClass: string;
  rateType: string;
  net: string;
  allotment: number;
  paymentType: string;
  packaging: boolean;
  boardCode: string;
  boardName: string;
  cancellationPolicies?: CancellationPoliciesEntity[] | null;
  taxes: Taxes;
  rooms: number;
  adults: number;
  children: number;
  offers?: OffersEntity[] | null;
}
export interface CancellationPoliciesEntity {
  amount: string;
  from: string;
}
export interface Taxes {
  taxes?: TaxesEntity[] | null;
  allIncluded: boolean;
}
export interface TaxesEntity {
  included: boolean;
  amount: string;
  currency: string;
  clientAmount: string;
  clientCurrency: string;
}
export interface OffersEntity {
  code: string;
  name: string;
  amount: string;
}
