import React, { Component } from 'react';
import Axios from '../../../axios';
import { Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import './Posts.css';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        // console.log(this.props);
        Axios.get('posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Seb'
                    };
                });
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                // console.log(error);
                // this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push('/posts/' + id);
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Ooops, something went wrong...</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={ '/posts/' + post.id } key={ post.id }>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;
