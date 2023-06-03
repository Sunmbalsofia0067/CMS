import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../constants/routePaths.js";
import { Table, Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContext.js";
import Cookies from "universal-cookie";
import network from "../utils";

export const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [articleData, setArticleData] = useState({
    title: "dfghjkl",
    description: "fgbhjnkm vfgbhjnmk vgbhnjmkjn",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: { articles, user },
    setArticles,
    setUserData,
  } = useContext(AppContext);

  const cookies = new Cookies();
  const navigate = useNavigate();

  const showDetailDialogue = (userDetail) => {
    try {
      setArticleData(userDetail);
      handleShow();
    } catch (err) {
      toast.error("🦄 Something went Wrong!!!");
    }
  };

  const fetchMyArticles = async () => {
    try {
      const articles = await network.get({ path: "articles/my-articles" });
      console.log(articles);
      articles?.data?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setArticles(articles?.data);
    } catch (err) {
      console.log('Something went Wrong in finding articles');
      // toast.error("🦄 Something went Wrong!!!");
    }
  };

  const deleteMyArticle = async (id) => {
    try {
      await network.delete({ path: `articles/${id}` });
      const removeUserResponse = articles.filter((article) => article.id !== id);
      setArticles(removeUserResponse);
      toast.info("🦄 Article Successfully deleted!");
    } catch (err) {
      toast.error("🦄 Something went Wrong!");
    }
  };

  useEffect(() => {
    fetchMyArticles();
  }, []);

  const logoutUser = () => {
    cookies.remove("authorization", { path: "/" });
    setArticles([]);
    setUserData(null);
    navigate(routes.loginUserPage);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setArticleData({
      ...articleData,
      [name]: value,
    });
  };

  const addOrUpdateArticle = async (event) => {
    try {
      event.preventDefault();
      const { id, title, description } = articleData;

      if (!title || !description) {
        toast.error("Fill all fields");
        return;
      }

      await network.post({
        path: `articles/${id ? id : ''}`,
        options: {
          title,
          description,
          published: true,
          ...(id ? { id } : {}),
        },
      });

      setArticleData({});
      toast.info(`🦄 Article ${id ? 'updated' : 'added'} successfully!`);

      setShow(false);
      fetchMyArticles();
    } catch (err) {
      toast.error(err?.response?.data?.message || "🦄 Something went Wrong!!!");
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <h2>Welcome {user?.name}</h2>
        <Button
          className="me-2"
          variant="info"
          onClick={() => showDetailDialogue({})}
        >
          Add New Article
        </Button>
        <Button variant="outline-info" onClick={logoutUser}>
          Logout
        </Button>
      </div>

      {articles.length ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => {
              return (
                <tr key={index}>
                  <td>{article.title}</td>
                  <td>{article.description.length > 50 ? `${article.description.substring(0,50)}...` : article.description}</td>
                  <td>
                    <Button
                      className="me-2"
                      variant="info"
                      onClick={() => showDetailDialogue(article)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => deleteMyArticle(article.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      className="me-2 m-2"
                      variant="info"
                    >
                    <Link to={`/articles/${article.id}`}>Details</Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        "No records to display"
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Article Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addOrUpdateArticle}>
            <Form.Group className="m-3 w-70" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={articleData.title}
                placeholder="Enter Article Title "
                onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group className="m-3 w-70" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <FloatingLabel controlId='floatingTextarea'>
              <Form.Control
                as='textarea'
                type="text"
                name="description"
                value={articleData.description}
                style={{ height: '200px' }}
                placeholder="Enter Article Description "
                onChange={handleOnChange}
              />
              </FloatingLabel>
            </Form.Group>
            

            <Form.Group className="m-3 w-70" controlId="formBasicSubmit">
              <Button variant="primary" type="submit">
                {articleData?.id ? "Update" : "Add"}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
