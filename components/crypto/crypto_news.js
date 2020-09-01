import React, { Component } from "react";
import Head from "next/head";
export class CryptoNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      sliceStart: 0,
      sliceEnd: 10,
      newsDataLength: [],
      errorLoading: false,
    };
  }
  componentDidMount() {
    this.fetchCryptoNews()
      .then((data) => {
        var dataLength = [];
        var dataDivideByNewsPostShown = data.Data.length / 10;
        for (let i = 1; i < dataDivideByNewsPostShown + 1; i++) {
          dataLength.push(i);
        }
        this.setState({
          newsData: data.Data,
          newsDataLength: dataLength,
          errorLoading: false,
        });
      })
      .catch(() => {
        this.setState({ errorLoading: true });
      });
  }
  fetchCryptoNews = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${process.env.CRYPTO_API_KEY}`
      )
        .then((response) => {
          return resolve(response.json());
        })
        .catch((err) => {
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
      sliceEnd: lastPageNumber,
    });
  };
  timeDifference = (current, previous) => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " second ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minute ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hour ago";
    }
    else {
      return "approximately " + Math.round(elapsed / msPerYear) + " year ago";
    }
  };
  render() {
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="../static\styles\cryptoNews\cryptoNews.css"
          />
        </Head>
        <div className="title_head">
          <div className="container">
            <h1>Latest News</h1>
          </div>
        </div>
        <div className="news">
          <div className="container">
            {this.state.errorLoading ? (
              <p className="loadingError">Error Loading...</p>
            ) : (
              <>
                <div className="news_wrapper">
                  <ul>
                    {this.state.newsData
                      .slice(this.state.sliceStart, this.state.sliceEnd)
                      .map((news) => (
                        <li key={news.id}>
                          <div className="news_article">
                            <h3 title={news.body.slice(0, 100) + " . . ."}>
                              <a target="_blank" href={news.url}>
                                {news.title}
                              </a>
                            </h3>
                            <div className="row">
                              <img src={news.source_info.img} alt="" />
                              <p>
                                {news.source_info.name} ,{" "}
                                {news.source_info.lang} ,{" "}
                                {this.timeDifference(
                                  Date.now(),
                                  news.published_on * 1000
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="news_pagination">
                  <ul className="row">
                    {this.state.newsDataLength.map((pageNumber) => (
                      <li
                        onClick={(e) => {
                          this.showPage(e, pageNumber);
                        }}
                        key={pageNumber}
                      >
                        {pageNumber}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default CryptoNews;
