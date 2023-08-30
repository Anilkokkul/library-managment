import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooks } from "../context/books.context";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "antd";
function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { books, setBooks } = useBooks();
  const [modiefied, setModified] = useState([]);

  useEffect(() => {
    const book = books.find((item) => item.id === Number(id));
    if (book) {
      setModified(book);
    }
  }, [books, id]);

  const initialValues = {
    title: modiefied.title,
    author: modiefied.author,
    isbn: modiefied.isbn,
    date: modiefied.date,
    id: Number(id),
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.length > 40) {
      errors.title = "Must be 40 characters or less";
    }
    if (!values.author) {
      errors.author = "Required";
    }
    if (!values.isbn) {
      errors.isbn = "Required";
    } else if (String(values.isbn).split("").length > 10) {
      errors.isbn = "Must be 10 characters";
    }
    if (!values.date) {
      errors.date = "required";
    }
    return errors;
  };

  const onSubmit = (values) => {
    console.log(values);
    const updatedBooks = books.map((item) => {
      if (item.id === values.id) {
        return { ...values };
      } else {
        return item;
      }
    });
    setBooks(updatedBooks);
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Book Details</h1>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        <Form className="form-container">
          <div className="form">
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <br />
              <Field type="text" id="title" name="title" />
              <br />
              <span>
                <ErrorMessage name="title" />
              </span>
            </div>
            <div className="form-control">
              <label htmlFor="author">Author Name</label>
              <br />
              <Field type="text" id="author" name="author" />
              <br />
              <span>
                <ErrorMessage name="author" />
              </span>
            </div>
            <div className="form-control">
              <label htmlFor="isbn">ISBN</label>
              <br />
              <Field type="text" id="isbn" name="isbn" />
              <br />
              <span>
                <ErrorMessage name="isbn" />
              </span>
            </div>
            <div className="form-control">
              <label htmlFor="date">Publish Date</label>
              <br />
              <Field type="date" id="date" name="date" />
              <br />
              <span>
                <ErrorMessage name="date" />
              </span>
            </div>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Edit;
