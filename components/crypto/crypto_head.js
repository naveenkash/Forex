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
  GetClass=(i)=>{
    if (!document.querySelectorAll('.crypto_rate p')[i]) {
      return 'green';
    }
    return document.querySelectorAll('.crypto_rate p')[i].className
  }

  render() {
    return (
      <div className="crypto_live_head">
        <div className="crypto_head_wrapper">
          {(()=>{
            if (this.props.errorLoading) {
              return <p className="loadingError">Error Loading...</p>
            }else{
              return(
                <>
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
      
                      <div className="crypto_rate row">
                        <p
                          className={
                            this.state.rate_updated[i] === true
                              ? "green"
                              : this.state.rate_updated[i] === null
                              ?  this.GetClass(i)
                              : this.state.rate_updated[i] === false
                              ? "red"
                              : "green"
                          } 
                        >
                          {this.props.crypto_head_data.DISPLAY[coin].USD.PRICE}
                         
                        </p>
                        <span className="head_pct_chg">({this.props.crypto_head_data.DISPLAY[coin].USD.CHANGEPCT24HOUR}%)</span>
                      </div>
                      <span className="crypto_head_vol">VOL : {this.props.crypto_head_data.DISPLAY[coin].USD.VOLUME24HOUR}</span>
                    </div>
                    
      
                  );
                 
                })} 
                </>
              )
            }
          })()}
          
        </div>
       
        <style>{`
        .crypto_live_head{
            width:100%;
            height:auto;
            margin:45px 0;
        }
       
        .crypto_head_wrapper{
            display:flex;
            align-items:center;
            width:100%;
            height:auto;
            justify-content:center;
        }
        .crypto_head{
            width:25%;
            height:auto;
            padding:20px;
            box-shadow: 0 3px 20px 0 rgba(0,77,165,0.07);
            margin:0 15px;
            position:relative;
            background:white;
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
          font-size:14px;
          // color:#36c8ff;
        }
        
        .crypto_rate span{
          font-size:12px;
          margin-left:6px;
        }
        .head_pct_chg {
          color:grey;
        }
        .crypto_head_vol{
          position:absolute;
          top:0px;
          right:0;
          background:white;
          padding:8px;
          font-size:10px;
          // box-shadow: 0 3px 20px 0 rgba(0,77,165,0.07);
          // z-index:-1;
         
        }
        
        `}</style>
      </div>
    );
  }
}
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
