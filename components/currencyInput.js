import React, { Component } from "react";
import SwapIcon from "./swapicon";
import DropdownHead from "./paneldropdown";
export class currencyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_currencies: [
        {
          flag:
            "https://cdn.pixabay.com/photo/2015/11/06/13/29/union-jack-1027898__340.jpg",
          name: "GBP"
        },
        {
          flag:
            "https://cdn.pixabay.com/photo/2016/10/27/12/55/turkish-flag-1774834__340.png",
          name: "TRY"
        },
        {
          flag:
            "https://cdn.pixabay.com/photo/2013/07/13/01/09/europe-155191__340.png",
          name: "EUR"
        },
        {
          flag:
            "https://cdn.pixabay.com/photo/2012/04/11/15/43/australia-28586__340.png",
          name: "AUD"
        },
        {
          flag:
            "https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392__340.png",
          name: "USD"
        },
        {
          flag:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgBAMAAACm+uYvAAAAMFBMVEUSiAc4RVs8SF48SV9jbX5jbX9lb4CVnKiWnKiyt8DKzdPLztTq6+7x8vP/mTP///8DX5tcAAAAUUlEQVQoz2N4hwMwDHuJ/zgAksTvRLH9WCWa5py0wCbxS/f//8v7sUh8m////898LBIfz3/x/yOPXSIeqwROo37b4rD8fzEO5+L2IFqQjFgAAKYM7paqvXB1AAAAAElFTkSuQmCC",
          name: "INR"
        },
        {
          flag:
            "https://cdn.pixabay.com/photo/2012/04/10/23/27/canada-27003__340.png",
          name: "CAD"
        },
        {
          flag:
            "https://cdn.pixabay.com/photo/2012/04/26/11/55/flag-42281__340.png",
          name: "MXN"
        },
        {
          flag:
            "https://cdn.pixabay.com/photo/2012/04/10/22/59/japan-26803__340.png",
          name: "JPY"
        },
        {
          flag:
            "https://cdn.pixabay.com/photo/2013/07/13/14/15/hong-kong-162316__340.png",
          name: "HKD"
        },
        {
          flag:
            "https://cdn.pixabay.com/photo/2013/07/13/14/15/kuwait-162335__340.png",
          name: "KWD"
        }
      ],
      fromCurrencyValue:1,
      toCurrencyValue:0,
      mainConvertedCurrencyValue:0,
      all_currencies2: [],
      selectedFrom: "USD",
      selectedFromFlag:
        "https://cdn.pixabay.com/photo/2017/03/14/21/00/american-flag-2144392__340.png",
      selectedTo: "INR",
      selectedToFlag:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgBAMAAACm+uYvAAAAMFBMVEUSiAc4RVs8SF48SV9jbX5jbX9lb4CVnKiWnKiyt8DKzdPLztTq6+7x8vP/mTP///8DX5tcAAAAUUlEQVQoz2N4hwMwDHuJ/zgAksTvRLH9WCWa5py0wCbxS/f//8v7sUh8m////898LBIfz3/x/yOPXSIeqwROo37b4rD8fzEO5+L2IFqQjFgAAKYM7paqvXB1AAAAAElFTkSuQmCC"
    };
  }
  componentDidMount() {
    this.setState({
      all_currencies2: [
        ...this.state.all_currencies.filter(item => {
          return item.name !== "USD";
        })
      ]
    });
    fetch(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=INR&apikey=IDJHD0SY07N08B02`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.Note) {
          alert(
            "This is free api so it limit the number of request sent. Sorry for the inconvenience. Try agian in few seconds"
          );
          return;
        }
        this.setState({mainConvertedCurrencyValue:data["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
        fromCurrencyValue:1
        ,toCurrencyValue:data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]})
        this.props.currencyRate(data);
      });
  }
  handleHover = (e, node) => {
    var input_wrapper = document.getElementsByClassName(node);
    for (let i = 0; i < input_wrapper.length; i++) {
      const element = input_wrapper[i];
      element.classList.add("normalBorder");
      if (element.classList.contains("activeFocus")) {
        element.classList.add("activeFocus");
      }
    }
    e.currentTarget.parentNode.classList.add("activeHover");
  };
  handleLeave = (e, node) => {
    e.currentTarget.parentNode.classList.remove("activeHover");
    // e.currentTarget.parentNode.classList.remove("activeFocus");
    e.currentTarget.parentNode.classList.add("normalBorder");
  };
  handleDown = (e, node) => {
    e.stopPropagation();
    var input_wrapper = document.getElementsByClassName(node);
    for (let i = 0; i < input_wrapper.length; i++) {
      const element = input_wrapper[i];
      element.classList.remove("activeFocus");
    }

    e.currentTarget.parentNode.classList.remove("activeHover");
    e.currentTarget.parentNode.classList.remove("normalBorder");
    e.currentTarget.parentNode.classList.add("activeFocus");
  };
  hideBorderColor = (e, node) => {
    var input_wrapper = document.getElementsByClassName(node);
    for (let i = 0; i < input_wrapper.length; i++) {
      const element = input_wrapper[i];
      if (element.classList.contains("activeFocus")) {
        element.classList.remove("activeFocus");
      }
    }
  };
  removeEl = currency => {
    var res = this.state.all_currencies.filter(item => {
      return item.name !== currency.name;
    });
    this.setState({ all_currencies2: res });
  };
  selectedFrom = currency => {
    if (currency.name === this.state.selectedTo) {
      this.setState(
        {
          selectedTo: this.state.all_currencies[0].name,
          selectedToFlag: this.state.all_currencies[0].flag
        },
        () => {}
      );
    }
    this.setState(
      {
        selectedFrom: currency.name,
        selectedFromFlag: currency.flag
      },
      () => {
        fetch(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${this.state.selectedFrom}&to_currency=${this.state.selectedTo}&apikey=IDJHD0SY07N08B02`
        )
          .then(res => {
            return res.json();
          })
          .then(data => {
            if (data.Note) {
              alert(
                "This is free api so it limit the number of request sent. Sorry for the inconvenience. Try agian in few seconds"
              );
              return;
            }
            this.setState({mainConvertedCurrencyValue:data["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
            fromCurrencyValue:1
            ,toCurrencyValue:data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]})
            this.props.currencyRate(data);
          });
      }
    );
  };
  selectedTo = currency => {
    this.setState(
      { selectedTo: currency.name, selectedToFlag: currency.flag },
      () => {
        fetch(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${this.state.selectedFrom}&to_currency=${this.state.selectedTo}&apikey=IDJHD0SY07N08B02`
        )
          .then(res => {
            return res.json();
          })
          .then(data => {
            if (data.Note) {
              alert(
                "This is free api so it limit the number of request sent. Sorry for the inconvenience. Try agian in few seconds"
              );
              return;
            }
            this.setState({mainConvertedCurrencyValue:data["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
            fromCurrencyValue:1
            ,toCurrencyValue:data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]})
            this.props.currencyRate(data);
          });
      }
    );
  };
  calculateCurrency=(e)=>{
    if (isNaN(e.target.value)) {
      alert("Please enter a number ");
      return;
    }
   var CurrencyCalculated= e.target.value * this.state.mainConvertedCurrencyValue;
   this.setState({fromCurrencyValue:e.target.value,toCurrencyValue:CurrencyCalculated})
  }
  render() {
    return (
      <div
        className="panel"
        onClick={e => this.hideBorderColor(e, "panel_input")}
      >
        <div className="panel_body">
          <div className="panel_input_wrapper">
            <div className="label_convert">
              <label>Amount</label>
            </div>
            <div className="panel_input">
              <input
                onMouseEnter={e => this.handleHover(e, "panel_input")}
                onMouseLeave={e => this.handleLeave(e, "panel_input")}
                onClick={e => this.handleDown(e, "panel_input")}
                type="text"
                value={this.state.fromCurrencyValue}
                onChange={e=>{this.calculateCurrency(e)}}
              />
              <div className="panel_currency">
                <span>{this.state.selectedFrom}</span>
              </div>
            </div>
          </div>
          <div className="panel_input_wrapper">
            <div className="label_convert">
              <label>Converted To</label>
            </div>
            <div className="panel_input">
              <input
                onMouseEnter={e => this.handleHover(e, "panel_input")}
                onMouseLeave={e => this.handleLeave(e, "panel_input")}
                onClick={e => this.handleDown(e, "panel_input")}
                type="text"
                value={this.state.toCurrencyValue}
                onChange={()=>{}}
              />
              <div className="panel_currency">
                <span>{this.state.selectedTo}</span>
              </div>
            </div>
          </div>
          <div
            className="panel_input_wrapper"
            onClick={e => this.hideBorderColor(e, "panel_drop_option")}
          >
            <div className="panel_select">
              <DropdownHead
                selected={this.selectedFrom}
                convert={"From"}
                all_currencies={this.state.all_currencies}
                removeEl={this.removeEl}
                currency={this.state.selectedFrom}
                flag={this.state.selectedFromFlag}
              />
              <SwapIcon />
              <DropdownHead
                selected={this.selectedTo}
                convert={"To"}
                all_currencies={this.state.all_currencies2}
                currency={this.state.selectedTo}
                removeEl={() => {}}
                flag={this.state.selectedToFlag}
              />
            </div>
          </div>

          <div className="currency_input5">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem sed
              odit numquam? Et, dicta voluptas! Beatae dicta alias deserunt.
              Minima.
            </p>
          </div>
        </div>
        <style jsx>{`
          .panel {
            max-width: 100%;
            height: auto;
            background: white;
            border-radius: 5px;
            padding: 30px;
            margin-top: 30px;
          }
          .panel_body {
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          }
          .panel_input_wrapper {
            width: 50%;
            padding: 0 10px;
          }

          .label_convert label {
            color: #919ea4;
            font-size: 15px;
            transition: 0.1s;
          }
          .panel_input {
            position: relative;
            margin-bottom: 24px;
            margin-top: 3px;
            transition: 0.1s;
            border-radius: 3px;
            border: 1px solid #d3d5d8;
          }
          .panel_currency {
            position: absolute;
            top: 0;
            right: 0;
            height: 72px;
            padding: 13px 16px 11px;
            display: flex;
            align-items: center;
            background: white;
          }
          .panel_currency span {
            color: #829ca9;
          }
          .panel_input input {
            width: 100%;
            padding: 13px 16px 11px;
            height: 72px;
            outline: none;
            border: none;
            font-size: 22px;
            border-radius: 3px;
            color: #384c70;
          }
          .panel_select {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 30px;
          }
          .panel_dropdown {
            width: 40%;
            cursor: pointer;
          }
          .panel_drop_option {
            width: 100%;
            height: 45px;
            margin-top: 3px;
            border: 1px solid #d3d5d8;
            transition: 0.1s;
            border-radius: 3px;
          }
          .panel_drop_select {
            height: 45px;
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;
            padding: 15px;
          }
          .drop_arrow {
            width: 18px;
            height: 18px;
            position: absolute;
            right: 10px;
            bottom: 13px;
          }
          .drop_arrow i {
            width: 100%;
            height: 100%;
            color: rgb(54, 200, 255);
          }
          .panel_drop_select i svg {
            width: 100%;
            height: 100%;
          }
          .panel_flag {
            margin-right: 5px;
            width: 24px;
            height: 16px;
            background-size: 100%;
            background-repeat: no repeat;
          }
          .panel_flag img {
            width: 100%;
            height: 100%;
          }
          .panel_curr_info span {
            font-family: "Poppins", sans-serif;
            letter-spacing: 0.5px;
          }

          .activeHover {
            border-color: #829ca9 !important;
          }
          .activeFocus {
            border-color: #17bfff !important;
          }
          .normalBorder {
            border-color: #d3d5d8;
          }
        `}</style>
      </div>
    );
  }
}

export default currencyInput;
