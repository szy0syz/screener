import React, { Component } from 'react';

class SearchBar extends Component {
  state = { url: '' };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.url);
  };

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div
            className={`ui labeled field fluid icon input ${
              !this.props.auth ? 'disabled' : ''
            }`}
          >
            <div className="ui label">http://</div>
            <input
              value={this.state.url}
              type="text"
              onChange={(e) => this.setState({ url: e.target.value })}
              placeholder="Take Screenshot"
            />
            <i className="search link icon"></i>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
