export default function SummaryCards({ summary }) {
  const cards = [
    { label: "Total Assets", value: summary?.totalAssets || 0, tone: "primary" },
    { label: "Revenue", value: summary?.totalRevenue || 0, tone: "success" },
    { label: "Expenses", value: summary?.totalExpenses || 0, tone: "danger" },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <div key={card.label} className={`summary-card ${card.tone}`}>
          <span>{card.label}</span>
          <strong>${Number(card.value).toLocaleString()}</strong>
        </div>
      ))}
    </div>
  );
}
