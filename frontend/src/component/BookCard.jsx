
const BookCard = ({ book }) => {
  return (
    <div
      className="min-w-[140px] bg-white rounded-xl shadow p-2 text-center"
    >
      <img
        src={book.coverUrl || import.meta.env.VITE_TEMPORARY_BOOKCOVER}
        alt={`Cover of ${book.bookName}`}
        className="h-32 w-full object-cover rounded-md mb-2"
      />
      <h3 className="text-sm font-medium">{book.bookName.toUpperCase()}</h3>
      <p className="text-xs text-gray-500">{book.author}</p>
    </div>
  );
};

export default BookCard;
