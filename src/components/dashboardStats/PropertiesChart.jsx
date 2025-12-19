import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
;

export default function PropertiesChart({ data }) {
  const chartData = data.map((item) => ({
    month: item.month,
    properties: item.count,
  }));
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-gray-700 font-semibold mb-3">Properties Growth</h3>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="properties" fill="#059669" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
