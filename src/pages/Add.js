import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useBooks } from "../context/books.context";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function Add() {
  const navigate = useNavigate();
  const { books, setBooks } = useBooks();
  const initialValues = {
    title: "",
    author: "",
    isbn: "",
    date: "",
    id: Date.now(),
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

  return (
    <div>
      <h1>Add Book Details</h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => {
          setBooks([...books, { ...values }]);
          navigate("/");
        }}
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

export default Add;
