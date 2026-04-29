export interface LoginResponse {
  id: number;
  admin_id: string;
  first_name: string;
  last_name: string;
  role_type: string;
  email: string;
  is_created_password: boolean;
  is_verified_email: boolean;
  is_completed_profile: boolean;
  status: string;
  token: string;
  phone_number?: string | number | any;
  company_name?: string | any;
  company_country?: string | any;
  company_sector?: string | any;
}

export interface VerifyOTPResponse {
  id: number;
  merchant_admin_id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_created_password: boolean;
  is_verified_email: boolean;
  status: string;
  merchants: Merchant[];
  merchant?: Merchant;
  role_name: string;
  token: string;
  phone_number?: string;
  role_type?: string;
}


export interface AuthPayloadResponse {
  status: string;
  message: string;
  code: number;
  data: {
    payload: {
      merchant_admin_id: string;
      role_type: string;
      admin_permissions: {
        [key: string]: string[];
      };
      merchant_id: string;
      iat: number;
      exp: number;
    };
  };
}

export interface AdminProfile {
  id: number;
  merchant_admin_id: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  gender: string;
  is_verified_email: boolean;
  is_created_password: boolean;
  status: string;
  is_deleted: boolean;
  verification_token_request_count: number;
  invalid_verification_token_count: number;
  role_type: string;
  is_deactivated: boolean;
  is_created_by_seedfi: boolean;
  date_created: string;
}

export interface Merchant {
  merchant_id: string;
  business_name: string;
  status: string;
  created_at: string;
  secret_key: string;
}

export interface MerchantProfileResponse {
  id: number;
  merchant_id: string;
  business_name: string;
  email: string;
  phone_number: string;
  interest_rate: string;
  orr_score_threshold: string;
  address: string;
  secret_key: string;
  status: string;
  created_at: string;
  updated_at: string;
  processing_fee: string;
  insurance_fee: string;
  advisory_fee: string;
  customer_loan_max_amount: string;
  merchant_loan_limit: string;
  invalid_verification_token_count: number;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  password: string | null;
  is_created_password: boolean;
  verification_token_request_count: number;
  otp: number;
  requests_customer_consent: boolean;
  customer_identity_verification: string | any;
}

export interface MerchantResponse {
  merchant_id: string;
  business_name: string;
  email: string;
  phone_number: string;
  status: string;
  interest_rate: string;
  address: string;
  secret_key: string;
  orr_score_threshold: string;
  processing_fee: string;
  insurance_fee: string;
  advisory_fee: string;
  customer_loan_max_amount: string;
  merchant_loan_limit: string;
  created_at: string;
  bank_account: MerchantBankAccount;
  customer_identity_verification: string | any;
}

export interface MerchantBankAccount {
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_name: string;
}

export interface CustomerDetailsResponse extends LoanDetilsResponse {
  id: number;
  name: string;
  date_of_birth: string;
  gender: string;
  email: string;
  phone_number: string;
  tier: number;
  bvn: string;
  status: string;
  created_at: string;
  loan_id: string;
  loan_amount: string;
  loan_duration: string;
  date_received: string;
}

export interface LoanDetilsResponse {
  user_id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  loan_id: string;
  loan_amount: string;
  date_requested: string;
  date_disbursed: string;
  repayment_amount: string;
  outstanding_amount: string;
  total_amount: string;
  loan_status: string;
}

export interface CustomerLoansResponse {
  loan_repayment_id: string;
  loan_id: string;
  user_id: string;
  repayment_order: number;
  total_payment_amount: string;
  amount_paid: string;
  status: string;
  payment_at?: string;
}

export interface BvnSuccessResponse {
  status: string;
  message: string;
  code: number;
  data: {
    is_verified_bvn: boolean;
    verification_reference: string;
    user: {
      bvn: string;
      gender: string;
      last_name: string;
      email: string;
      date_of_birth: string;
      first_name: string;
      middle_name: string;
      phone_number: string;
    };
  };
}

export interface NinSuccessResponse {
  status: string;
  message: string;
  code: number;
  data: {
    is_verified_bvn: boolean;
    verification_reference: string;
    user: {
      bvn: string;
      gender: string;
      last_name: string;
      email: string;
      date_of_birth: string;
      first_name: string;
      middle_name: string;
      phone_number: string;
    };
  };
}

export interface VerifyForgotPasswordResponse {
  admin: {
    id: number;
    email: string;
    merchant_admin_id: string;
    verification_token: string;
    verification_token_expires: string;
    is_created_password: boolean;
    verification_token_request_count: number;
    invalid_verification_token_count: number;
    password_token: string;
    tokenExpireAt: string;
  };
}

export interface RepaymentHistoryResponse {
  status: string;
  message: string;
  code: number;
  data: {
    repayment_history: RepaymentHistory[];
  };
}

export interface RepaymentHistory {
  id: number;
  payment_id: string;
  user_id: string;
  loan_id: string;
  amount: string;
  loan_purpose: string;
  transaction_type: string;
  status: string;
  payment_description: string;
  payment_means: string;
  logged_by: string;
  created_at: string;
  updated_at: string;
}

export interface AdminPermissions {
  role_type: string;
  adminBasedResources: AdminBasedResource[];
}

export interface AdminBasedResource {
  merchant_admin_id: string;
  name: string;
  resource_id: string;
  permissions: string[];
}
