
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
                <h2>Dad Jokes</h2>
                <ul>
                    {this.state.jokes.map(j => (
                        <li key={j.id}>
                            {j.joke}
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

export default requiresAuth( Jokes );