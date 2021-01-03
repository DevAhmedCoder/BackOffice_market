import React, { Fragment, useState } from 'react';
import { HashRouter as Switch, Link } from 'react-router-dom';

const InputUsers = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");

    // New client
    const onSubmitForm = async (e) => {
        e.preventDefault();

        setError("");

        const body = { firstname, lastname, email, age };
        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if (data === "ok") { (window.location = "/#/users"); }
        else { setError(data); }

    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">New client</h1>
            <p className="alert-danger">{error}</p>
            <form className="  p-3 m-5" onSubmit={onSubmitForm}>
                <div className="">
                    <label >Firstname</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Please put the Firstname"
                        required
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Lastname</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Please put the Lastname"
                        required
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control mb-2"
                        placeholder="Please put the Email address"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        min="16"
                        max="99"
                        className="form-control mb-2"
                        placeholder="Please put the age"
                        required
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button type="submit" className=" btn btn-success">Save</button>
                    <Link to="/users" >
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                        >Close</button>
                    </Link>
                </div>
            </form>
        </Fragment>
    )
}

export default InputUsers
