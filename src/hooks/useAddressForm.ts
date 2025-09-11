import { useState, useEffect } from "react";
import { AddressFormData, Province, City } from "@/types/Profile";

interface UseAddressFormProps {
  provincesData: Province[] | undefined;
  citiesData: City[] | undefined;
}

export const useAddressForm = ({
  provincesData,
  citiesData,
}: UseAddressFormProps) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [formData, setFormData] = useState<AddressFormData>({
    province: "",
    city: "",
    address: "",
  });

  // Update provinces and cities when data changes
  useEffect(() => {
    if (provincesData) {
      setProvinces(provincesData);
    }
    if (citiesData) {
      setCities(citiesData);
    }
  }, [provincesData, citiesData]);

  // Filter cities based on selected province
  useEffect(() => {
    if (formData?.province) {
      const matchedProvince = provinces?.find(
        (p) => p?.name === formData?.province
      );
      if (matchedProvince) {
        const result = cities?.filter(
          (city) => city.province_id === matchedProvince.id
        );
        setFilteredCities(result || []);
      }
    } else {
      setFilteredCities([]);
    }
  }, [formData?.province, provinces, cities]);

  const updateFormData = (data: Partial<AddressFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData({
      province: "",
      city: "",
      address: "",
    });
  };

  return {
    provinces,
    cities,
    filteredCities,
    formData,
    updateFormData,
    resetFormData,
  };
};
