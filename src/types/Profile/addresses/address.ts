// AddressCardProps
export interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

// AddressFormProps
export interface AddressFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AddressFormData) => void;
  editingId: string | null;
  provinces: Province[];
  filteredCities: City[];
  formData: AddressFormData;
  onFormDataChange: (data: AddressFormData) => void;
}
// Address related types
export interface Address {
  id: string;
  province: string;
  city: string;
  address: string;
  created_at: string;
}

export interface AddressFormData {
  title: string;
  province: string;
  city: string;
}

// API Request/Response types (from services/address.ts)
export interface AddressResponse {
  data: any[];
  statusCode: number;
}

export interface AddressRequest {
  province: string;
  city: string;
  address: string;
}

export interface DeleteAddressRequest {
  id: string;
}

export interface UpdateAddressRequest {
  id: string;
  province: string;
  city: string;
  address: string;
}

// Location types
export interface Province {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  province_id: number;
}

// API Response types for location data
export interface ProvincesResponse {
  data: Province[];
}

export interface CitiesResponse {
  data: City[];
}
