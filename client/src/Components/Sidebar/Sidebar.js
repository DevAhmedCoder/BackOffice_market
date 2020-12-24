import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {



    return (

        <div className="col-2 container bg-dark text-white " >
            <div className="col text-center" >
                <h1 className="row  mb-5" >
                    <Link to="/" className="text-decoration-none text-white" >Titre</Link>
                </h1>
                <nav className="row  ">
                    <Link to={"/clients"} className="text-decoration-none text-white"><div className="border mb-4" >Clients</div></Link>
                    <Link to="/products" className="text-decoration-none text-white"><div className="border mb-4" >Products</div></Link>
                    <Link to="/categories" className="text-decoration-none text-white"><div className="border mb-4" >Categories</div></Link>

                </nav>
            </div>
        </div>


    )
}

export default Navbar;

{/* <div classNameName="container border w-25 p-3 vh-100 d-inline-block bg-dark text-white ">
                <h1 classNameName="border text-center mb-5">Titre</h1>
            <nav>
                <div>Clients</div>
                <div>Categories</div>
                <div>Products</div>
            </nav>

            </div> */}
{/*  */ }