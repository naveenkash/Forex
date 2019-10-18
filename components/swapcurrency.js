import React, { Component } from "react";
export class swapcurrency extends Component {
  constructor(props){
    super(props);
  }
  fetchReverseCurrency = () => {
    fetch(
      `https://www1.oanda.com/rates/api/v2/rates/spot.json?api_key=${process.env.REACT_APP_API_KEY_1}&base=${this.props.to}&quote=${this.props.from}`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.props.swapCurrency(data);
      })
      .catch(err => {
        alert(err);
      });
  };
  render() {    
    return (
      <div className="panel_swap">
        <div
          className="panel_swap_icon"
          onClick={this.fetchReverseCurrency}
        >
          <i>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="exchange-alt"
              className="svg-inline--fa fa-exchange-alt fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"
              ></path>
            </svg>
          </i>
        </div>
        <style jsx>{`
          .panel_swap {
            width: 20%;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 25px;
          }
          .panel_swap_icon {
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            cursor: pointer;
            border-radius: 100%;
            background: #f2f5f7;
            text-align: center;
          }
          .panel_swap_icon i {
            width: 100%;
            height: 25px;
            color: rgb(54, 200, 255);
          }
          .panel_swap_icon i svg {
            height: 100%;
            width: 100%;
          }
          .panel_swap_icon:hover {
            border: 1px solid rgb(54, 200, 255);
          }
        `}</style>
      </div>
    );
  }
}

export default swapcurrency;
