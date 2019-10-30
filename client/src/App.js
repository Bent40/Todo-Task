import React, { Component } from 'react';
import './App.css';
import Cards from "./Cards/Cards";

class App extends Component {
  state = {
    data: [],
    info: "",
  }

  componentDidMount() {
    this.getTodos();
  }
  getTodos = () => {
    fetch('/getTodos', { method: "get" }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      this.setState({ data: data });
    })
  }

  onClickPostHandler = event => {
    event.preventDefault();
    fetch('/', {
      method: 'post',
      body: JSON.stringify({ todo: this.state.info }),
      headers: {
        "content-Type": "application/json; charset=utf-8"
      }
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      if (data.result.ok === 1 && data.result.n === 1) {
        this.getTodos();
      }
    })
  }

  onClickRemoveHandler = (event) => {
    fetch("/" + event.target.id, { method: "delete" }
    )
    this.getTodos();
  }

  onClickEditHandler = (event) => {
    let newInfo = prompt("Enter Your Edited Todo");   
    fetch("/"+event.target.id ,{
      method: 'put',
      body: newInfo
    })
    this.getTodos();
  }

  onChangeHandler = event => {
    let infoClone = JSON.parse(JSON.stringify(this.state.info));
    infoClone = event.target.value;
    this.setState({ info: infoClone });
  }
  render() {
    let cardArray = this.state.data.map((item, index) => {
      return (
        <Cards
          key={index}
          id={item._id}
          remove={e => this.onClickRemoveHandler(e)}
          edit={e => this.onClickEditHandler(e)}
          info={item.todo}></Cards>
      );
    });
    return (
      <div className="App" >
        <div className="wrapper">
          <h1 className="headline">to do list</h1>
          <input className="input" onChange={e => this.onChangeHandler(e)} value={this.state.info} />
          <button className="add" onClick={e => { this.onClickPostHandler(e) }}>Add</button>
          {cardArray}
        </div>
      </div>
    )
  }

};
export default App;
