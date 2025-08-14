import { DiscountFormType } from "@/schemas/admin/discount/discount";

export interface Discounts {
  id: string;
  code: string;
  percent: number | null;
  amount: number | null;
  expires_in: string;
  limit: number;
  usage: number;
  active: boolean;
}

export interface GetDiscountsResponse {
  data: {
    discounts: Discounts[];
    statusCode: number;
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface UseGetDiscountsProps {
  page?: number;
  limit?: number;
}

export interface CreateDiscountRequest {
  code: string;
  percent?: number;
  amount?: number;
  expires_in: number;
  limit: number;
}

export interface DeleteDiscountRequest {
  id: string;
}

export interface UpdateDiscountStatusRequest {
  id: string;
  status: boolean;
}

export interface ModalContentDiscountProps {
  onSubmit: (data: DiscountFormType) => void;
  isPending: boolean;
}
