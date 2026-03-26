export type DashboardAlertType = "warning" | "info" | "error";

export type DashboardAlert = {
    id: number;
    title: string;
    description: string;
    type: DashboardAlertType;
};
