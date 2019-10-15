import React, { Component } from 'react';
import * as stall from '../../actionCreator/stalls';
import Header from '../UI/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import '../Page.css';

class StallItem extends Component {
   render() {
       return(
            <div className="stallMenu Page">
                <Header heading='Stalls' subHeading='Order food using wallet'>
                    <i className="fa fa-search SearchIcon"></i>
                </Header>
            </div>
       );
   }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({}, stall), dispatch);
};

const mapStateToProps = state => ({
    menu: state.stall.menu
})


export default connect(mapStateToProps, mapDispatchToProps)(StallItem);