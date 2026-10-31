import { useDispatch, useSelector } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setAccountFilter,
  setTypeFilter,
} from "../../features/dashboard/dashboardSlice";

export default function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.dashboard.filters);

  return (
    <div className="filter-bar">
      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => dispatch(setStartDate(e.target.value))}
      />
      <input
        type="date"
        value={filters.endDate}
        onChange={(e) => dispatch(setEndDate(e.target.value))}
      />
      <select value={filters.accountId} onChange={(e) => dispatch(setAccountFilter(e.target.value))}>
        <option value="all">All Accounts</option>
        <option value="cash">Cash</option>
        <option value="bank">Bank</option>
        <option value="revenue">Revenue</option>
        <option value="expense">Expenses</option>
      </select>

      <select value={filters.type} onChange={(e) => dispatch(setTypeFilter(e.target.value))}>
        <option value="all">All Types</option>
        <option value="revenue">Revenue</option>
        <option value="expense">Expense</option>
        <option value="asset">Asset</option>
        <option value="liability">Liability</option>
      </select>
    </div>
  );
}
