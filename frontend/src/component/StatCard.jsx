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
           if(label === "Total Members" ) navigate("/admindashboard/totalusers")
           if(label === "Active Members" ) navigate("/admindashboard/activeusers")
           if(label === "New Members" ) navigate("/admindashboard/newusers")
           if(label === "Borrowed Books" ) navigate("/admindashboard/borrowedbooks")
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