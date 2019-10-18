import React from "react";
import Link from "next/link";

// import '../styles/navbar.css'
const Nav = () => (
  <div className="navbar">
    <div className="container">
      <nav>
        <div className="nav_item">
          <ul>
            <li>
              <Link href="/">
                <a>Currency Converter</a>
              </Link>
            </li>
            <li>
              <Link href="/crypto">
                <a>Crypto</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <style jsx>
      {`
        .navbar {
          width: 100%;
          height: auto;
          background: #2e4369;
        }
        .nav_item {
          width: auto;
        }
        nav {
          padding-left: 15px;
        }
        .nav_item ul {
          padding: 0;
          margin: 0;
          list-style: none;
          display:flex;
          align-items:center;
        }
        .nav_item ul li {
          font-size: 24px;
          margin-right:12px;
          padding:10px 0;
          font-family:'Poppins', sans-serif ;     
        }
        .nav_item ul li a {
          color: white;
          text-decoration: none;
          font-weight: lighter;
          transition: 0.2s;
          font-size: 0.9em;
          padding:10px 0;
        }
        .nav_item ul li a:hover {
          color: #00b9ff;
        }
      `}
    </style>
  </div>
);

export default Nav;
