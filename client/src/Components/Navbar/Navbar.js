import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {



    return (

        <div className="col-2 container bg-dark text-white" >
            <div className="col text-center" >
                <h1 className="row  border mb-5" >
                    <Link to="/">Titre</Link>
                </h1>
                <nav className="row border ">
                    <Link to={"/clients"} ><div className="border mb-4" >Clients</div></Link>
                    <Link to="/products" ><div className="border mb-4" >Products</div></Link>
                    <Link to="/categories" ><div className="border mb-4" >Categories</div></Link>

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