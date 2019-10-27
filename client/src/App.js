import React, { Component } from 'react';
import './App.css';
import Cards from "./Cards/Cards";

class App extends Component {
  state = {
    data: [],
    info: "",
   }
  
  componentDidMount(){
    this.getTodos();
  }
  getTodos = () =>{
    fetch('/getTodos',{method:"get"}).then((response)=>{
      return response.json();
    }).then((data)=>{
      console.log(data);
      this.setState({data:data});
    })
  }
  
  onClickPostHandler = event => {
    event.preventDefault();
    fetch('/',{
      method: 'post',
      body:JSON.stringify({todo:this.state.info}),
      headers:{
        "content-Type" : "application/json; charset=utf-8"
      }
    }).then((response)=>{
      console.log(response);
      return response.json();
    }).then((data)=>{
      if(data.result.ok === 1 && data.result.n === 1)
      {
        this.getTodos();
      }
    })
    }

  onClickRemoveHandler = (event) =>{
    let stateCopy = {...this.state};
    for(let key = 0; key < this.state.data.length; key++)
    {
      if(stateCopy.data[key].key === event.target.id)
      {
        stateCopy.data = stateCopy.data.filter(todo => todo.key !== event.target.id);
        break;
      }
    }
    this.setState({data:stateCopy.data});
  }
  onChangeHandler = event => {
    let infoClone = JSON.parse(JSON.stringify(this.state.info));
    infoClone = event.target.value;
    this.setState({info:infoClone});
    console.log(this.state.info);
  }
  render() {
    let cardArray = this.state.data.map((item, index) => {
      console.log(item)
      return (
        <Cards 
          key={index}
          remove={e => this.onClickRemoveHandler(e)}
          info={item.info}></Cards>
      );
    });
    console.log(this.state);
    return (
      <div className="App">
        <div className="wrapper">
        <h1 className="headline">to do list</h1>
        <input className="input" onChange={e => this.onChangeHandler(e)} value={this.state.info}/>
        <button className="add" onClick={e => {this.onClickPostHandler(e)}}>Add</button>
        {cardArray}
        </div>
      </div>
    )
  }

};
export default App;
