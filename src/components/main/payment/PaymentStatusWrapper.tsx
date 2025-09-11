"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentResult, PaymentLoading } from "./index";

type PaymentStatus = "success" | "failed" | "pending";

const PaymentStatusContent = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") as PaymentStatus;

  return <PaymentResult status={status} />;
};

export const PaymentStatusWrapper = () => {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentStatusContent />
    </Suspense>
  );
};
