import React, { Component } from 'react'
import NewsItem from './NewsItem'
import propTypes from 'prop-types'

export class News extends Component {
  static defaultProps ={
    country : "india",
    pageSize : 8
  }
  static propTypes ={
    country : propTypes.string,
pageSize : propTypes.number,
category : propTypes.string
  }
  constructor()
  {
    super();
    console.log("this is constructor")
    this.state={
      articles :[],
      loading : false,
      page: 1
    }
  }
async  componentDidMount(){
   let url=`https://newsapi.org/v2/everything?country=${this.props.country}&category=${this.props.category}&from=2023-12-25&to=2023-12-25&sortBy=popularity&apiKey=d64ca4f2db1b483fa6c8ea886a194ea1&pageSize=${this.props.pageSize}`;
   let data =await fetch(url);
   let parseData = await data.json();

   this.setState({articles:parseData.articles})
  }
handleNextClick= async ()=>  {

let url=`https://newsapi.org/v2/everything?country=${this.props.country}&category=${this.props.category}&from=2023-12-25&to=2023-12-25&sortBy=popularity&apiKey=d64ca4f2db1b483fa6c8ea886a194ea1&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
   let data =await fetch(url);
   let parseData = await data.json();
  
   this.setState({
    page : this.stage.page +1,
    articles :parseData.articles
   })
}
handlePreviousClick= async ()=>{
  let url=`https://newsapi.org/v2/everything?country=${this.props.country}&category=${this.props.category}&apiKey=d64ca4f2db1b483fa6c8ea886a194ea1&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  let data =await fetch(url);
  let parseData = await data.json();

  this.setState({
    page : this.stage.page -1,
    articles :parseData.articles
  })
}
  render() {
    return (
   
      <div className='container my-3' >
      <h1 className="text-center" style={{color:"red"}}>Welcome to Apple news- Todays headlines</h1>

       <div className="row">
       { this.state.articles.map((ele)=>{
       return <div className="col-md-4" key={ele.url}>
       <NewsItem  title={ele.title.slice(0,10)} description={ele.description.slice(0,70)} 
       imageUrl={ele.urlToImage} newsUrl={ele.url}/>

       </div>
      })}
      <div className="d-flex justify-content-around">
      <button disabled={this.state.page<=1}type="button" className='btn btn btn-dark' onClick={this.handlePreviousClick}>Previous</button>
  <button type="button" className='btn btn btn-dark' onClick={this.handleNextClick}>Next</button>
      </div>      
  </div>
      </div>
    )
  }
}
export default News
