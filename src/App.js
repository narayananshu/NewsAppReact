
import { Component } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import News from './component/News';


export default class App extends Component{
  
  render()
  {
   return (
    <div>
     <Navbar/>
     <News pageSize={5} Country="india" category ="science"/>
    </div>
   )
  }
}
