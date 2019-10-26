import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../UI/Header/Header';
import * as kindStore from '../../actionCreator/kindStore';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { bindActionCreators } from 'redux'

import '../Page.css';
import './KindStore.css'
import Loader from '../Loader/loader';

class More extends Component {

    componentDidMount() {
        this.props.getKindStoreItems();
    }

    render() {
        let items, back;
        let loader;
        if(this.props.isLoading && !this.props.items) {
            loader = <Loader style={{height: '80%'}} />;
            back = [];
        }
        else { 
            loader = [];
            back = <i className="fa fa-arrow-left" onClick={() => this.props.changeActiveTab('More')}/>;
        }
        if(this.props.items) {
            items = this.props.items.items_list.map((item, ind) => {
                return (
                    <ListItem key={ind} alignItems="flex-start" className='contact' style={{background: '#31365E', padding: '16px', marginBottom: '10px', borderRadius: '12px'}} >
                        <ListItemText style={{color: '#ffffff'}} primary={item} />
                        <ListItemSecondaryAction>
                            <div edge="end" style={{color: '#ffffff'}}>
                                { this.props.items[item].price }
                            </div>
                        </ListItemSecondaryAction>  
                    </ListItem>
                )
            })
        }
        else items = [];
        return (
            <div className='More Page'>
                <Header heading='Kind Store' subHeading=''>
                    {back}
                </Header>
                {loader}
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
        items: state.kindStore.kindStoreItems,
        isLoading: state.loader.isLoading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(More);