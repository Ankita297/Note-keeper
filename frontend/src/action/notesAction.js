import axios from "axios";
import {
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_FAIL,
  NOTES_CREATE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_FAIL,
  NOTES_DELETE_SUCCESS,
  NOTES_UPDATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
} from "../constants/notesConstants";

//get state conatin all your states

export const getNotes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log(config);
    const { data } = await axios.get("/api/notes", config);
    console.log(data);
    dispatch({ type: NOTES_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: NOTES_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createNoteAction =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTES_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/notes/create",
        { title, content, category },
        config
      );
      dispatch({ type: NOTES_CREATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: NOTES_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const updateNoteAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTES_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
    console.log(config)
      const { data } = await axios.put(
        `/api/notes/${id}`,
        { title, content, category },
        config
      );
      console.log(data);
      dispatch({ type: NOTES_UPDATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: NOTES_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/notes/${id}`,

      config
    );
    console.log(data);
    dispatch({ type: NOTES_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: NOTES_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
