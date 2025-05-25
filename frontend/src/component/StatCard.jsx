import { useNavigate } from "react-router-dom";

const StatCard = (
  {
    icon,
    users,
    label,
    color,
    books
  }) => {

    const navigate = useNavigate();
    const navigateAction = ()=>{
           if(label === "Total Members" ) navigate("/dashboard/totalusers")
           if(label === "Active Members" ) navigate("/dashboard/activeusers")
           if(label === "New Members" ) navigate("/dashboard/newusers")
           if(label === "Borrowed Books" ) navigate("/dashboard/borrowedbooks")
    }
  return (
    <div
      onClick={ navigateAction }
      className="flex items-center gap-4 bg-white shadow rounded-xl p-4">
      <div className={`p-3 rounded-full ${color} text-white`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold">{users?.length ? users?.length : books?.length}</h3>
        <p className="text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default StatCard;