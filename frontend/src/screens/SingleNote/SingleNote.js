import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";

import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import MainScreen from "../MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import { deleteNoteAction, updateNoteAction } from "../../action/notesAction";
import axios from "axios";
const SingleNote = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const noteDelete = useSelector((state) => state.noteDelete);

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
      await navigate("/mynotes");
    }
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };
  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <br></br>
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="contained" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => deleteHandler(params.id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
