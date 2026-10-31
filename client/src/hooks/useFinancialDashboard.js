import { useQuery } from "@tanstack/react-query";
import { fetchFinancialDashboard } from "../features/dashboard/dashboardApi";

export const useFinancialDashboard = (token, filters) => {
  return useQuery({
    queryKey: ["financial-dashboard", token, filters],
    queryFn: () => fetchFinancialDashboard(token, filters),
    enabled: !!token,
    staleTime: 60 * 1000,
  });
};
