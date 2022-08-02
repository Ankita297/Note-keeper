import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Container,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import "./MyNotes.css";
import axios from "axios";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/noteAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: "pink" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const MyNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);

  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) navigate("/");
  }, [dispatch, successCreate, navigate, userInfo]);

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;
  const deleteHandler = (_id) => {
    if (window.confirm("Are yur Sure ?")) {
      dispatch(deleteNoteAction(_id));
    }
  };

  return (
    <MainScreen title={`Welcome back ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      {notes &&
        notes.reverse().map((note) => (
          <Accordion key={note._id}>
            <Card style={{ margin: 10 }} key={note._id}>
              <CustomToggle variant="link" eventKey={note._id} as={Card.Text}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(note)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    {note.title}
                  </span>

                  <div>
                    <Button href={`/api/notes/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
              </CustomToggle>

              <Accordion.Collapse eventKey={note._id}>
                <Card.Body>
                  <h4>
                    <Badge variant="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-4">
                    {note.content}
                  </blockquote>
                  <footer className="blockquote-footer">
                    Created on {note.createdAt.substr(0, 10)}
                  </footer>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
