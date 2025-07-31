"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useAddAddress,
  useDeleteAddress,
  useGetAddresses,
  useGetCities,
  useGetProvinces,
  useUpdateAddress,
} from "@/services/address";
import { AddressSkeleton } from "@/components/skeleton/Profile/address/AddressSkeleton";

// Import modular components
import {
  AddressCard,
  AddressForm,
  AddressHeader,
  EmptyState,
} from "@/components/profile/addresses";

// Import types and hooks
import { useAddressForm } from "@/hooks/useAddressForm";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Address, City, Province } from "@/types/Profile";
import { AddressFormData } from "@/schemas/profile/address/address";

export default function AddressesPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Data fetching
  const { data: addressesData, isLoading } = useGetAddresses();
  const { mutate: deleteAddress, isPending: isDeleting } = useDeleteAddress();
  const { mutate: updateAddress } = useUpdateAddress();
  const { mutate: addAddress } = useAddAddress();
  const { data: provincesData } = useGetProvinces();
  const { data: citiesData } = useGetCities();

  // Form management
  const { provinces, filteredCities, formData, updateFormData, resetFormData } =
    useAddressForm({
      provincesData: provincesData as Province[],
      citiesData: citiesData as City[],
    });

  // Form submission handler
  const handleSubmit = (data: AddressFormData) => {
    const id = editingId;

    if (id) {
      updateAddress({
        id,
        address: data.title,
        province: data.province,
        city: data.city,
      });
    } else {
      addAddress({
        address: data.title,
        province: data.province,
        city: data.city,
      });
    }

    resetFormData();
    setEditingId(null);
    setOpen(false);
  };

  // Edit address handler
  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    updateFormData({
      title: address.address,
      province: address.province,
      city: address.city,
    });
    setOpen(true);
  };

  // Delete address handler
  const handleDelete = (id: string) => {
    deleteAddress({ id });
  };

  // Add address handler
  const handleAddAddress = () => {
    setEditingId(null);
    resetFormData();
    setOpen(true);
  };

  if (isLoading) {
    return <AddressSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <AddressHeader />

      {/* Main Content */}
      <Card className="rounded-3xl shadow-md border border-muted bg-white/90 dark:bg-gray-900/90">
        <CardHeader className="flex justify-end">
          <Button
            size="sm"
            onClick={handleAddAddress}
            className="rounded-md px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold shadow-md transition-all gap-2"
          >
            <Plus size={20} className="text-gray-900" />
            افزودن آدرس
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 md:pb-8 pb-16">
            {addressesData?.data?.length === 0 ? (
              <EmptyState onAddAddress={handleAddAddress} />
            ) : (
              addressesData?.data?.map((address: any) => (
                <AddressCard
                  key={address?.id}
                  address={address}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isDeleting={isDeleting}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Address Form Dialog */}
      <AddressForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        editingId={editingId}
        provinces={provinces}
        filteredCities={filteredCities}
        formData={formData}
        onFormDataChange={updateFormData}
      />
    </div>
  );
}
