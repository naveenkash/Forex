import React, { Component } from "react";
import Slider from "react-slick";
import Head from "next/head";
export class CryptoLiveHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate_updated: [],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.crypto_head_data === nextProps.crypto_head_data) {
      return;
    }
    if (this.props.crypto_head_data !== nextProps.crypto_head_data) {
      let rate_updated = [];
      for (let i = 0; i < this.props.crypto_head_coins.length; i++) {
        var coin = this.props.crypto_head_coins[i];
        if (
          nextProps.crypto_head_data.DISPLAY[coin].USD.PRICE >
          this.props.crypto_head_data.DISPLAY[coin].USD.PRICE
        ) {
          rate_updated[i] = true;
        } else if (
          nextProps.crypto_head_data.DISPLAY[coin].USD.PRICE ===
          this.props.crypto_head_data.DISPLAY[coin].USD.PRICE
        ) {
          rate_updated[i] = null;
        } else {
          rate_updated[i] = false;
        }
      }
      this.setState({ rate_updated });
    }
  }
  GetClass = (i) => {
    if (!document.querySelectorAll(".crypto_rate p")[i]) {
      return "green";
    }
    return document.querySelectorAll(".crypto_rate p")[i].className;
  };

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 901,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 667,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
      ],
    };
    return (
      <div className="crypto_live_head">
        <Head>
          <link
            rel="stylesheet"
            href="../static\styles\cryptoHead\cryptoHead.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Head>
        <div className="crypto_head_wrapper">
          {(() => {
            if (this.props.errorLoading) {
              return <p className="loadingError">Error Loading...</p>;
            } else {
              return (
                <>
                  <Slider {...settings}>
                    {this.props.crypto_head_coins.map((coin, i) => {
                      return (
                        <div key={coin} className="crypto_head">
                          <div className="crypto_rate_head row">
                            <img
                              src={`https://www.cryptocompare.com${this.props.crypto_head_data.DISPLAY[coin].USD.IMAGEURL}`}
                              alt=""
                            />{" "}
                            <span>
                              {coin} -{" "}
                              {Object.keys(
                                this.props.crypto_head_data.DISPLAY[coin]
                              )}
                            </span>
                          </div>

                          <div className="crypto_rate row">
                            <p
                              className={
                                this.state.rate_updated[i] === true
                                  ? "green"
                                  : this.state.rate_updated[i] === null
                                  ? this.GetClass(i)
                                  : this.state.rate_updated[i] === false
                                  ? "red"
                                  : "green"
                              }
                            >
                              {
                                this.props.crypto_head_data.DISPLAY[coin].USD
                                  .PRICE
                              }
                            </p>
                            <span className="head_pct_chg">
                              (
                              {
                                this.props.crypto_head_data.DISPLAY[coin].USD
                                  .CHANGEPCT24HOUR
                              }
                              %)
                            </span>
                          </div>
                          <span className="crypto_head_vol">
                            VOL :{" "}
                            {
                              this.props.crypto_head_data.DISPLAY[coin].USD
                                .VOLUME24HOUR
                            }
                          </span>
                        </div>
                      );
                    })}
                  </Slider>
                </>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}
export default CryptoLiveHead;
