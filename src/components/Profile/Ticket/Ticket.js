import React from 'react';

import Button from "../../UI/Button/Button";

import './Ticket.css';

const ticket = (props) => {
    let tBody;
    if ( props.userTickets )
    tBody = props.userTickets.map(ticket => {
       return (
            <tr key={ticket.id}>
                <td>{ ticket.show_name.replace('Prof Show', '') }</td>
                <td>{ ticket.used_count }</td>
                <td>{ ticket.unused_count+ticket.used_count }</td>
            </tr>
        )
    });
    console.log(tBody);
    return (
        <div className='Ticket'>
            <div className='TicketHeading'>Tickets</div>
            <table className='TicketsTable'>
                <thead>
                    <tr>
                        <td>Events</td>
                        <td>Used</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    { tBody }
                    {/* <tr>
                        <td>Sunidhi Chauhan</td>
                        <td>{ props.sunidhiChauhanUsed }</td>
                        <td>{ props.sunidhiChauhanTotal }</td>
                    </tr>
                    <tr>
                        <td>Biswa</td>
                        <td>{ props.biswaUsed }</td>
                        <td>{ props.biswaTotal }</td>
                    </tr>
                    <tr>
                        <td>Nucleya</td>
                        <td>{ props.nucleyaUsed }</td>
                        <td>{ props.nucleyaTotal }</td>
                    </tr> */}
                </tbody>
            </table>
            <Button click={ props.openBuyTicketHandler }>Buy Tickets</Button>
        </div>
    )
}

export default ticket;