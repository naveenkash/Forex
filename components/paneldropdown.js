import React from "react";

import CurrencyItems from "./currencydropdown";
class paneldropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCurr: this.props.currency,
      currentFlag: this.props.flag,
      convert: this.props.convert,
      showDropDown: false,
     
    };
  }
 

 twoMethod=(e)=>{
  this.handleDown(e, "panel_drop_option");
  this.showDropDown(e);
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
    // this.props.toRemoveFromOtherDropDown(this.state.currentCurr);
  };
  handleLeave = (e, node) => {
    e.currentTarget.parentNode.classList.remove("activeHover");
    // e.currentTarget.parentNode.classList.remove("activeFocus");
    e.currentTarget.parentNode.classList.add("normalBorder");
  };
  handleDown = (e, node) => {
    // e.stopPropagation();
    var input_wrapper = document.getElementsByClassName(node);
    for (let i = 0; i < input_wrapper.length; i++) {
      const element = input_wrapper[i];
      element.classList.remove("activeFocus");
    }

    e.currentTarget.parentNode.classList.remove("activeHover");
    e.currentTarget.parentNode.classList.remove("normalBorder");
    e.currentTarget.parentNode.classList.add("activeFocus");
  };
  showDropDown = e => {
    this.setState({ showDropDown: !this.state.showDropDown });
  };
 
  setCurrency=(currency)=>{
    this.setState({currentCurr:currency.name,currentFlag:currency.flag});
    this.props.removeEl(currency);
  }
  hideCurr=(hide)=>{
    this.setState({ showDropDown: hide });
  }
 
  render() {
    return (
      <div  className="panel_dropdown">
        <div className="label_convert">
          <label>{this.state.convert}</label>
        </div>
        <div className="panel_drop_option">
        {(() => {
              if (!this.state.showDropDown) {
                return null;
              } else {
               return(
                <CurrencyItems  hideCurr={this.hideCurr} dropCurrency={this.setCurrency}currencies={this.props.all_currencies} />
               )
              }
            })()}
          <div
            className="panel_drop_select"
            onMouseEnter={e => this.handleHover(e, "panel_drop_option")}
            onMouseLeave={e => this.handleLeave(e, "panel_drop_option")}
            onClick={e=>{this.twoMethod(e)}}
          >
            
            <div className="panel_flag">
              <img src={this.state.currentFlag} alt="" />
            </div>
            <div className="panel_curr_info">
              <span>{ this.state.currentCurr}</span>
            </div>
            <div className="drop_arrow">
              <i>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="angle-down"
                  className="svg-inline--fa fa-angle-down fa-w-10"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                  ></path>
                </svg>
              </i>
            </div>
          </div>
        </div>
        <style jsx>{`
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
            position: relative;
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
          .label_convert label {
            color: #919ea4;
            font-size: 15px;
            transition: 0.1s;
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

export default paneldropdown;
