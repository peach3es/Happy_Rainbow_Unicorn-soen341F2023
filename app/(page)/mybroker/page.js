"use client";
import Table from "./../../../components/CRUD - Brokers/table";
import Form from "./../../../components/CRUD - Brokers/form";
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeAction,
  deleteAction,
} from "../../../backend/redux/reducer";
import { deleteUser, getUsers } from "@/backend/lib/helper";
import { useQueryClient } from "react-query";
import { Button } from "@nextui-org/react";
import NavBar from "components/Navbar/navbar";
import Footer from "components/footer";
import styles from "styles/page.module.css";

function MyBroker() {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const deleteID = useSelector((state) => state.app.client.deleteID);
  const queryclient = useQueryClient();
  const dispatch = useDispatch();

  const handler = () => {
    dispatch(toggleChangeAction());
  };

  const deleteHandler = async () => {
    if (deleteID) {
      await deleteUser(deleteID);
      await queryclient.prefetchQuery("users", getUsers);
      await dispatch(deleteAction(null));
    }
  };

  const cancelHandler = async () => {
    await dispatch(deleteAction(null));
  };

  return (
    <section className="flex flex-col h-screen">
      <NavBar />
      <main className={`${styles.main} flex-grow`}>
        <h1 className="text-xl md:text-5xl text-center font-bold py-10">
          Broker Management (CRUD)
        </h1>

        <div className="flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <button
              onClick={handler}
              className="flex bg-black text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-black-500 hover:text-gray-800 ml-3"
            >
              Add Employee{" "}
              <span className="px-1">
                <BiUserPlus size={23}></BiUserPlus>
              </span>
            </button>
          </div>
          {deleteID ? DeleteComponent({ deleteHandler, cancelHandler }) : <></>}
        </div>

        {visible ? <Form></Form> : <></>}

        <div>
          <Table></Table>
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default MyBroker;

function DeleteComponent({ deleteHandler, cancelHandler }) {
  return (
    <>
      <div className="fixed z-10 inset-0 bg-black opacity-50"></div>
      <div className="fixed z-20 inset-0 flex items-center justify-center">
        <div className="relative bg-white rounded-md shadow-lg max-w-lg w-full">
          <div className="border-b p-4 text-xl font-semibold">
            Delete Confirmation
          </div>
          <div className="p-4">
            <p>Are you sure you want to delete this broker?</p>
          </div>
          <div className="flex justify-end p-4 border-t">
            <button
              onClick={cancelHandler}
              className="mr-4 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={deleteHandler}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}