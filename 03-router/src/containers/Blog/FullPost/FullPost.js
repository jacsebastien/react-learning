import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    componentDidMount() {
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        // Test to avoid infinite loop update
        if (this.props.match.params.id && (!this.state.loadedPost || this.state.loadedPost.id !== +this.props.match.params.id)) {
            Axios.get('posts/' + this.props.match.params.id)
                .then(response => {
                    // console.log(response);
                    this.setState({ loadedPost: response.data });
                });
        }
    }

    deletePostHandler = () => {
        Axios.delete('posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            });
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post !</p>;

        if (this.props.match.params.id) {
            post = <p style={{ textAlign: 'center' }}>Loading ...</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }

        return post;
    }
}

export default FullPost;
