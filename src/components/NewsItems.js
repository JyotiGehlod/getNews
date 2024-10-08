import React from 'react'

const NewsItems = (props)=>  {
    
  
   let {title, description, imgUrl, newsUrl, author, date, source} = props
    return (
      <div className='my-3'>
       <div className="card" >
       <div className="cantainer" style={{display:'flex',justifyContent: 'flex-end'}}><span className="position-absolute top-0  translate-middle badge rounded-pill bg-success">{source}</span>
        </div>
          <img src={!imgUrl? "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2024/05/aditya-l1-1715737226.jpg": imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {!author? "Unknown": author} on {new Date(date).toGMTString()} </small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  
}

export default NewsItems
