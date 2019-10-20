import React, { Component } from "react";

export class crypto_news extends Component {
  constructor(props) {
    super(props);
    this.state={
        newsData:[]
    }
  }
  componentDidMount() {
    this.fetchCryptoNews().then(data => {
      console.log(data.Data);
      this.setState({newsData:data.Data})
    });
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
    return (
        <>
        <div className="news_head">
            <div className="container">
                
            <h1>Latest News</h1>
            </div>
        </div>
      <div className="news">
        <div className="container">
          <div className="news_wrapper">
           
            <ul>
              {this.state.newsData.map(news => (
                <li key={news.id}>
                    <div className="news_article">
                        {/* <div className="news_article_info"> */}
                          <h3 title={news.body.slice(0,100)+' . . .'}> <a target="_blank" href={news.url}>{news.title}</a> </h3>  
                          <p>{news.source_info.name} , {news.source_info.lang}</p>
                        {/* </div> */}
                    </div>
                </li>
              ))
              }
            </ul>
          </div>
        </div>
        <style>{`
        .news{
            // background:#36c8ff;
            height:auto;
            width:100%;
            background:white;
        }
        .news_head{
            margin-bottom:25px;
        }
        .news_head h1{
            // color:#36c8ff;
            font-weight:lighter;
            font-size:26px;
        }
        .news_wrapper{
            // padding:25px 30px;
            box-shadow: 0 3px 20px 0 rgba(0,77,165,0.07);
        }
        .news_wrapper ul{
            list-style:none;
            margin:0;
            padding:0;
        }
        .news_wrapper ul li{
            padding:12px 30px;
            // margin-bottom:15px;
            transition:0.3s;
            // border-top:1px solid #000000f2;
        }
        .news_wrapper ul li:hover{
            background:#36c8ff0d;
        }
        .news_wrapper ul li:not(:first-child){

            border-top:1px solid #0000000d;
        }
        
        .news_article h3{
            font-size:17px;
            margin-bottom:5px;
        }
        .news_article h3 a{
            text-decoration:none;
            color:black;
            transition:0.1;
        }
        .news_article h3 a:hover{
            color:#36c8ff;
            text-decoration:underline;
        }
        .news_article p{
            font-size:14px;
        }
        `}</style>
      </div>
      </>
    );
  }
}

export default crypto_news;
