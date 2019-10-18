import React, { Component } from "react";
import CryptoHead from "../components/crypto/crypto_head";
import Head from "next/head";
import Layout from "../layouts/main";
export class crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crypto_head_data: {},
      Crypto_Head_Coins: []
    };
  }
  componentDidMount() {
    this.fetchCryptoData().then(data => {
      console.log(data);
      var Keys = Object.keys(data.DISPLAY);
      this.setState({
        crypto_head_data: data,
        Crypto_Head_Coins: Keys
      });
    });
    setInterval(() => {
      this.fetchCryptoData().then(data => {
        console.log(data);
        var Keys = Object.keys(data.DISPLAY);
        this.setState({
          crypto_head_data: data,
          Crypto_Head_Coins: Keys
        });
      });
    }, 1300);
  }
  fetchCryptoData = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,LTC&tsyms=USD&api_key=${process.env.CRYPTO_API_KEY}`
      )
        .then(response => {
          return resolve(response.json());
        })
        .catch(err => {
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
                  crypto_head_coins={this.state.Crypto_Head_Coins}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default crypto;
