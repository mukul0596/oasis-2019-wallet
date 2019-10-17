import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../UI/Header/Header';
import * as kindStore from '../../actionCreator/kindStore';
import { List, ListItem, ListItemText } from '@material-ui/core';

import '../Page.css';
import './KindStore.css'

class More extends Component {

    componentDidMount() {
        this.props.getKindStoreItems();
    }

    render() {
        let items;

        if(this.props.kindStore) {
            items = contactArr.map((contact, ind) => {
                return (
                    <ListItem key={ind} alignItems="flex-start" className='contact' style={{background: '#31365E', padding: '10px', marginBottom: '10px', borderRadius: '12px'}} >
                        <ListItemText className="contactName" style={{color: '#ffffff'}} primary='Hi' secondary='Hi' />
                    </ListItem>
                )
            })
        }
        else items = [];
        return (
            <div className='More Page'>
                <Header heading='Kind Store' subHeading=''>
                    <i className="fa fa-arrow-left" onClick={() => this.props.changeActiveTab('More')}/>
                </Header>
                <List>
                    { items }
                </List>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    const action = bindActionCreators(Object.assign({}, kindStore), dispatch);
    return {
        ...action,
        changeActiveTab: (activeTab) => dispatch({ type: 'CHANGE_ACTIVE_TAB', activeTab })
    };
};

const mapStateToProps = state => {
    return {
        kindStore: state.kindStore
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(More);