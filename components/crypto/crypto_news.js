import React, { Component } from "react";

export class crypto_news extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      sliceStart: 0,
      sliceEnd: 10,
      newsDataLength: []
    };
  }
  componentDidMount() {
    this.fetchCryptoNews().then(data => {
      var dataLength = [];
      var dataDivideByNewsPostShown = data.Data.length / 10;
      for (let i = 1; i < dataDivideByNewsPostShown + 1; i++) {
        dataLength.push(i);
      }
      this.setState({ newsData: data.Data, newsDataLength: dataLength });
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
  showPage = (e, pageNumber) => {
    var getAllPageLis = document.querySelectorAll(".news_pagination ul li");
    for (let i = 0; i < getAllPageLis.length; i++) {
      const pageLi = getAllPageLis[i];
      pageLi.style.background = "none";
    }
    e.currentTarget.style.background = "#0000000d";
    var lastPageNumber = 10 * pageNumber; //10 is post shown per page
    this.setState({
      sliceStart: lastPageNumber - 10,
      sliceEnd: lastPageNumber
    });
  };
  render() {
    return (
      <>
        <div className="title_head">
          <div className="container">
            <h1>Latest News</h1>
          </div>
        </div>
        <div className="news">
          <div className="container">
            <div className="news_wrapper">
              <ul>
                {this.state.newsData
                  .slice(this.state.sliceStart, this.state.sliceEnd)
                  .map(news => (
                    <li key={news.id}>
                      <div className="news_article">
                        <h3 title={news.body.slice(0, 100) + " . . ."}>
                          {" "}
                          <a target="_blank" href={news.url}>
                            {news.title}
                          </a>
                        </h3>
                        <div className="row">
                          <img src={news.source_info.img} alt="" />
                          <p>
                            {news.source_info.name} , {news.source_info.lang}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="news_pagination">
              <ul className="row">
                {this.state.newsDataLength.map(pageNumber => (
                  <li
                    onClick={e => {
                      this.showPage(e, pageNumber);
                    }}
                    key={pageNumber}
                  >
                    {pageNumber}
                  </li>
                ))}
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
       
        .news_wrapper{
            padding:10px 0px;
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
          .news_wrapper ul li:not(:first-child){
            border-top:1px solid #0000000d;
        }
        .news_wrapper ul li:hover{
            background:#ECF3FD;
        }
        .news_article img{
            width:18px;
            height:18px;
            object-fit:cover;
            margin-right:8px;
            border-radius:100%;
        }
      
        .news_article h3{
            font-size:16px;
            margin-bottom:10px;
            line-height:20px;
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
        .news_pagination{
          width:100%;
          height:auto;
          padding:20px 0;
        }
        .news_pagination ul{
          justify-content:center;
          padding:0;
          list-style:none;
          margin:0;
        }
        .news_pagination ul li{
          padding:5px 10px;
          cursor:pointer;
          margin:0 5px;
          // border:1px solid transparent;
        }
        .news_pagination ul li:hover{
          background: #0000000d;
          // border:1px solid #36c8ff;
        }
        `}</style>
        </div>
      </>
    );
  }
}

export default crypto_news;
