const SeeAllButton = ({ func, text }) => {
    return (
      <button
        onClick={func}
        className="text-red-600 border border-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-50 transition"
      >
        {text}
      </button>
    );
  };
  
  export default SeeAllButton;
  