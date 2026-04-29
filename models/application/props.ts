import { DataQueriesType } from "@utils/type";
import { Rule } from "antd/es/form";
import { ColumnProps } from "antd/es/table";
import { JSX } from "react";

export interface FieldProp {
  value?: string;
  name?: string;
  placeholder?: string;
  pattern?: boolean;
  patternRule?: string | any;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  labelClassNames?: string;
  fieldErrorMessage?: string;
  customFieldValidationRules?: Rule[];
  classNames?: string;
  type?: "password" | "select" | "date" | "tel" | "search" | "amount" | "name";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  items?: Array<{ label?: string; value?: string }>;
  validateStatus?: ValidationStatus;
  hasFeedback?: boolean;
  isBVN?: boolean;
  isNIN?: boolean;
  bvnFeedback?: boolean;
  ninFeedback?: boolean;
  help?: string;
  loading?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onSearch?: any | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  validate?: any;
  searchText?: string;
  confirmPassword?: { passwordKey?: string };
  readonly?: boolean;
  onChange?: (a: any, b?: any) => void;
  optionalLabel?: boolean;
  showVerifiedInfo?: boolean;
  verifiedFirstName?: string;
  verifiedLastName?: string;
  height?: string | any;
  filterOption?: (inputValue: string, option: any) => void | any;
}

export interface FormProp {
  children?: JSX.Element[] | JSX.Element;
  clasNames?: string;
  apiCallBackResponse?: () => void;
  customValues?: any;
  extraValues?: any;
  postUrl?: string;
  callFetch?: boolean;
  payloadRemovedKey?: string;
  requiredMark?: boolean;
}

export interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  isLoading?: boolean;
}

export interface AuthFormLayoutProp {
  title: string | JSX.Element;
  description?: string | JSX.Element;
  children?: JSX.Element;
  icon?: string;
  classNames?: string;
  descriptionWidth?: string | number;
  centralize?: boolean;
}

export interface AdminLayoutProps {
  totalPagesData: number;
  exportUrl?: string;
  exportKey?: string;
  loading: boolean;
  title: string;
  addForm?: boolean;
  tableEmptyHeadingText?: string;
  tableEmptyParagraphText?: string;
  postUrl?: string;
  tableData?: Array<any>;
  modalTile?: string;
  addButtonTitle?: string;
  secondaryButtonTitle?: string;
  onSecondaryButtonClick?: () => void;
  addFormContent?: JSX.Element[] | JSX.Element | any;
  callFetch?: boolean;
  modalWidth?: number;
  postAPICallBack?: (response: any) => void;
  onPaginate?: (pageNumber: any) => void;
  tableRowClickable?: (record: any) => boolean;
  onTableRowClick?: (record: any, rowIndex?: number) => void;
  rowDetailsContent?: JSX.Element[] | JSX.Element;
  closeFunction?:any
  columns?: Array<{
    title?: string;
    key?: string;
    render?: ((value: any, record: unknown, index: number) => React.ReactNode | any) | undefined;
  }>;
  setDataQueries?: React.Dispatch<React.SetStateAction<DataQueriesType>>;
  setSearchValue?: (val: string) => void;
  dataQueries: any;
  pdfDataKey?: string;
  hideExport?: boolean;
  hideDate?: boolean;
  hideSelect?: boolean;
  hideAdmin?: boolean;
  hideSearch?: boolean;
  tableColumn?: any[];
  selectOptions?: {
    label: string;
    value: string;
  }[];
  scrollX?: number;
  adminOptions?: {
    label: string;
    value: string;
  }[];
  pageLoading?: boolean;
}

export interface CustomMenuProps {
  title: string;
  url: string;
  icon: React.ReactNode;
  key: string;
  active: boolean;
}

export interface MenuProps {
  items: CustomMenuProps[];
  collapse: boolean;
  setTooltipContent: (content: string, event: React.MouseEvent) => void;
  hideTooltip: () => void;
}

export interface DataTableProps {
  loading: boolean;
  emptyHeadingText?: string;
  rows?: Array<any>;
  emptyParagraphText?: string;
  totalPagesData: number;
  children?: JSX.Element[] | JSX.Element;
  onPaginate?: (pageNumber: any) => void;
  onRowClick?: (record: any, rowIndex?: number) => void;
  rowClickable?: (record: any) => boolean;
  columns?: Array<{
    title?: string;
    key?: string;
    render?: ((value: any, record: unknown, index: number) => React.ReactNode | any) | undefined;
  }>;
  onRowSelect?: (record: any, rowIndex: number | undefined, options?: object) => void;
  scrollX?: number;
}

export interface TableColumnsProps {
  columns?: Array<{
    title?: string;
    key?: string;
    render?: ((value: any, record: unknown, index: number) => React.ReactNode | any) | undefined;
  }>;
  customColumsTag?: <RecordType>(_: ColumnProps<RecordType>) => null;
}

export interface AppModalProps extends FormProp {
  customContent?: JSX.Element[] | JSX.Element;
  customFormContent?: JSX.Element[] | JSX.Element;
  title?: string;
  callFetch?: boolean;
  apiCallBackResponse?: () => void;
  onCancel?: () => void;
  width?: number;
  addForm?: boolean;
  openModal?: boolean;
  children?: any;
}

export type ValidationStatus = "" | "error" | "validating" | "success" | "warning";

export interface ValidationState {
  help: string;
  status: ValidationStatus;
}

export interface StatusProps {
  status: string;
  label?: string;
  className?: string;
  labelClass?: string;
  type?: "capsule";
  hideIcon?: boolean;
}
export class ModalProps {
  openModal?: boolean;
  handleCancel?: any;
  modalTitle?: string;
  modalFooter?: any;
  onOk?: any;
  children?: any;
  cancelText?: string;
  okText?: any;
  modalWith?: string;
  centered?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  closeIcon?: any;
}

export interface DecodedToken {
  admin_permissions: {
    [key: string]: string[];
  };
  exp: number;
  iat: number;
  merchant_admin_id: string;
  role_type: string;
}

export type AddLoanTypes = {
  disburseToCustomer: boolean;
  account_name?: string;
  account_number?: string;
  bank_code?: string;
  user_id: string;
  amount: string | number | any;
  loanReason: string;
  loanTenor: string;
  consent_otp?: string;
};
