export interface RateLimitRecord {
  id: string;
  identifier: string;
  endpoint: string;
  violation_count: number;
  window_start_at: string;
  requests_in_window: number;
  block_status: "none" | "temporary" | "permanent";
  block_expires_at: string | null;
  violation_count_reset_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GetRateLimitRecordsResponse {
  statusCode: number;
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
    records: RateLimitRecord[];
  };
}

export interface GetRateLimitRecordResponse {
  statusCode: number;
  message: string;
  data: {
    record: RateLimitRecord;
  };
}

export interface GetRateLimitStatsResponse {
  statusCode: number;
  message: string;
  data: {
    total_records: number;
    temporarily_blocked: number;
    permanently_blocked: number;
    active_blocked: number;
  };
}

export interface BlockUserRequest {
  permanent: boolean;
}

export interface RateLimitRecordsParams {
  limit?: number;
  page?: number;
  identifier?: string;
  endpoint?: string;
  blockStatus?: "none" | "temporary" | "permanent";
}

export interface GetRateLimitRecordParams {
  id: string;
}

export interface BlockUserParams {
  id: string;
  data: BlockUserRequest;
}

export interface UnblockUserParams {
  id: string;
}

export interface ResetRateLimitParams {
  id: string;
}

// Props for Rate Limit Columns
export interface RateLimitColumnsProps {
  currentPage: number;
  currentLimit: number;
  records: RateLimitRecord[];
  blockUser: (data: BlockUserParams) => void;
  isBlocking: boolean;
  blockingVars?: BlockUserParams;
  unblockUser: (data: UnblockUserParams) => void;
  isUnblocking: boolean;
  unblockingVars?: UnblockUserParams;
  resetRateLimit: (data: ResetRateLimitParams) => void;
  isResetting: boolean;
  resettingVars?: ResetRateLimitParams;
}
