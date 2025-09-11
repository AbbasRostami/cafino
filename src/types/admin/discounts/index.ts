import { DiscountFormType } from "@/schemas/admin/discount";

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

// Props
export interface ModalContentDiscountProps {
  onSubmit: (data: DiscountFormType) => void;
  isPending: boolean;
}

export type ColumnsDiscountsProps = {
  currentPage: number;
  currentLimit: number;
  deleteDiscount: (data: DeleteDiscountRequest) => void;
  isPendingDiscount: boolean;
  deletingVars: DeleteDiscountRequest;
  updateStatusDiscount: (data: UpdateDiscountStatusRequest) => void;
  isPendingStatusUpdate: boolean;
  updatingVars: UpdateDiscountStatusRequest;
};

export interface UseGetDiscountsProps {
  page?: number;
  limit?: number;
  isActive?: boolean;
  sortBy?: string;
}
