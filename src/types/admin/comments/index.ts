export interface CommentResponseAdmin {
  id: string;
  text: string;
  accept: boolean;
  star: number;
  created_at: string;
  user: {
    id: string;
    username: string;
    first_name: string | null;
    last_name: string | null;
    phone: string;
  };
  parent: string | null;
  item: {
    id: string;
    title: string;
  };
  is_reply: boolean;
}

export interface GetCommentsAdminApiResponse {
  statusCode: number;
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
    comments: CommentResponseAdmin[];
  };
}

// Props

export interface ColumnsCommentsProps {
  currentPage: number;
  currentLimit: number;
  acceptComment: (data: { id: string }) => void;
  isAcceptingComment: boolean;
  acceptingVars: { id: string };
  rejectComment: (data: { id: string }) => void;
  isRejectingComment: boolean;
  rejectingVars: { id: string };
}
export interface AddCommentModalProps {
  itemId: string;
  parentId?: string;
  trigger?: React.ReactNode;
}

export interface CommentFormAdminProps {
  itemId: string;
  parentId?: string;
  closeModal: () => void;
}
