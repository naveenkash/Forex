import React, { Component } from "react";
import { update_rate_array } from "../../redux/action/crypto_head_rate_update";
import { connect } from "react-redux";
export class crypto_live_head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate_updated: []
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.crypto_head_data === nextProps.crypto_head_data) {
      return;
    }
    if (this.props.crypto_head_data !== nextProps.crypto_head_data) {
      let rate_updated = [...this.props.previousArray];
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
      this.props.update_rate_array(rate_updated);
      this.setState({ rate_updated });
    }
  }

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
                  <span>{this.props.crypto_head_data.DISPLAY[coin].USD.VOLUME24HRTO}</span>
                </div>

                <div className="crypto_rate">
                  <p
                    className={
                      this.state.rate_updated[i] === true
                        ? "green"
                        : this.state.rate_updated[i] === null
                        ? ""
                        : this.state.rate_updated[i] === false
                        ? "red"
                        : "green"
                    }
                  >
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
          color:#36c8ff;
        }
        .crypto_rate span{
          font-size:12px;
          margin-left:6px;
        }
        .green{
          color:#00bf33 !important;
        }
        .red{
          color:red !important;
        }
        `}</style>
      </div>
    );
  }
}
// export default connect()(crypto_live_head);className={this.props.rate_updated[i] ? "green" : "red"}
const mapDispatchToProps = dispatch => ({
  update_rate_array: Array => dispatch(update_rate_array(Array))
});
const mapStateToProps = state => ({
  previousArray: state.crypto_head_update
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(crypto_live_head);
// export default crypto_live_head;
