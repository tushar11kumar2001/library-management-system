const ActionButton = ({ label, onClick }) => {
    return (
      <button
        onClick={()=>onClick(true)}
        className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-50 transition"
      >
        {label}
      </button>
    );
  };
  
  export default ActionButton;
  