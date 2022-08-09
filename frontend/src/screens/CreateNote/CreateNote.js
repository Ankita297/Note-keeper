import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import MainScreen from "../MainScreen/MainScreen";
import { Button } from "@mui/material";
import ReactMarkdown from "react-markdown";

import "./style.scss";
import { createNoteAction } from "../../action/notesAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateNote = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const noteCreate = useSelector((state) => state.noteCreate);

  const { loading, error, note } = noteCreate;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createNoteAction(title, content, category));
    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainScreen title={`Create a Note`}>
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
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
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="contained"
              className="sumbit-btn mt-2"
            >
              Create Note
            </Button>

            <Button
              className="sumbit-btn mt-2 mx-3"
              variant="contained"
              type="submit"
              onClick={resetHandler}
            >
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNote;
