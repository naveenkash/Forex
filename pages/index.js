import React from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Layout from "../layouts/main";
import CurrencyInput from "../components/currencyInput";
import CurrencyChart from "../components/currencyChart";
import CurrencyConversion from "../components/currencyConversion";
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "USD",
      to: "INR",
      hideDropDown: false,
      currencyRate: [],
      conversionFrom: "US Dollar",
      conversionTo: "Indian Rupee",
    };
  }
  setDataToState = (data) => {
    this.setState({
      from: data.quotes[0].base_currency,
      to: data.quotes[0].quote_currency,
      currencyRate: data,
    });
  };
  componentDidMount() {
    fetch(
      `https://www1.oanda.com/rates/api/v2/rates/spot.json?api_key=${process.env.REACT_APP_API_KEY_1}&base=USD&quote=INR`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setDataToState(data);
      })
      .catch((err) => {
        alert(err);
      });
  }
  setCurrencyRate = (currencyRate) => {
    this.setDataToState(currencyRate);
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
  setConversionCurrency = (currencyName) => {
    this.setState({ conversionFrom: currencyName });
  };
  setConversionCurrency2 = (currencyName) => {
    this.setState({ conversionTo: currencyName });
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
                ConversionCurr={this.setConversionCurrency}
                ConversionCurrTo={this.setConversionCurrency2}
                hideDropFromClickOnWindow={this.state.hideDropDown}
                currencyRate={this.setCurrencyRate}
              />
              <CurrencyChart from={this.state.from} to={this.state.to} />
            </div>
          </div>
          <CurrencyConversion
            conversionFrom={this.state.conversionFrom}
            conversionTo={this.state.conversionTo}
            conversionData={this.state.currencyRate}
          />
        </div>
      </Layout>
    );
  }
}
export default Home;
