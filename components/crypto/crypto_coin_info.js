import React, { Component } from "react";

export class crypto_coin_info extends Component {
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
                <span>{coin[this.props.keys[i]].USD.PRICE}</span>
              </div>
            </div>
            <div className="total_vol_24 coin_detail">
              <div className="coin_total_vol">
                <span> {coin[this.props.keys[i]].USD.TOTALVOLUME24HTO}</span>
              </div>
            </div>
            <div className="total_toptier_24 coin_detail">
              <div className="coin_total_toptier">
                <span>
                  {coin[this.props.keys[i]].USD.TOTALTOPTIERVOLUME24HTO}
                </span>
              </div>
            </div>
            <div className="market_cap coin_detail">
              <div className="m_cap">
                <span>{coin[this.props.keys[i]].USD.MKTCAP}</span>
              </div>
            </div>
            <div className="change_pct coin_detail">
              <div className="pct_change">
                <span> {coin[this.props.keys[i]].USD.CHANGEPCT24HOUR}%</span>
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
