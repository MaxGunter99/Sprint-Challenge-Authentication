import axios from "axios";
import React from "react";

axios.defaults.baseURL = "http://localhost:3300/api";

axios.interceptors.request.use(
    function (options) {
        options.headers.authorization = localStorage.getItem('jwt');
        return options;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default function (Component) {
    return class Authenticated extends React.Component {
        render() {
            const token = localStorage.getItem('jwt');
            const notLoggedIn = <div className = 'notAccepted'>Please Login to see the Dad Jokes</div>;
            return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
        }
    };
}