const TopChoices = () => {
    const choices = [
      { title: "The Critique of Pure Reason", author: "Immanuel Kant", cover: "/books/kant.jpg" },
      { title: "Stroller", author: "Amanda Parrish Morgan", cover: "/books/stroller.jpg" },
      { title: "The Design of Everyday Things", author: "Don Norman", cover: "/books/design.jpg" },
      { title: "Lean UX", author: "Jeff Gothelf", cover: "/books/leanux.jpg" },
      { title: "The Republic", author: "Plato", cover: "/books/republic.jpg" },
    ];
  
    return (
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Top Choices</h2>
        <div className="flex gap-4 overflow-x-auto">
          {choices.map((book, index) => (
            <div key={index} className="min-w-[140px] bg-white rounded-xl shadow p-2 text-center">
              <img src={book.cover} alt={book.title} className="h-32 w-full object-cover rounded-md mb-2" />
              <h3 className="text-sm font-medium">{book.title}</h3>
              <p className="text-xs text-gray-500">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default TopChoices;

  