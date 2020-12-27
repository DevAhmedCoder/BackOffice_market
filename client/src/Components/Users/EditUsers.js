import React, { Fragment, useState, useEffect } from 'react';
import { HashRouter as Switch, Link } from 'react-router-dom';

const EditUsers = (props) => {

    const id = props.match.params.id;

    const [user, setUser] = useState("");
    const [error, setError] = useState("");

    // Show user
    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/${id}`);
            const jsonData = await response.json();
            setUser(jsonData[0]);
        }
        catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
     
        getUser();
    }, []);

    useEffect(() => {
 
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setEmail(user.email);
        setAge(user.age);

    }, [user]);


    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [age, setAge] = useState(user.age);



    // edit description 
    const updateUser = async (e) => {
        e.preventDefault();

        const body = { firstname, lastname, email, age };
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (data === "ok") { (window.location = "/#/users"); }
        else { setError(data); }
    }

    return (
        <Fragment>
            <div className="mt-2 p-5">

                <h4 className="text-center mb-5">Edit user</h4>
                <p className="alert-danger">{error}</p>
                <div className="mb-4" >
                    <label>Firstname:</label>
                    <input type="text"
                        className="form-control mt-2"
                        placeholder="Please put the Firstname"
                        required
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                    />
                </div>
                <div className="mb-4"  >
                    <label>Lastname: </label>
                    <input type="text"
                        className="form-control mt-2"
                        placeholder="Please put the Lastname"
                        required
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                    />
                </div>
                <div className="mb-4" >
                    <label>Email: </label>
                    <input type="email"
                        className="form-control mt-2"
                        placeholder="Please put the Email address"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <label>Age: </label>
                <input type="number"
                    className="form-control mt-2"
                    placeholder="Please put the age"
                    required
                    value={age}
                    min="16"
                    max="99"
                    onChange={e => setAge(e.target.value)}
                />

                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={e => updateUser(e)}
                    >Save</button>

                    <Link to="/users" ><button
                        type="button"
                        className="btn btn-danger"
                    >Close</button></Link>
                </div>

            </div>
        </Fragment>
    )
}

export default EditUsers;
