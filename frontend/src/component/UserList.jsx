import ActionButton from "./ActionButton";
import SeeAllButton from "./SeeAllButton";

const UserList = () => {
  const users = [
    { id: 10021, name: "Alex Ray", issued: 12, dept: "Psychology" },
    { id: 10234, name: "Sophia", issued: 7, dept: "Business" },
    { id: 22987, name: "Jhon", issued: 17, dept: "Computer Science" },
    { id: 53272, name: "Rose", issued: 25, dept: "Pharmacy" },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Users List</h2>
          <ActionButton label="Add New User" onClick={() => alert("Add User Clicked")} />
        </div>
        <div className="overflow-x-auto shadow-sm border-b border-gray-200 rounded-md">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="pb-2">User ID</th>
                <th className="pb-2">User Name</th>
                <th className="pb-2">Book Issued</th>
                <th className="pb-2">Department</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-gray-50 text-black border-b border-gray-200"
                >
                  <td className="py-2">{u.id}</td>
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.issued}</td>
                  <td className="py-2">{u.dept}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <SeeAllButton onClick={() => alert("See All Users")} />
      </div>
    </div>
  );
};

export default UserList;
