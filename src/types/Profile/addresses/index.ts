// AddressCardProps
export interface AddressCardProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
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
  province: string;
  city: string;
  address: string;
}

// API Request/Response type
export interface AddressResponse {
  data: {
    addresses: Address[];
  };
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

// Props

export interface FormContentAddressProps {
  onSubmit: (data: AddressFormData) => void;
  editingId?: string | null;
  provinces: Province[];
  filteredCities: any[];
  formData: AddressFormData;
  onFormDataChange: (data: AddressFormData) => void;
  onCancel: () => void;
}
