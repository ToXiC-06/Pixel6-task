import DropDown from "./DropDown";
import { useAppDispatch, useAppState } from "../context/AppProvider";
import axios from "axios";

export default function Header() {
  const dispatch = useAppDispatch();
  const state = useAppState();

  async function handleGenderChange(e) {
    dispatch({ type: "app/fetching" }); //setting isLoading to true
    await axios
      .get(`https://dummyjson.com/users?limit=10&skip=${state.page * 10 - 10}`)
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
    dispatch({ type: "app/gender", payload: e.target.value.toLowerCase() });
  }

  async function handleCountryChange(e) {
    console.log(e.target.value);
    dispatch({ type: "app/fetching" }); //setting isLoading to true
    await axios
      .get(`https://dummyjson.com/users?limit=10&skip=${state.page * 10 - 10}`)
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
    dispatch({ type: "app/country", payload: e.target.value });
  }

  return (
    <div className="bg-secondary-subtle w-100 p-2 d-flex align-items-center justify-content-between">
      <h1 className="ms-3">Employees</h1>
      <div className="d-flex gap-4 align-items-center">
        <span className="text-danger bi bi-funnel-fill"></span>
        <DropDown
          title={"Country"}
          handleChange={handleCountryChange}
          content={["United States"]}
        />
        <DropDown
          title={"Gender"}
          handleChange={handleGenderChange}
          content={["male", "female"]}
        />
      </div>
    </div>
  );
}
