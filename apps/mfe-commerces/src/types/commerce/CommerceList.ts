export type AllCommercesGridApiRow = {
  businessId: number;
  corporate?: string;
  businessName?: string;
  /** Merchant Category Code */
  mcc?: string;
  businessMembership?: string;
  businessSubmembership?: string;
  businessLine?: string;
  businessPhone?: string;
  businessEmail?: string;
  businessStatus?: string;
};

export type AllCommercesGridListResponse = {
  status?: boolean;
  message?: string;
  total?: number;
  rows?: AllCommercesGridApiRow[];
  objectList?: unknown;
};

export type CommerceByIdResponse = {
  status?: boolean;
  message?: string;
  total?: number;
  data_response?: AllCommercesGridApiRow;
};
