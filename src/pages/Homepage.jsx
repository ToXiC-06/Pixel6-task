import { useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

import Rows from "../components/Rows";
import { useAppDispatch, useAppState } from "../context/AppProvider";
import Loader from "../components/Loader";
import Header from "../components/Header";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const state = useAppState();

  function handleIdClick() {
    axios
      .get(`https://dummyjson.com/users?limit=10&skip=${state.page * 10 - 10}`)
      .then((res) => {
        dispatch({ type: "app/idSort" });
        if (!state.idSort) {
          dispatch({
            type: "app/fetched",
            payload: res.data.users.reverse(),
          });
        } else {
          dispatch({
            type: "app/fetched",
            payload: res.data.users,
          });
        }
      })
      .catch((e) => {
        dispatch({ type: "app/rejected" });
        console.log(e.message);
      });
  }
  function handleNameClick() {
    axios
      .get(`https://dummyjson.com/users?limit=10&skip=${state.page * 10 - 10}`)
      .then((res) => {
        dispatch({ type: "app/nameSort" });
        if (!state.nameSort) {
          dispatch({
            type: "app/fetched",
            payload: res.data.users.sort((a, b) => {
              const nameA = a.firstName;
              const nameB = b.firstName;
              if (nameA < nameB) {
                return -1;
              } else if (nameA > nameB) {
                return 1;
              } else {
                return 0;
              }
            }),
          });
        } else {
          dispatch({
            type: "app/fetched",
            payload: res.data.users,
          });
        }
      })
      .catch((e) => {
        dispatch({ type: "app/rejected" });
        console.log(e.message);
      });
  }

  function handleAgeClick() {
    axios
      .get(`https://dummyjson.com/users?limit=10&skip=${state.page * 10 - 10}`)
      .then((res) => {
        dispatch({ type: "app/ageSort" });
        if (!state.ageSort) {
          dispatch({
            type: "app/fetched",
            payload: res.data.users.sort((a, b) => a.age - b.age),
          });
        } else {
          dispatch({
            type: "app/fetched",
            payload: res.data.users,
          });
        }
      })
      .catch((e) => {
        dispatch({ type: "app/rejected" });
        console.log(e.message);
      });
  }

  async function handlePageChange(e, p) {
    await dispatch({ type: "app/pagination", payload: p });
  }

  useEffect(
    function () {
      dispatch({ type: "app/reset" }); //reseting all state

      dispatch({ type: "app/fetching" }); //setting isLoading to true

      //fetching all users data
      axios
        .get(
          `https://dummyjson.com/users?limit=10&skip=${state.page * 10 - 10}`
        )
        .then((res) => {
          dispatch({
            type: "app/fetched",
            payload: res.data.users,
          });
        })
        .catch((e) => {
          dispatch({ type: "app/rejected" });
          console.log(e.message);
        });
    },
    [dispatch, state.page]
  );
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Header />

      {state.isLoading ? (
        <div className="w-100 justify-content-center d-flex align-items-center mt-5">
          <Loader />
        </div>
      ) : (
        <table className="table table-striped w-100 m-auto">
          <thead>
            <tr>
              <th scope="col">
                Id
                <button
                  className={`bi fs-6 ${
                    state.idSort
                      ? "bi-sort-numeric-down-alt text-danger"
                      : "bi-sort-numeric-down text-success"
                  } border-0 bg-white`}
                  onClick={handleIdClick}
                ></button>
              </th>
              <th scope="col">Image</th>
              <th scope="col">
                Full Name
                <button
                  className={`bi fs-6 ${
                    state.nameSort
                      ? "bi-sort-alpha-down-alt text-danger"
                      : "bi-sort-alpha-down text-success"
                  } border-0 bg-white`}
                  onClick={handleNameClick}
                ></button>
              </th>
              <th scope="col">
                Demography
                <button
                  className={`bi fs-6 ${
                    state.ageSort
                      ? "bi-sort-numeric-down text-success"
                      : "bi-sort-numeric-down-alt text-danger"
                  } border-0 bg-white`}
                  onClick={handleAgeClick}
                ></button>
              </th>
              <th scope="col">Designation</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {state.users.reverse().map((item) => (
              <Rows key={item.id} data={item} />
            ))}
          </tbody>
        </table>
      )}
      <div className="my-3">
        <Pagination
          onChange={handlePageChange}
          count={10}
          size="large"
          color="primary"
        />
      </div>
    </div>
  );
}
