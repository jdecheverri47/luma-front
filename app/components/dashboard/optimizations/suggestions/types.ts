export type Suggestion = {
  id: string;
  clientId: string;
  title: string;
  status: "DISMISSED";
  impactEstimate: string;
  impactValue: number;
  strategy: string;
  actions: any[];
};
