interface Statscardprop {
  icon: string,
  title: string,
  value?: string, 
  trend: string | number,
}

function Statscard({ icon, title, value, trend }: Statscardprop) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 text-2xl">
        <span>{icon}</span>
        <p className="text-gray-600 font-light">{title}</p>
      </div>

      <p className="text-xl font-bold mt-4">{value}</p>
      <p className="text-lg text-green-500 mt-2">{trend}</p>
    </div>
  );
}

export default Statscard;