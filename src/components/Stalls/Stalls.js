import React, { Component } from 'react';
import * as stall from '../../actionCreator/stalls';
import Header from '../UI/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import '../Page.css';
import './Stalls.css';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, ListItemSecondaryAction, IconButton, makeStyles } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Stalls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    componentDidMount() {
        console.log(this.props)        
    }
    componentDidUpdate() {
        let vendors = this.props.getStalls();
        
        console.log(this.props)
    }
    shouldComponentUpdate() {
        console.log(this.props)
    }
    render() {
            let vendors;
            console.log(this.props)
            if(!this.props.vendors || !this.props.vendors) vendors = [];
            else {
                let openVendors = this.props.vendors.filter(({closed}) => !closed);
                vendors = openVendors.map(({id, name}) => {
                    /* eslint-disable-line */<ListItem alignItems="flex-start" className='stallItem'>
                        <ListItemAvatar>
                            <Avatar className="stallImg" calt="Remy Sharp" style={{background: '#ffffff', width: '50px', height: '50px', marginRight: '10px'}} src="" />
                        </ListItemAvatar>
                        <ListItemText className="stallName" style={{color: '#ffffff'}} primary={name} secondary="HELLO"/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <ArrowForwardIosIcon style={{fill: 'white'}} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                })
                console.log(vendors)
            }
            return(
                <div className='Stalls Page'>
                    <Header heading='Stalls' subHeading='Order food using wallet'>
                        <i className="fa fa-search SearchIcon"></i>
                    </Header>
                    <List>
                        {vendors}
                        <ListItem alignItems="flex-start" className='stallItem'>
                            <ListItemAvatar>
                                <Avatar className="stallImg" calt="Remy Sharp" style={{background: '#ffffff', width: '50px', height: '50px', marginRight: '10px'}} src="" />
                            </ListItemAvatar>
                            <ListItemText className="stallName" style={{color: '#ffffff'}} primary="Dominos" secondary="HELLO"/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <ArrowForwardIosIcon style={{fill: 'white'}} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem alignItems="flex-start" className='stallItem'>
                            <ListItemAvatar>
                                <Avatar className="stallImg" alt="Remy Sharp" src="" />
                            </ListItemAvatar>
                            <ListItemText className="stallName" primary="Dominos" secondary="HELLO" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <ArrowForwardIosIcon style={{fill: 'white'}} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </div>
            )
            
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({}, stall), dispatch);
};

const mapStateToProps = state => ({
    vendors: state.vendors
})


export default connect(mapStateToProps, mapDispatchToProps)(Stalls);