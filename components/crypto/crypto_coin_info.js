import React, { Component } from "react";

export class crypto_coin_info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate_updated: []
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.cryptoList === nextProps.cryptoList) {
      return;
    }
    if (this.props.cryptoList !== nextProps.cryptoList) {
      if (this.props.cryptoList.length <= 0) {//checking if crypto list array is empty 
        var arr = [];
        for (let i = 0; i < nextProps.keys.length; i++) {
          arr.splice(i, 0, []);
          this.setState({ rate_updated: arr });
        }
        return;
      }
      let rate_updated = [];
      var update_rate_array = [];
      for (let i = 0; i < nextProps.keys.length; i++) {
        var coin = nextProps.keys[i];
        update_rate_array.splice(i, 0, []);
        rate_updated = update_rate_array;

        //checking if price updated
        if (
          nextProps.cryptoList[i][coin].USD.PRICE >
          this.props.cryptoList[i][coin].USD.PRICE
        ) {
          rate_updated[i][0] = true; // rate_updated[i][0] = rate_updated
        } else if (
          nextProps.cryptoList[i][coin].USD.PRICE ===
          this.props.cryptoList[i][coin].USD.PRICE
        ) {
          rate_updated[i][0] = null;
        } else {
          rate_updated[i][0] = false;
        }
        // checking if total vol 24hr updated
        if (
          nextProps.cryptoList[i][coin].USD.TOTALVOLUME24HTO >
          this.props.cryptoList[i][coin].USD.TOTALVOLUME24HTO
        ) {
          rate_updated[i][1] = true;
        } else if (
          nextProps.cryptoList[i][coin].USD.TOTALVOLUME24HTO ===
          this.props.cryptoList[i][coin].USD.TOTALVOLUME24HTO
        ) {
          rate_updated[i][1] = null;
        } else {
          rate_updated[i][1] = false;
        }
        // checking if total top tier 24hr updated
        if (
          nextProps.cryptoList[i][coin].USD.TOTALTOPTIERVOLUME24HTO >
          this.props.cryptoList[i][coin].USD.TOTALTOPTIERVOLUME24HTO
        ) {
          rate_updated[i][2] = true;
        } else if (
          nextProps.cryptoList[i][coin].USD.TOTALTOPTIERVOLUME24HTO ===
          this.props.cryptoList[i][coin].USD.TOTALTOPTIERVOLUME24HTO
        ) {
          rate_updated[i][2] = null;
        } else {
          rate_updated[i][2] = false;
        }
        // checking if market cap updated
        if (
          nextProps.cryptoList[i][coin].USD.MKTCAP >
          this.props.cryptoList[i][coin].USD.MKTCAP
        ) {
          rate_updated[i][3] = true;
        } else if (
          nextProps.cryptoList[i][coin].USD.MKTCAP ===
          this.props.cryptoList[i][coin].USD.MKTCAP
        ) {
          rate_updated[i][3] = null;
        } else {
          rate_updated[i][3] = false;
        }
        // checking if percentage change 24hr updated
        if (
          nextProps.cryptoList[i][coin].USD.CHANGEPCT24HOUR >
          this.props.cryptoList[i][coin].USD.CHANGEPCT24HOUR
        ) {
          rate_updated[i][4] = true;
        } else if (
          nextProps.cryptoList[i][coin].USD.CHANGEPCT24HOUR ===
          this.props.cryptoList[i][coin].USD.CHANGEPCT24HOUR
        ) {
          rate_updated[i][4] = null;
        } else {
          rate_updated[i][4] = false;
        }
          // checking if volume  24hr updated
        if (
          nextProps.cryptoList[i][coin].USD.VOLUME24HOURTO >
          this.props.cryptoList[i][coin].USD.VOLUME24HOURTO
        ) {
          rate_updated[i][5] = true;
        } else if (
          nextProps.cryptoList[i][coin].USD.VOLUME24HOURTO ===
          this.props.cryptoList[i][coin].USD.VOLUME24HOURTO
        ) {
          rate_updated[i][5] = null;
        } else {
          rate_updated[i][5] = false;
        }
      }
      //   this.props.update_rate_array(rate_updated);
      this.setState({ rate_updated });
    }
  }
  getPriceClass = i => {
    if (!document.querySelectorAll(".coin_price span")[i]) {
      return "green";
    }
    return document.querySelectorAll(".coin_price span")[i].className;
  };
  getTotalVolClass = i => {
    if (!document.querySelectorAll(".coin_total_vol span")[i]) {
      return "green";
    }
    return document.querySelectorAll(".coin_total_vol span")[i].className;
  };
  getTotalTopTierClass = i => {
    if (!document.querySelectorAll(".coin_total_toptier span")[i]) {
      return "green";
    }
    return document.querySelectorAll(".coin_total_toptier span")[i].className;
  };
  getMarketCapClass = i => {
    if (!document.querySelectorAll(".m_cap span")[i]) {
      return "green";
    }
    return document.querySelectorAll(".m_cap span")[i].className;
  };
  getPctChangeClass = i => {
    if (!document.querySelectorAll(".pct_change span")[i]) {
      return "green";
    }
    return document.querySelectorAll(".pct_change span")[i].className;
  };
  getVol24HourClass = i => {
    if (!document.querySelectorAll(".vol_24_hour span")[i]) {
      return "green";
    }
    return document.querySelectorAll(".vol_24_hour span")[i].className;
  };
  render() {
    return (
      <>
        {this.props.cryptoList.map((coin, i) => (
          <div
            key={coin[this.props.keys[i]].USD.LASTTRADEID}
            className="crypto_coin_info row"
          >
            <div className="coin_detail row">
              <div className="coin_image">
                <img
                  src={`https://www.cryptocompare.com${coin[this.props.keys[i]].USD.IMAGEURL}`}
                  alt=""
                />
              </div>
              <div className="coin_name">
                <span>{[this.props.keys[i]]}</span>
              </div>
            </div>
            <div className="coin_detail">
              <div className="coin_price">
                <span
                  className={
                    this.state.rate_updated[i][0] === true
                      ? "green"
                      : this.state.rate_updated[i][0] === null
                      ? this.getPriceClass(i)
                      : this.state.rate_updated[i][0] === false
                      ? "red"
                      : "green"
                  }
                >
                  {coin[this.props.keys[i]].USD.PRICE}
                </span>
              </div>
            </div>
            <div className="total_vol_24 coin_detail">
              <div className="coin_total_vol">
                <span
                  className={
                    this.state.rate_updated[i][1] === true
                      ? "green"
                      : this.state.rate_updated[i][1] === null
                      ? this.getTotalVolClass(i)
                      : this.state.rate_updated[i][1] === false
                      ? "red"
                      : "green"
                  }
                >
                  {coin[this.props.keys[i]].USD.TOTALVOLUME24HTO}
                </span>
              </div>
            </div>
            <div className="total_toptier_24 coin_detail">
              <div className="coin_total_toptier">
                <span
                  className={
                    this.state.rate_updated[i][2] === true
                      ? "green"
                      : this.state.rate_updated[i][2] === null
                      ? this.getTotalTopTierClass(i)
                      : this.state.rate_updated[i][2] === false
                      ? "red"
                      : "green"
                  }
                >
                  {coin[this.props.keys[i]].USD.TOTALTOPTIERVOLUME24HTO}
                </span>
              </div>
            </div>
            <div className="market_cap coin_detail">
              <div className="m_cap">
                <span
                  className={
                    this.state.rate_updated[i][3] === true
                      ? "green"
                      : this.state.rate_updated[i][3] === null
                      ? this.getMarketCapClass(i)
                      : this.state.rate_updated[i][3] === false
                      ? "red"
                      : "green"
                  }
                >
                  {coin[this.props.keys[i]].USD.MKTCAP}
                </span>
              </div>
            </div>
            <div className="change_pct coin_detail">
              <div className="pct_change">
                <span
                  className={
                    this.state.rate_updated[i][4] === true
                      ? "green"
                      : this.state.rate_updated[i][4] === null
                      ? this.getPctChangeClass(i)
                      : this.state.rate_updated[i][4] === false
                      ? "red"
                      : "green"
                  }
                >
                  {coin[this.props.keys[i]].USD.CHANGEPCT24HOUR}%
                </span>
              </div>
            </div>
            <div className="vol_24 coin_detail">
              <div className="vol_24_hour">
                <span
                  className={
                    this.state.rate_updated[i][5] === true
                      ? "green"
                      : this.state.rate_updated[i][5] === null
                      ? this.getPctChangeClass(i)
                      : this.state.rate_updated[i][5] === false
                      ? "red"
                      : "green"
                  }
                >
                  {coin[this.props.keys[i]].USD.VOLUME24HOURTO}
                </span>
              </div>
            </div>
            <style>{`
            .crypto_coin_info{
                width:100%;
                height:auto;
                background:white;
                transition:0.3s;
                border-top:1px solid #ebebeb;
                
            }
            .crypto_coin_info:hover{
                background:#ECF3FD;
            }
            .coin_detail{
                padding:15px;
                width:14.2%;
            }
               .coin_image {
                    width:25px;
                    height:25px;
                    margin-right:8px;
                        }
                        .coin_image img{
                            width:100%;
                            height:100%;
                            object-fit:cover;

                        }
                        .coin_detail span{
                            font-size:15px;
                        }
                    `}</style>
          </div>
        ))}
      </>
    );
  }
}

export default crypto_coin_info;
