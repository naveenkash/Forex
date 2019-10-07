import React from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Layout from "../layouts/main";
import CurrencyInput from "../components/currencyInput";
// import '../styles/navbar.css'
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "USD",
      to: "INR",
    };
  }
  UNSAFE_componentWillMount() {
    fetch(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=INR&apikey=IDJHD0SY07N08B02`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState(
          {
            from:
              data["Realtime Currency Exchange Rate"]["1. From_Currency Code"],
            to: data["Realtime Currency Exchange Rate"]["3. To_Currency Code"]
          }
        );
      });
  }
  setCurrencyRate = currencyRate => {
    this.setState({
        from: currencyRate["Realtime Currency Exchange Rate"]["1. From_Currency Code"],
        to: currencyRate["Realtime Currency Exchange Rate"]["3. To_Currency Code"]
    }, () => {
    });
  };
  render() {
    return (
      <Layout>
        <div>
          <Head>
            <title>Currency Converter</title>
          </Head>
          <div className="converter">
            <div className="container">
              <div className="curr_head">
                <h1>
                  <span className="from">{this.state.from} </span>
                  <span className="tomid">to</span>{" "}
                  <span className="to">{this.state.to}</span>
                </h1>
              </div>
              <CurrencyInput currencyRate={this.setCurrencyRate} />
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
  }
}
// Home.getInitialProps = async () => {
//   const res = await fetch(
//     "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=INR&apikey=IDJHD0SY07N08B02"
//   );
//   const data = await res.json();
//   return { data };
// };
export default Home;
