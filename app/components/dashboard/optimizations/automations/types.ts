export interface Automation {
  id: string;
  clientId: string;
  title: string;
  status: string;
  impactEstimate: number | null;
  impactValue: number;
  description: string | null;
  actions: any[];
  createdAt: string;
  updatedAt: string;
}

export interface PageInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface AutomationsResponse {
  automations: Automation[];
  pageInfo: PageInfo;
}
