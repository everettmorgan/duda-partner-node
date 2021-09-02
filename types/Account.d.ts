export interface Account {
  account_name: string;
  first_name?: string;
  last_name?: string;
  lang?: string;
  email?: string;
  account_type?: 'CUSTOMER' | 'STAFF';
}

export interface GetAccountPayload {
  account_name: string;
}

export interface GetAccountResponse {
  account_name: string;
  first_name?: string;
  last_name?: string;
  lang?: string;
  email?: string;
  accountData?: {
    company_name?: string;
  };
  account_type?: string;
}

export interface CreateAccountPayload {
  account_name: string;
  first_name?: string;
  last_name?: string;
  lang?: string;
  email?: string;
  account_type?: "CUSTOMER" | "STAFF";
}

export interface UpdateAccountPayload {
  account_name: string;
  first_name?: string;
  last_name?: string;
  lang?: string;
  email?: string;
}

export interface DeleteAccountPayload {
  account_name: string;
}

export type CreateAccountResponse = void;
export type UpdateAccountResponse = void;
export type DeleteAccountResponse = void;
export type GetPermissionsResponse = Array<Permissions>;

export enum Permissions {
  STATS_TAB = 'STATS_TAB',
  EDIT = 'EDIT',
  E_COMMERCE = 'E_COMMERCE',
  PUBLISH = 'PUBLISH',
  REPUBLISH = 'REPUBLISH',
  DEV_MODE = 'DEV_MODE',
  INSITE = 'INSITE',
  SEO = 'SEO',
  BACKUPS = 'BACKUPS',
  CUSTOM_DOMAIN = 'CUSTOM_DOMAIN',
  RESET = 'RESET',
  BLOG = 'BLOG',
  PUSH_NOTIFICATIONS = 'PUSH_NOTIFICATIONS',
  LIMITED_EDITING = 'LIMITED_EDITING',
  SITE_COMMENTS = 'SITE_COMMENTS',
  CONTENT_LIBRARY = 'CONTENT_LIBRARY',
  USE_APP = 'USE_APP',
  CLIENT_MANAGE_FREE_APPS = 'CLIENT_MANAGE_FREE_APPS',
}

export type ListAccessibleSitesResponse = Array<{
  site_name: string;
}>

export interface ListAccessibleSitesPayload {
  account_name: string;
}

export interface GetPermissionsPayload {
  site_name?: string;
  account_name?: string;
}

export interface GrantSiteAccessPayload {
  site_name: string;
  account_name: string;
  permissions: Array<Permissions>;
}

export type SSOLinkTargets = "STATS" | "EDITOR" | "RESET_SITE";

export type GrantSiteAccessResponse = void;
export type RemoveSiteAccessResponse = void;

export interface RemoveSiteAccessPayload {
  site_name: string;
  account_name: string;
}

export interface GetSSOLinkPayload {
  account_name: string;
  site_name?: string;
  target: SSOLinkTargets;
}

export interface GetSSOLinkResponse {
  url: string;
}

export interface GetResetPasswordLinkPayload {
  account_name: string;
}

export interface GetResetPasswordLinkResponse {
  reset_url: string;
}