interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
}

export default function StatsCard({ label, value, icon, color = "bg-indigo-50 text-indigo-600" }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4">
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
