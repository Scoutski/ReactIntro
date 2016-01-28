import React, { Component } from 'react';

// only class based components have state.
class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '' };
	}

	// the value property turns this component into a "controller component"
	// a controlled component has it's value set by state, it only changes when state changes.
	render() {
		return (
			<div className="search-bar">
				<input 
					value={this.state.term}
					onChange={event => this.onInputChange(event.target.value)} />
			</div>
		);
	}

	onInputChange(term) {
		this.setState({ term: event.target.value });
		this.props.onSearchTermChange(term);
	}
}

export default SearchBar;