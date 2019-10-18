import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './loader.css';

class Loader extends Component {
    render() {
        return (
            <div className="loader" style={this.props.style}>
                <CircularProgress />
            </div>
        )
    }
}


export default Loader; 