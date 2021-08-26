import React, { useState, useEffect } from "react";
import { app } from "../server";
import { Link, Router, Route } from "react-router-dom";
import { useAlert } from "react-alert";

function Todo(props) {
  const alert = useAlert();
  const [item, setItem] = useState("");
  const [desc, setDesc] = useState("");

  const [todos, setTodos] = useState([]);

  const [extra, setExtra] = useState({
    loading: false,
    updated: false,
    deleted: false,
  });

  function Loader() {
    return (
      <>
        {extra.loading ? (
          <div
            class="spinner-border text-primary text-center m-auto"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        ) : null}
      </>
    );
  }
  function getData() {
    setExtra({ ...extra, loading: true });
    app.get("/get").then((succ) => {
      setTodos(succ.data);
      setExtra({ ...extra, loading: false });
    });
  }

  function save() {
    if (item === "") {
      alert.show("Item name not be empty !", {
        type: "error",
        timeout: "2000",
      });
    } else if (desc === "") {
      alert.show("Description not be empty !", {
        type: "error",
        timeout: "2000",
      });
    } else {
      app
        .post("/insert", {
          item,
          desc,
        })
        .then(function (res) {
          if (res.data.success === "true") {
            setItem("");
            setDesc("");
            getData();
            alert.show("Inserted", {
              type: "success",
              timeout: "3000",
            });
          } else {
            alert(`Something Wrong,, error is ${res.data.err}`);
          }
        });
    }
  }
  function deleteItem(id) {
    setExtra({ ...extra, loading: true });
    app
      .post("/delete", { id })
      .then((resp) => {
        if (resp.data.successCode === 200) {
          getData();
          setExtra({ ...extra, loading: false });
          alert.show("Deleted", {
            type: "success",
            timeout: "3000",
          });
        } else {
          alert(`Somthing wrong with error : ${resp.data.err}`);
        }
      })
      .catch(() => {
        setExtra({ ...extra, loading: false });
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">{Loader()}</div>
      {/* ---------- add a todo item --------------*/}
      <div className="row">
        <div className="form-group col">
          <label htmlFor="todoHead" className="font-weight-bold h4">
            Todo Item
          </label>
          <input
            type="text"
            className="form-control"
            id="todoHead"
            value={item}
            onChange={(e) => {
              setItem(e.target.value);
            }}
          />

          <label htmlFor="todoDesc" className="h5 mt-3 font-weight-bold">
            Desc
          </label>
          <input
            type="text"
            className="form-control"
            id="todoDesc"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />

          <button className="btn btn-primary mt-3 " onClick={save}>
            <i class="fas fa-plus"></i>
            Add Todo
          </button>
        </div>
      </div>

      {/* ----------------Todos list -------------------------- */}
      <div className="row mt-5">
        <div className="col">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Todo Name</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="text-light">
              {todos.map((row) => (
                <tr key={row._id}>
                  <td className="font-weight-bold">{row.item}</td>
                  <td> {row.desc}</td>
                  <td>
                    <Link
                      to={{
                        pathname: "/edit",
                        state: row._id,
                      }}
                    >
                      <i class="fas fa-pencil-alt"></i>
                    </Link>
                  </td>
                  <td>
                    <i
                      onClick={() => deleteItem(row._id)}
                      class="fas fa-trash-alt btn btn-danger"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Todo;
