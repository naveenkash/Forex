import React from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Layout from "../layouts/main";
import CurrencyInput from "../components/currencyInput";
import CurrencyChart from "../components/currencyChart";
import CurrencyConversion from "../components/currencyConversion";
// import '../styles/navbar.css'
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "USD",
      to: "INR",
      hideDropDown: false,
      currencyRate: []
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
        this.setState({
          from:
          data["Realtime Currency Exchange Rate"]["1. From_Currency Code"],
          to: data["Realtime Currency Exchange Rate"]["3. To_Currency Code"],
          currencyRate: data
        });
      })
      .catch(err => {
        alert(err);
      });
  }
  setCurrencyRate = currencyRate => {

    this.setState(
      {
        from:
          currencyRate["Realtime Currency Exchange Rate"][
            "1. From_Currency Code"
          ],
        to:
          currencyRate["Realtime Currency Exchange Rate"][
            "3. To_Currency Code"
          ],
        currencyRate: currencyRate
      },
      () => {}
    );
  };
  hidePanel = () => {
    var panel_input = document.getElementsByClassName("panel_input");
    var panel_drop_option = document.getElementsByClassName(
      "panel_drop_option"
    );
    for (let i = 0; i < panel_input.length; i++) {
      const element = panel_input[i];
      if (element.classList.contains("activeFocus")) {
        element.classList.remove("activeFocus");
      }
    }
    for (let i = 0; i < panel_drop_option.length; i++) {
      const element = panel_drop_option[i];
      if (element.classList.contains("activeFocus")) {
        element.classList.remove("activeFocus");
      }
    }
  };
  render() {
    return (
      <Layout>
        <div>
          <Head>
            <title>Currency Converter</title>
          </Head>
          <div className="converter" onClick={this.hidePanel}>
            <div className="container">
              <div className="curr_head">
                <h1>
                  <span className="from">{this.state.from} </span>
                  <span className="tomid">to</span>
                  <span className="to"> {this.state.to}</span>
                </h1>
              </div>
              <CurrencyInput
                hideDropFromClickOnWindow={this.state.hideDropDown}
                currencyRate={this.setCurrencyRate}
              />
              <CurrencyChart from={this.state.from} to={this.state.to} />
            </div>
          </div>
          <CurrencyConversion conversionData={this.state.currencyRate} />
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
              .activeHover {
                border-color: #829ca9 !important;
              }
              .activeFocus {
                border-color: #17bfff !important;
              }
              .normalBorder {
                border-color: #d3d5d8;
              }
              @media only screen and (max-width:991px){
                .converter{
                  padding-top:40px;
                }
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
