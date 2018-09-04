import React, { Component } from "react";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

// ES5 syntax
// function isSearched(searchTerm) {
// 	return function(item) {
// 		return item.title.toLowerCase().includes(searchTerm.toLowerCase());
// 	}
// }

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ""
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onSearchChange={this.onSearchChange}>
            Search:
          </Search>
          <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
        </div>
      </div>
    );
  }
}

const Button = ({ onClick, className = "", children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

const Search = ({ value, onSearchChange, children }) => (
  <form>
    <label>{children}</label>{" "}
    <input type="text" value={value} onChange={onSearchChange} />
  </form>
);

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => (
      <div key={item.objectID} className="table__row">
        <span className="table__column--large">
          <a href={item.url}>{item.title}</a>
        </span>
        <span className="table__column--mid">{item.author}</span>
        <span className="table__column--small">{item.num_comments}</span>
        <span className="table__column--small">{item.points}</span>
        <span className="table__column--small">
          <Button onClick={() => onDismiss(item.objectID)} className="button--inline">Dismiss</Button>
        </span>
      </div>
    ))}
  </div>
);

export default App;
