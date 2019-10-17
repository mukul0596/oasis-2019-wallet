import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../UI/Header/Header';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

import '../Page.css';

class More extends Component {
    render() {
        return (
            <div className='More Page FullPage'>
                <Header heading='Developers' subHeading=''>
                    <i className="fa fa-arrow-left" onClick={() => this.props.changeActiveTab('More')}/>
                </Header>
                <List>
                    <ListItem alignItems="flex-start" className='contact' style={{background: '#31365E', padding: '10px', marginBottom: '10px', borderRadius: '12px'}} >
                        <ListItemAvatar>
                            <Avatar className="contactImg" calt="Remy Sharp" style={{background: '#ffffff', width: '60px', height: '60px', marginRight: '10px'}} src={require('../../assets/images/Developers/chirag.jpg')} />
                        </ListItemAvatar>
                            <ListItemText className="contactName" style={{color: '#ffffff'}} primary='Chirag Singhal' secondary={<span>Frontend Developer<br /><i onClick={(e) => {
                                    e.preventDefault();
                                    window.open('https://www.linkedin.com/in/chirag-singhal-389a6a16a/', "_blank")
                                }} 
                                className="fa fa-linkedin-square" style={{fontSize: '20px', marginRight: '10px'}} /><i onClick={(e) => {
                                    e.preventDefault();
                                    window.open('https://github.com/chirag-singhal', "_blank")
                                }} 
                                className="fa fa-github-square" style={{fontSize: '20px'}} /></span>} />
                    </ListItem>
                    <ListItem alignItems="flex-start" className='contact' style={{background: '#31365E', padding: '10px', marginBottom: '10px', borderRadius: '12px'}} >
                        <ListItemAvatar>
                            <Avatar className="contactImg" calt="Remy Sharp" style={{background: '#ffffff', width: '60px', height: '60px', marginRight: '10px'}} src={require('../../assets/images/Developers/mukul.jpg')} />
                        </ListItemAvatar>
                            <ListItemText className="contactName" style={{color: '#ffffff'}} primary='Mukul Gupta' secondary={<span>Frontend Developer<br /><i onClick={(e) => {
                                    e.preventDefault();
                                    window.open('https://www.linkedin.com/in/mukul-gupta-7931b4171/', "_blank")
                                }} 
                                    className="fa fa-linkedin-square" style={{fontSize: '20px', marginRight: '10px'}} />
                                <i onClick={(e) => {
                                    e.preventDefault();
                                    window.open('https://github.com/mukul0596', "_blank")
                                }} 
                                    className="fa fa-github-square" style={{fontSize: '20px'}} /></span>} />
                    </ListItem>
                    <ListItem alignItems="flex-start" className='contact' style={{background: '#31365E', padding: '10px', marginBottom: '10px', borderRadius: '12px'}} >
                        <ListItemAvatar>
                            <Avatar className="contactImg" calt="Remy Sharp" style={{background: '#ffffff', width: '60px', height: '60px', marginRight: '10px'}} src={require('../../assets/images/Developers/pradyumna.jpg')} />
                        </ListItemAvatar>
                            <ListItemText className="contactName" style={{color: '#ffffff'}} primary='Pradyumna Bang' secondary={<span>Backend Developer<br /><i onClick={(e) => {
                                    e.preventDefault();
                                    window.open('https://www.linkedin.com/in/pradyumna-bang-28011b168/', "_blank")
                                }} 
                                className="fa fa-linkedin-square" style={{fontSize: '20px', marginRight: '10px'}} /><i onClick={(e) => {
                                    e.preventDefault();
                                    window.open('https://github.com/bangpradyumna/', "_blank")
                                }} 
                                className="fa fa-github-square" style={{fontSize: '20px'}} /></span>} />
                    </ListItem>
                    <ListItem alignItems="flex-start" className='contact' style={{background: '#31365E', padding: '10px', marginBottom: '10px', borderRadius: '12px'}} >
                        <ListItemAvatar>
                            <Avatar className="contactImg" calt="Remy Sharp" style={{background: '#ffffff', width: '60px', height: '60px', marginRight: '10px'}} src={require('../../assets/images/Developers/dushyant.jpg')} />
                        </ListItemAvatar>
                            <ListItemText className="contactName" style={{color: '#ffffff'}} primary='Dushyant Yadav' secondary={<span>Backend Developer<br /><i onClick={(e) => {
                                    e.preventDefault();
                                    window.open('http://www.linkedin.com/in/dushyant9309', "_blank")
                                }} 
                                className="fa fa-linkedin-square" style={{fontSize: '20px', marginRight: '10px'}} /><i onClick={(e) => {
                                    e.preventDefault();
                                    window.open('http://www.github.com/dush-t', "_blank")
                                }} 
                                className="fa fa-github-square" style={{fontSize: '20px'}} /></span>} />
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