import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../UI/Header/Header';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, ListSubheader, ListItemAvatar, Avatar } from '@material-ui/core';

import './Contact.css'
import '../Page.css';

class More extends Component {
    render() {
        const contactArr = ['Tanmaay Chandak', 'Parth Kashikar', 'Adit Chandra', 'Tushar Goel', 'Aditya Pawar', 'Tanvi Gupta', 'Rahul Bubna', 'V Abishek Balaji'];
        const imgArr = [require('../../assets/images/chandak.png'), require('../../assets/images/Parth.jpg'), require('../../assets/images/adit.png'), require('../../assets/images/DVM.png'), require('../../assets/images/pawar.jpg'),
                            require('../../assets/images/tanvi.png'), require('../../assets/images/rahul.jpg'), require('../../assets/images/abhi.jpg')]
        let contacts = contactArr.map((contact, ind) => {
            return (
                <ListItem key={ind} alignItems="flex-start" className='contact' style={{background: '#31365E', padding: '10px', marginBottom: '10px', borderRadius: '12px'}} >
                    <ListItemAvatar>
                        <Avatar className="contactImg" calt="Remy Sharp" style={{background: '#ffffff', width: '50px', height: '50px', marginRight: '10px'}} src={imgArr[ind]} />
                    </ListItemAvatar>
                        <ListItemText className="contactName" style={{color: '#ffffff'}} primary={contact} />
                </ListItem>
            )
        })
        
        return (
            <div className='More Page'>
                <Header heading='Contact Us' subHeading=''>
                    <i className="fa fa-arrow-left" onClick={() => this.props.changeActiveTab('More')}/>
                </Header>
                <List>
                    { contacts }
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