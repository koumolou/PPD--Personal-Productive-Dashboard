interface ProgressBarType {
  value: number;
  color?: string;
  label?: string;
  showpercent?: boolean;
}

function Progressbar({
  value,
  color = "bg-teal-500",
  label,
  showpercent = true,
}: ProgressBarType) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="flex flex-col gap-2 w-full">
      
      {/* Label + Percent */}
      <div className="flex justify-between items-center">
        {label && (
          <span className="text-xs font-medium text-slate-400">{label}</span>
        )}
        {showpercent && (
          <span className="text-xs font-semibold text-slate-300 ml-auto">
            {clamped.toFixed(0)}%
          </span>
        )}
      </div>

      {/* Track */}
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default Progressbar;