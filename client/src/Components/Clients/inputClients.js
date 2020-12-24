import React, { Fragment, useState} from 'react';
import { HashRouter as Switch, Link } from 'react-router-dom'

const InputClients = () => {

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [age, setage] = useState("")

    // New client
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { firstName, lastName, email, age };
            fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/#/clients"

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">New client</h1>

            <form className="  p-3 m-5" onSubmit={onSubmitForm}>
                <div className="">
                    <label >FirstName</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Please put the Firstname"
                        required
                        value={firstName}
                        onChange={e => setfirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>LastName</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Please put the Lastname"
                        required
                        value={lastName}
                        onChange={e => setlastName(e.target.value)}
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
                        onChange={e => setemail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        min="0"
                        className="form-control mb-2"
                        placeholder="Please put the age"
                        required
                        value={age}
                        onChange={e => setage(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button type="submit" className=" btn btn-success">Save</button>
                    <Link to="/clients" > <button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"

                    >Close</button></Link>
                </div>
            </form>
        </Fragment>
    )
}

export default InputClients
