import React, { Component } from "react";
import update_array from "../../redux/action/crypto_head_rate_update";
import { connect } from "react-redux";

export class crypto_live_head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamics: []
    };
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   // this.props.update_array([]);
  //   let dynamics = [true, true, true, true];
  //   for (let i = 0; i < this.props.crypto_head_coins.length; i++) {
  //     var coin = this.props.crypto_head_coins[i];
  //     if (
  //       nextProps.crypto_head_data.DISPLAY[coin].USD.PRICE >
  //       this.props.crypto_head_data.DISPLAY[coin].USD.PRICE
  //     ) {
  //       dynamics[i] = true;
  //     } else if (
  //       nextProps.crypto_head_data.DISPLAY[coin].USD.PRICE ===
  //       this.props.crypto_head_data.DISPLAY[coin].USD.PRICE
  //     ) {
  //       dynamics[i] = true;
  //     } else {
  //       dynamics[i] = false;
  //     }
  //   }
  //   this.setState({ dynamics });
  // }
  

  render() {
    return (
      <div className="crypto_live_head">
        <div className="crypto_head_wrapper">
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
                    {Object.keys(this.props.crypto_head_data.DISPLAY[coin])}
                  </span>
                </div>

                <div className="crypto_rate">
                  <p className={this.state.dynamics[i] ? "green" : "red"} >
                    {this.props.crypto_head_data.DISPLAY[coin].USD.PRICE}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="development">In Development</p>
        <style>{`
        .crypto_live_head{
            width:100%;
            height:auto;
            margin:30px 0;
        }
        .development{
          margin-top:50px;
          text-align:center;
        }
        .crypto_head_wrapper{
            display:flex;
            align-items:center;
            width:100%;
            height:auto;
            justify-content:center;
        }
        .crypto_head{
            width:20%;
            height:auto;
            padding:20px;
            box-shadow: 0 3px 20px 0 rgba(0,77,165,0.07);
            margin:0 15px;
        }
       
        .crypto_rate_head span{
          font-size:14px;
        }
        .crypto_rate_head img{
          width:20px;
          height:20px;
          margin-right:8px;
        }
        .crypto_rate{
          margin-top:10px;
        }
        .crypto_rate p{
          font-size:16px;
        }
        .crypto_rate span{
          font-size:12px;
          margin-left:6px;
        }
        .green{
          color:green;
        }
        .red{
          color:red;
        }
        `}</style>
      </div>
    );
  }
}
// export default connect()(crypto_live_head);className={this.props.rate_updated[i] ? "green" : "red"}
export default crypto_live_head;
