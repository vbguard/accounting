import { useSelector } from "react-redux";
import { useFinancialDashboard } from "../hooks/useFinancialDashboard";
import FilterBar from "../components/dashboard/FilterBar";
import BalanceChart from "../components/dashboard/BalanceChart";
import MonthlyTrendChart from "../components/dashboard/MonthlyTrendChart";
import SummaryCards from "../components/dashboard/SummaryCards";
import { exportJournalCSV } from "../features/dashboard/dashboardApi";

const token = localStorage.getItem("token");

export default function DashboardPage() {
  const filters = useSelector((state) => state.dashboard.filters);
  const { data, isLoading, error } = useFinancialDashboard(token, filters);

  const handleExport = async () => {
    try {
      await exportJournalCSV(token, filters);
    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading) return <div>Loading financial dashboard...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalAssets = (data?.balanceByAccount || [])
    .filter((account) => account.type === "asset")
    .reduce((sum, account) => sum + Number(account.net || 0), 0);

  const totalRevenue = (data?.byType || [])
    .filter((entry) => entry._id === "revenue")
    .reduce((sum, entry) => sum + Number(entry.totalDebit || 0), 0);

  const totalExpenses = (data?.byType || [])
    .filter((entry) => entry._id === "expense")
    .reduce((sum, entry) => sum + Number(entry.totalDebit || 0), 0);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Finance</p>
          <h1>Accounting Dashboard</h1>
        </div>
        <button className="export-btn" onClick={handleExport}>Export Journal CSV</button>
      </header>

      <FilterBar />

      <SummaryCards summary={{ totalAssets, totalRevenue, totalExpenses }} />

      <div className="dashboard-grid">
        <BalanceChart data={data?.balanceByAccount || []} />
        <MonthlyTrendChart data={data?.monthlyTrend || []} />
      </div>
    </div>
  );
}
