import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../UI/Header/Header';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, ListSubheader } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import './More.css'
import '../Page.css';

class More extends Component {
    render() {
        return (
            <div className='More Page'>
                <Header heading='More' subHeading=''>
                </Header>
                <List>
                    <ListItem alignItems="flex-start" className='stallItem' 
                                onClick={(e) => {
                                e.preventDefault();
                            }
                        }>
                        <ListItemText style={{color: '#ffffff'}} primary='Kind Store' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <ArrowForwardIosIcon style={{fill: 'white'}} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem alignItems="flex-start" className='stallItem' 
                                onClick={(e) => {
                                e.preventDefault();
                                this.props.changeActiveTab('Contact')
                            }
                        }>
                        <ListItemText style={{color: '#ffffff'}} primary='Contact Us' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <ArrowForwardIosIcon style={{fill: 'white'}} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem alignItems="flex-start" className='stallItem' 
                                onClick={(e) => {
                                e.preventDefault();
                            }
                        }>
                        <ListItemText style={{color: '#ffffff'}} primary='Developers' />
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <ArrowForwardIosIcon style={{fill: 'white'}} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeActiveTab: (activeTab) => dispatch({ type: 'CHANGE_ACTIVE_TAB', activeTab })
    };
};

export default connect(null, mapDispatchToProps)(More);