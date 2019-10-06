import React from "react";
import Link from "next/link";

// import '../styles/navbar.css'
const Nav = () => (
  <div className="navbar">
    <div className="container">
      <nav>
        <div className="logo">
          <h1>
            <Link href="/">
              <a>Currency Converter</a>
            </Link>
          </h1>
        </div>
      </nav>
    </div>
    <style jsx>
      {`
        .navbar {
          width: 100%;
          height: auto;
          padding: 10px 0;
          background: #2e4369;
        }
        .logo{
          width:auto;
        }
        nav{
          padding-left:15px;
        }
        .logo h1 a{
          color:white;
          text-decoration:none;
          font-weight:lighter;
          transition:0.2s;
          font-size:0.9em;
        }
        .logo h1 a:hover{
          color:#00B9FF;
        }
      `}
    </style>
  </div>
);

export default Nav;
