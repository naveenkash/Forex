import React from "react";
import Head from "next/head";
import Nav from "../components/nav";

import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux";
// import '../styles/navbar.css'

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
            rel="stylesheet"
          ></link>
        </Head>

        <Nav />
        {this.props.children}
        <style jsx global>{`
      body {
        font-family: "Noto Sans", sans-serif;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
      }
      h3{
        
        font-weight:lighter;
        font-family:'Poppins', sans-serif ;       
        }
      .container {
        width: 1100px;
        margin: 0 auto;
      }
      .development{
        margin:50px 0;
        text-align:center;
      }
      .title_head{
        margin-bottom:25px;
    }
    .title_head h1{
        // color:#36c8ff;
        font-weight:lighter;
        font-size:26px;
    }
      .row{
        display:flex;
        align-items:center;
      }
      .currency_conversion_error{
        
        width: 100%;
        margin: 0 auto;
        padding:60px 0;
      }
      .green{
        color:#00bf33 !important;
      }
      .red{
        color:red !important;
      }
      .loadingError{
        justify-content:center;
      }
      .chart_error{
        color:white;
        height:150px;
      }
     
      .loading {
        width: 100%;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
       
      .loading svg {
        animation: 2s linear infinite svg-animation;
        width: 100px;
        height: 100px;
      }

      // SVG animation.
      @keyframes svg-animation {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }

      // Circle styles.
      .loading svg circle {
        animation: 1.4s ease-in-out infinite both circle-animation;
        display: block;
        fill: transparent;
        stroke: #2ed06e;
        stroke-linecap: round;
        stroke-dasharray: 283;
        stroke-dashoffset: 280;
        stroke-width: 5px;
        transform-origin: 50% 50%;
      }

      // Circle animation.
      @keyframes circle-animation {
        0%,
        25% {
          stroke-dashoffset: 280;
          transform: rotate(0);
        }

        50%,
        75% {
          stroke-dashoffset: 75;
          transform: rotate(45deg);
        }

        100% {
          stroke-dashoffset: 280;
          transform: rotate(360deg);
        }
      
        }
        @media only screen and (max-width:1150px){
          .container{
            width:100%;
            padding:0 15px;
          }

    `}</style>
      </div>
    );
  }
}
