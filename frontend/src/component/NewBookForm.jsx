import axios from 'axios';
import { useState } from 'react';
import { X } from 'lucide-react';

const NewBookForm = ({ setShowNewBookForm }) => {
  const [bookId, setBookId] = useState('');
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the data
    axios.post("/book/add", {
      bookId: bookId,
      bookName: bookName,
      author: authorName
    }).then((response) => {
      console.log("Book added successfully:", response.data);

      // Clear the input fields after submission
      alert("Book added successfully");
      setBookId('');
      setBookName('');
      setAuthorName('');
      window.location.reload();

    }).catch((error) => {
      console.error("Error adding book:", error.message);
    });


  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow rounded relative">
      <X className="w-10 h-10 text-gray-600 cursor-pointer absolute right-1 top-1 " onClick={()=>setShowNewBookForm(false)}/>

      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Book ID</label>
          <input
            type="text"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Book ID"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Book Name</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Book Name"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Author Name</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Author Name"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default NewBookForm;
