import React, { Component } from "react";
import CryptoHead from "../components/crypto/crypto_head";
import Head from "next/head";
import Layout from "../layouts/main";
import {update_rate_array} from '../redux/action/crypto_head_rate_update'
import { connect } from "react-redux";

export  class crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crypto_head_data: {},
      crypto_head_coins: [],
      rate_updated: []
    };
  }
  componentDidMount() {
    
    this.fetchCryptoData().then(data => {
      var Keys = Object.keys(data.DISPLAY);
      this.setState({
        crypto_head_data: data,
        crypto_head_coins: Keys
      });
    });
    // setInterval(() => {
    //   this.fetchCryptoData().then(data => {
    //     console.log(data);

    //     var Keys = Object.keys(data.DISPLAY);
    //     this.setState({
    //       crypto_head_data: data,
    //       crypto_head_coins: Keys
    //     });
    //   });
    // }, 1300);
    setInterval(() => {
      this.fetchCryptoData().then(data => {
        console.log(data);
        var Keys = Object.keys(data.DISPLAY);
        this.setState(
          {
            crypto_head_data: data,
            crypto_head_coins: Keys
          },
          () => {
            //   // this.props.update_array([]);
            let rate_updated = [true, true, true, true];
            for (let i = 0; i < Keys.length; i++) {
              var coin = Keys[i];
              if (
                data.DISPLAY[coin].USD.PRICE >
                this.state.crypto_head_data.DISPLAY[coin].USD.PRICE
              ) {
                rate_updated[i] = true;
              } else if (
                data.DISPLAY[coin].USD.PRICE ===
                this.state.crypto_head_data.DISPLAY[coin].USD.PRICE
              ) {
                rate_updated[i] = null;
              } else {
                rate_updated[i] = false;
              }
            }

            this.props.firstAction(rate_updated);
            // this.props.store.dispatch(update_rate_array(rate_updated))
            this.setState({ rate_updated });
          }
        );
      });
    }, 1300);
    // }
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
                  crypto_head_coins={this.state.crypto_head_coins}
                  rate_updated={this.state.rate_updated}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  update_rate_array: string => dispatch(update_rate_array(string))
});
export default connect(
  null,
  mapDispatchToProps
)(crypto);
// export default crypto;
