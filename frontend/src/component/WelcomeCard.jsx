const Welcome = ({ name = "Arafat", role = "Admin" }) => {
    return (
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Hello {name} 👋</h1>
        <p className="text-gray-500">Welcome back, {role}</p>
      </div>
    );
  };
  
  export default Welcome;
  