import React, { useEffect } from "react";
import MainScreen from "../MainScreen/MainScreen";
import { Button } from "@mui/material";
import "./style.scss";
import { Accordion, Badge, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import axios from "axios";
import { deleteNoteAction, getNotes } from "../../action/notesAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const MyNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notesList = useSelector((state) => state.notesList);

  const { loading, notes, error } = notesList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const noteCreate = useSelector((state) => state.noteCreate);

  const { success: successCreate } = noteCreate;
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <div className="accordian-div" onClick={decoratedOnClick}>
        {children}
      </div>
    );
  }

  useEffect(() => {
    dispatch(getNotes());
    if (!userInfo) navigate("/login");
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  return (
    <MainScreen title={`Welcome back ${userInfo.name} ...  `}>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/createnote");
        }}
        className="create-btn"
      >
        Create a Note
      </Button>
      {error && <Error severity="error">{error}</Error>}
      {loading && <Loading />}
      <Accordion defaultActiveKey="0" className="accordian-main">
        {notes &&
          notes.reverse().map((x, _id) => {
            return (
              <Card className="card" key={x._id}>
                <CustomToggle eventKey={_id} clasName="header">
                  <Card.Header className="card-header">
                    <div style={{ display: "inline-block" }}>{x.title}</div>
                    <Button
                      variant="contained"
                      className="delete-btn"
                      onClick={() => {
                        dispatch(deleteNoteAction(x._id));
                        navigate("/mynotes");
                      }}
                    >
                      DELETE
                    </Button>
                    <Button
                      variant="contained"
                      className="edit-btn"
                      onClick={() => {
                        navigate(`/note/${x._id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </Card.Header>
                </CustomToggle>
                <Accordion.Collapse eventKey={_id}>
                  <Card.Body>
                    <h5>
                      <Badge variant="success">Category - {x.category}</Badge>
                    </h5>
                    <blockquote className="blockquote mt-3">
                      <p>{x.content}</p>
                      <footer
                        className="blockquote-footer"
                        style={{ color: "#85ccff" }}
                      >
                        Created On - {x.createdAt.substr(0, 10)}
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
      </Accordion>
    </MainScreen>
  );
};

export default MyNotes;
