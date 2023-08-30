import { useBooks } from "../context/books.context";
import { Space, Table } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  const { books, handleDelete } = useBooks();
  console.log(books);

  const columns = [
    {
      title: "Book Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Publish Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleDelete(record)} danger>
            Delete
          </Button>
          <Link to={`/edit/${record.id}`}>
            <Button>Edit</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1>Library Management</h1>
      <Link to="/add">
        {" "}
        <Space direction="vertical">
          <Button type="primary" size="large" block>
            Add Book
          </Button>
        </Space>
      </Link>
      <div style={{ width: "100%" }}>
        <Table size="small" columns={columns} dataSource={books} />
      </div>
    </>
  );
};

export default Home;
