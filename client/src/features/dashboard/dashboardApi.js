const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchFinancialDashboard = async (token, filters = {}) => {
  const params = new URLSearchParams();

  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);
  if (filters.accountId && filters.accountId !== "all") params.append("accountId", filters.accountId);
  if (filters.type && filters.type !== "all") params.append("type", filters.type);

  const response = await fetch(`${API_URL}/dashboard/financial?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to load dashboard");
  }

  return response.json();
};

export const exportJournalCSV = async (token, filters = {}) => {
  const params = new URLSearchParams();
  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);

  const response = await fetch(`${API_URL}/reports/journal/export?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Export failed");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "journal-entries.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};
