import { createContext, useContext, useEffect, useState } from "react";

const BooksContext = createContext({
  books: [],
  setBooks: () => Promise,
});

export const useBooks = () => useContext(BooksContext);

const BooksContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/mocks/books.json")
      .then((res) => res.json())
      .then((result) => setBooks(result.books))
      .catch((err) => console.log("Error while fetching Books data", err));
  }, []);

  const handleDelete = (book) => {
    const newBooklist = books.filter((item) => item.id !== book.id);
    setBooks([...newBooklist]);
  };

  const value = {
    books,
    setBooks,
    handleDelete,
  };
  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
};

export default BooksContextProvider;
