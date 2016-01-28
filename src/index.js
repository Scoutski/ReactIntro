import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/searchBar';
import VideoList from './components/videoList';
import VideoDetail from './components/videoDetail';

const API_KEY = "AIzaSyC-QoelcRmPnKiiwEZm9gobXrhHNl9R6lM";

// Create a new component. This component should produce
// some HTML.

// () => is the ES6 functional declaration.
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('triple j like a version');
	}

	videoSearch(term) {
		YTSearch({
			key: API_KEY,
			term: term
		}, (videos) => {
			this.setState({
			 videos: videos,
			 selectedVideo: videos[0]
			});
			// this will resolve as "this.setState({ videos: videos });"
			// Note: Updating state will rerender the component.
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>
		);
	}
}

// Take this component's generated HTML and put it
// on the page (in the DOM).
ReactDOM.render(<App />, document.querySelector('.container'));

// <App /> instantiates the class App.