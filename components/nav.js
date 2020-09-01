import React from "react";
import Link from "next/link";
import Head from "next/head";
const Nav = () => (
  <>
    <Head>
      <link rel="stylesheet" href="../static/styles/navbar/navbar.css" />
    </Head>
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
    </div>
  </>
);

export default Nav;
