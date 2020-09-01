import React, { Component } from "react";
import CryptoHead from "../components/crypto/crypto_head";
import CryptoNews from "../components/crypto/crypto_news";
import CryptoList from "../components/crypto/crypto_list_rates";
import Head from "next/head";
import Layout from "../layouts/main";
export class Crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crypto_head_data: {},
      crypto_head_coins: [],
    };
    this.intervalId = 0;
  }
  componentDidMount() {
    this.fetchCryptoData()
      .then((data) => {
        var Keys = Object.keys(data.DISPLAY);
        this.setState({
          crypto_head_data: data,
          crypto_head_coins: Keys,
          errorLoading: false,
        });
      })
      .catch(() => {
        this.setState({ errorLoading: true });
      });
    this.intervalId = setInterval(() => {
      this.fetchCryptoData()
        .then((data) => {
          var Keys = Object.keys(data.DISPLAY);
          this.setState({
            crypto_head_data: data,
            crypto_head_coins: Keys,
          });
        })
        .catch(() => {
          this.setState({ errorLoading: true });
        });
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  fetchCryptoData = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,LTC&tsyms=USD&api_key=${process.env.REACT_APP_CRYPTO_API_KEY}`
      )
        .then((response) => {
          return resolve(response.json());
        })
        .catch((err) => {
          return reject(err);
        });
    });
  };
  render() {
    return (
      <Layout>
        <div>
          <Head>
            <title>Crypto Currency</title>
          </Head>
          <div className="crypto">
            <div className="container">
              <div className="crypto_wrapper">
                <CryptoHead
                  crypto_head_data={this.state.crypto_head_data}
                  crypto_head_coins={this.state.crypto_head_coins}
                  errorLoading={this.state.errorLoading}
                />
              </div>
            </div>
            <CryptoList />
            <CryptoNews />
          </div>
        </div>
        <style>
          {`
          .crypto_wrapper{
            overflow:hidden;
          } `}
        </style>
      </Layout>
    );
  }
}
export default Crypto;
