interface Statscardprop {
  icon: string;
  title: string;
  value?: string;
  trend: string | number;
}

function Statscard({ icon, title, value, trend }: Statscardprop) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 hover:border-slate-700 transition">

      {/* Icon + Title */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-base">
          {icon}
        </div>
        <p className="text-slate-400 text-xs font-medium">{title}</p>
      </div>

      {/* Value */}
      <div>
        <p className="text-white text-2xl font-bold tracking-tight">{trend}</p>
        {value && (
          <p className="text-slate-500 text-xs mt-0.5">{value}</p>
        )}
      </div>
    </div>
  );
}

export default Statscard;