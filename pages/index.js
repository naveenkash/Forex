import React from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Layout from "../layouts/main";
import CurrencyInput from "../components/currencyInput";
// import '../styles/navbar.css'
const Home = props => (
  <Layout>
    <div>
      <Head>
        <title>Currency Converter</title>
      </Head>
      {console.log(props.data["Realtime Currency Exchange Rate"]["1. From_Currency Code"])}
      {console.log(props.data)}

      <div className="converter">
        <div className="container">
          <div className="curr_head">
            <h1>
              <span className="from">{props.data["Realtime Currency Exchange Rate"]["1. From_Currency Code"]} </span>
              <span className="tomid">to</span> <span className="to">{props.data["Realtime Currency Exchange Rate"]["3. To_Currency Code"]}</span>
            </h1>
          </div>
          <CurrencyInput/>
        </div>
      </div>
      <style jsx>
        {`
          .converter {
            background: #37517e;
            width: 100%;
            height: auto;
            padding: 60px 0 20px;
          }
          .curr_head {
            width: auto;
          }
          .curr_head h1 {
            font-size: 2.6em;
            color: white;
            font-family: "Poppins", sans-serif;
            letter-spacing: 1px;
          }
        `}
      </style>
    </div>
  </Layout>
);
Home.getInitialProps = async () => {
  const res = await fetch(
    "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=INR&apikey=IDJHD0SY07N08B02"
  );
  const data = await res.json();
  return { data };
};
export default Home;
