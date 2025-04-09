const StatCard = ({ icon, value, label, color }) => {
    return (
      <div className="flex items-center gap-4 bg-white shadow rounded-xl p-4">
        <div className={`p-3 rounded-full ${color} text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold">{value}</h3>
          <p className="text-gray-500">{label}</p>
        </div>
      </div>
    );
  }

  export default StatCard;