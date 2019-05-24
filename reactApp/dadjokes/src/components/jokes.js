
import React, { Component } from "react";
import axios from 'axios';
import requiresAuth from '../auth/requiresAuth';

class Jokes extends Component {
    state = {
        jokes: []
    };

    componentDidMount() {
        axios
            .get('/jokes')
            .then(res => {
                this.setState({
                    jokes: res.data
                });
            })
            .catch(error => console.error(error));
    }

    render() {
        return (
            <>
                <h1 className = 'dadJokeLabel'>Dad Jokes</h1>
                <ul>
                    {this.state.jokes.map(j => (
                        <p key={j.id}>
                            {j.joke}
                        </p>
                    ))}
                </ul>
            </>
        );
    }
}

export default requiresAuth( Jokes );