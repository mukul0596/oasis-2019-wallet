import React, { Component } from 'react';

import Header from '../UI/Header/Header';

import '../Page.css';
import './Stalls.css';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@material-ui/core';

class Stalls extends Component {
    render() {
        return (
            <div className='Stalls Page'>
                <Header heading='Stalls' subHeading='Order food using wallet'>
                    <i class="fa fa-search SearchIcon"></i>
                </Header>
                <List>
                    <ListItem alignItems="flex-start" className='stall'>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="" />
                        </ListItemAvatar>
                        <ListItemText className="stallName" primary="Dominos" secondary={<Typography className="stallDes">HELLO</Typography>} />
                    </ListItem>
                    <ListItem alignItems="flex-start" className='menItem'>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="" />
                        </ListItemAvatar>
                        <ListItemText primary="Dominos" secondary={<Typography color="textPrimary">HELLO</Typography>} />
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default Stalls;