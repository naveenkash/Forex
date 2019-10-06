import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
// import '../styles/navbar.css'
const Main = props => (
  <div>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Sans&display=swap"
        rel="stylesheet"
      ></link>
      <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet"></link>
    </Head>
    <style jsx global>{`
      body {
        font-family: "Noto Sans", sans-serif;
       
      }
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      h1,h2,h3,h4,h5,h6{
          margin:0;
      }
      .container {
        width: 1100px;
        margin: 0 auto;
      }
    `}</style>
      <Nav />
      {props.children}
    </div>
);

export default Main;
