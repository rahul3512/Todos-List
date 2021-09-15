import React, { useState, useEffect } from "react";
import Bg from '../Assets/Bg'
import Navbar from "./navbar";
import { app } from "../server"
import { useAlert } from "react-alert";




function Edit(props) {
    const alert = useAlert();
    const [item, setItem] = useState("");
    const [desc, setDesc] = useState("");
    var email = localStorage.getItem("email");

    var id = props.location.state;
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
        app.post('/getOne', { email, id }).then(succ => {

            setItem(succ.data.item);
            setDesc(succ.data.desc);
            setExtra({ ...extra, loading: false });

        })

    }

    function update() {
        if (item === '') {
            alert.show("Item name not be empty !", {
                type: 'error',
                timeout: '2000'
            });
        } else if (desc === '') {
            alert.show("Description not be empty !", {
                type: "error",
                timeout: "2000",
            });
        }
        else {
            setExtra({ ...extra, loading: true });
            app.post('/update', {
                email,
                id,
                item,
                desc
            }).then(function (res) {
                if (res.data.success === "true") {
                    getData();

                    setExtra({ ...extra, loading: false });
                    alert.show("Updated", {
                        type: 'success',
                        timeout: '2000'
                    });

                } else {

                    alert.show("Internal server down", {
                        type: 'error',
                        timeout: '2000'
                    });
                }
            })
        }
    }


    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Bg />
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    {Loader()}
                </div>
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

                        <button className="btn btn-success mt-3 " onClick={update}>
                            Update Todo
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Edit;
