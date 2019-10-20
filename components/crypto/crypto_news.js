import React, { Component } from "react";

export class crypto_news extends Component {
  componentDidMount() {
    this.fetchCryptoNews().then((data)=>{
        console.log(data);
        
    })
  }
  fetchCryptoNews = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${process.env.CRYPTO_API_KEY}`
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
    return <div>
        
    </div>;
  }
}

export default crypto_news;
