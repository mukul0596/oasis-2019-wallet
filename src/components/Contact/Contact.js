import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../UI/Header/Header';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

import '../Page.css';
import './Contact.css'

class More extends Component {
    render() {
        const contactArr = ['Tanmaay Chandak', 'Parth Kashikar', 'Adit Chandra', 'Tushar Goel', 'Aditya Pawar', 'Tanvi Gupta', 'Rahul Bubna', 'V Abishek Balaji'];
        const imgArr = [require('../../assets/images/chandak.png'), require('../../assets/images/Parth.jpg'), require('../../assets/images/adit.png'), require('../../assets/images/DVM.png'), require('../../assets/images/pawar.jpg'),
                            require('../../assets/images/tanvi.png'), require('../../assets/images/rahul.jpg'), require('../../assets/images/abhi.jpg')]
        const dept = ['Registration, Events & Other Enquiries', 'Logistics and Operations', 'Sponsorship and Marketing',
                            'Website, App & Online Payments', 'Online Collaborations and Publicity', 'Reception and Accomodation',
                                'Student Union President', 'Student Union General Secretary']
        const phone = ['+91 9405010405', '+91 9686011770', '+91 8290801301', '+91 9694345679', '+91 9829971666', '+91 9057232223', '+91 8952824766', '+91 9566142660' ]
        const email = ['pcr@bits-oasis.org', 'controls@bits-oasis.org', 'sponsorship@bits-oasis.org', 'webmaster@bits-oasis.org', 'adp@bits-oasis.org', 'recnacc@bits-oasis.org', 'President@pilani.bits-pilani.ac.in', 'gensec@pilani.bits-pilani.ac.in' ]
        
        let contacts = contactArr.map((contact, ind) => {
            return (
                <ListItem key={ind} alignItems="flex-start" className='contact' style={{background: '#31365E', padding: '10px', marginBottom: '10px', borderRadius: '12px'}} >
                    <ListItemAvatar>
                        <Avatar className="contactImg" calt="Remy Sharp" style={{background: '#ffffff', width: '60px', height: '60px', marginRight: '10px'}} src={imgArr[ind]} />
                    </ListItemAvatar>
                        <ListItemText className="contactName" style={{color: '#ffffff'}} primary={contact} secondary={<span>{dept[ind]}<br />{phone[ind]}<br />{email[ind]}</span>} />
                </ListItem>
            )
        })
        
        return (
            <div className='More Page FullPage'>
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