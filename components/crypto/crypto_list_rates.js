import React, { Component } from "react";
import CryptoCoin from "./crypto_coin_info";
import Head from "next/head";
export class crypto_list_rates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptoList: [],
      keys: [],
      coinHeads: [
        "Coin",
        "Price",
        "Total Vol",
        "Top Tier Vol",
        "Market Cap",
        "Chg.24H",
        "Vol 24H"
      ],
      errorLoading: false
    };
  }
  componentDidMount() {
    this.fetchCryptoList()
      .then(data => {
        var keys = Object.keys(data.DISPLAY);
        var tempArr = [];
        for (let i = 0; i < keys.length; i++) {
          const element = data.DISPLAY[keys[i]];
          tempArr.push({ [keys[i]]: element });
        }
        this.setState({ cryptoList: tempArr, keys, errorLoading:false });
      })
      .catch(err => {
        this.setState({ errorLoading:true });
      });
    setInterval(() => {
      this.fetchCryptoList()
        .then(data => {
          var keys = Object.keys(data.DISPLAY);
          var tempArr = [];
          for (let i = 0; i < keys.length; i++) {
            const element = data.DISPLAY[keys[i]];
            tempArr.push({ [keys[i]]: element });
          }
          this.setState({ cryptoList: tempArr, keys, errorLoading:false });
        })
        .catch(err => {
          this.setState({ errorLoading:true });
        });
    }, 6000);
  }
  fetchCryptoList = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,XRP,EOS,OKB,TRX,LINK,XMR,BCH&tsyms=USD&api_key=${process.env.CRYPTO_API_KEY}`
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
      <>
       <Head>
          <link
            rel="stylesheet"
            href="../static\styles\cryptoListRates\cryptoListRates.css"
          />
        </Head>
        <div className="title_head">
          <div className="container">
            <h1>Rates</h1>
          </div>
        </div>
        <div className="crypto_list">
          <div className="container">
            {(() => {
              if (this.state.errorLoading) {
                return <p className="loadingError">Error Loading...</p>;
              } else {
                return (
                  <div className="crypto_list_wrapper">
                    <div className="coin_head_wrapper row">
                      {this.state.coinHeads.map(head => (
                        <div key={head} className="coin_head">
                          <span>{head}</span>
                        </div>
                      ))}
                    </div>
                    <CryptoCoin
                      cryptoList={this.state.cryptoList}
                      keys={this.state.keys}
                    />
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </>
    );
  }
}

export default crypto_list_rates;
