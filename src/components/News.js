import React, {useEffect, useState} from 'react'

import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

  const [articles, setArticles]= useState([])
  const [loading, setLoading]= useState(false)
  const [page, setPage]= useState(1)
  const [totalResults, setTotalResults]= useState(0)



 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 

  const updateNews = async() => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=71a0d00a98b74e98a7545a4f0d6f7065&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);

    let parseData = await data.json();
    props.setProgress(50);

    setArticles(parseData.articles)
    setTotalResults(parseData.totalResult)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect(() => {
     document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey`;

    updateNews();
    // eslint-disable-next-line
  }, []);
  

//  const handlePrevClick = async () => {
//     setPage({ page: page - 1 })
//     updateNews();
//   }

// const  handleNextClick = async () => {

//     // if(!(page + 1 > Math.ceil(totalResults/props.pageSize))){
//     setPage({ page: page + 1 });
//    updateNews();
//   }

 const fetchMoreData = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();

    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
    setLoading(false)
   
  };
  
    return (

      <>
        <h1 className='text-center ' style={{marginTop: '90px'}} >NewsMonkey- Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {/* {loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">

              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItems title={!element.titie ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

        
        </>

    )
  
}

// News.defaultProps = {
//   country: 'in',
//   pageSize: 8,
//   category: 'general'
// }

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
