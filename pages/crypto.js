import React, { Component } from "react";
import CryptoHead from "../components/crypto/crypto_head";
import CryptoNews from "../components/crypto/crypto_news";
import Head from "next/head";
import Layout from "../layouts/main";
// import {update_rate_array} from '../redux/action/crypto_head_rate_update'
// import { connect } from "react-redux";

export  class crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crypto_head_data: {},
      crypto_head_coins: [],
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
    //     var Keys = Object.keys(data.DISPLAY);
    //     this.setState({
    //       crypto_head_data: data,
    //       crypto_head_coins: Keys
    //     });
    //   });
    // }, 1300);


    // setInterval(() => {
    //   this.fetchCryptoData().then(data => {
    //     console.log(data);
    //     var Keys = Object.keys(data.DISPLAY);
    //     this.setState(
    //       {
    //         crypto_head_data: data,
    //         crypto_head_coins: Keys
    //       },
    //     );
    //   });
    // }, 10000);

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
                />
                <CryptoNews/>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
// const mapDispatchToProps = dispatch => ({
//   update_rate_array: string => dispatch(update_rate_array(string))
// });
// const mapDispatchToProps = state => {
//   return { previousArray: state.crypto_head_update.head_update_array };
// };
// export default connect(
//   null,
//   mapDispatchToProps
// )(crypto);
export default crypto;
