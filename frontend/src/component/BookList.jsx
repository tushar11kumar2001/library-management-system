import ActionButton from "./ActionButton";
import SeeAllButton from "./SeeAllButton";

const BookList = () => {
  const books = [
    { id: "B1001", title: "Atomic Habits", author: "James Clear", genre: "Self-help" },
    { id: "B1023", title: "The Lean Startup", author: "Eric Ries", genre: "Business" },
    { id: "B1129", title: "1984", author: "George Orwell", genre: "Fiction" },
    { id: "B1203", title: "Sapiens", author: "Yuval Noah Harari", genre: "History" },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Books List</h2>
          <ActionButton label="Add New Book" onClick={() => alert("Add Book Clicked")} />
        </div>
        <div className="overflow-x-auto shadow-sm border-b border-gray-200 rounded-md">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="pb-2">Book ID</th>
                <th className="pb-2">Title</th>
                <th className="pb-2">Author</th>
                <th className="pb-2">Genre</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-gray-50 text-black border-b border-gray-200"
                >
                  <td className="py-2">{book.id}</td>
                  <td className="py-2">{book.title}</td>
                  <td className="py-2">{book.author}</td>
                  <td className="py-2">{book.genre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <SeeAllButton onClick={() => alert("See All Books")} />
      </div>
    </div>
  );
};

export default BookList;
