import { FormInstance } from "antd";
import {
  AdminProfile,
  CustomerLoansResponse,
  LoginResponse,
  MerchantProfileResponse,
  MerchantResponse,
  VerifyOTPResponse,
} from "../clients/response";

export interface State {
  formSubmittable?: boolean;
  buttonLoading?: boolean;
  auth?: Auth;
  admin?: Admin;
  apiRequest?: any;
  data?: object;
  tableLoading?: boolean;
  currentGetpaginationAPI?: string;
  form?: FormInstance<object>;
  defaultValues?: any;
  otpResponse?: VerifyOTPResponse;
  resetField?: () => void;
  generateCustomRequest?: (request: any) => any;
  apiCallBack?: (response: any) => void;
  setState: (key: keyof State, value: any) => void;
  setAllState: (state: State) => void;
  resetForm: (state: State) => void;
  verificationType?: string | any;
}

interface Auth {
  loginResponse?: LoginResponse;
  signupResponse?: any;
  otpDuration?: number;
}

interface Admin {
  merchantDetails?: MerchantResponse;
  merchantProfile?: MerchantProfileResponse;
  adminProfile?: AdminProfile;
  openModal?: boolean;
  pagination?: { size?: number; current?: number; total?: number };
  showTableRowDetails?: boolean;
  loadingLoanDetails?: boolean;
  customerLoans?: Array<CustomerLoansResponse>;
  nonRequriredKeys?: Array<string>;
}
