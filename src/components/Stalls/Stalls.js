import React, { Component } from 'react';
import * as stall from '../../actionCreator/stalls';
import Header from '../UI/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import '../Page.css';
import './Stalls.css';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Loader from '../Loader/loader';

class Stalls extends Component {
    componentDidMount(){
        this.props.getStalls();
    }
    render() {
            let vendors, loader;
            console.log(this.props)
            if(this.props.isLoading && !this.props.vendors) loader = <Loader style={{height: '65%'}} />
            else loader = []; 
            if(!this.props.vendors) vendors = [];
            else {
                let openVendors = this.props.vendors.filter(({closed}) => !closed);
                vendors = openVendors.map(({id, name, description}) => {
                    return (
                            <ListItem key={id} alignItems="flex-start" className='stallItem' 
                                onClick={(e) => {
                                e.preventDefault();
                                this.props.getStallItem(id, name);
                                }
                            }>
                                {/* <ListItemAvatar>
                                    <Avatar className="stallImg" calt="Remy Sharp" style={{background: '#ffffff', width: '50px', height: '50px', marginRight: '10px'}} src="" />
                                </ListItemAvatar> */}
                                <ListItemText className="stallName" style={{color: '#ffffff'}} primary={name} secondary={description}/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end">
                                        <ArrowForwardIosIcon style={{fill: 'white'}} />
                                    </IconButton>
                                </ListItemSecondaryAction>
                        </ListItem>
                    )
                })
                console.log(vendors)
            }
            return(
                <div className='Stalls Page'>
                    <Header heading='Stalls' subHeading='Order food using wallet'>
                        <i className="fa fa-search SearchIcon"></i>
                    </Header>
                    {loader}
                    <List>
                        {vendors}
                    </List>
                </div>
            )
            
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({}, stall), dispatch);
};

const mapStateToProps = state => ({
    vendors: state.stall.vendors,
    isLoading: state.loader.isLoading
})


export default connect(mapStateToProps, mapDispatchToProps)(Stalls);