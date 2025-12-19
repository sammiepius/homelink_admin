import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';


export default function UsersChart({ data }) {
   const chartData = data.map((item) => ({
    month: item.month,
    users: item.count,
  }));
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      {' '}
      <h3 className="text-gray-700 font-semibold mb-3">Monthly New Users</h3>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#0d9488"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>{' '}
    </div>
  );
}
