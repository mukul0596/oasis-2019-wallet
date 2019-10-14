import React from 'react';

import './Ticket.css';

const ticket = (props) => {
    return (
        <div className='Ticket'>
            <div className='TicketHeading'>Tickets</div>
            <table className='TicketsTable'>
                <thead>
                    <td>Events</td>
                    <td>Used</td>
                    <td>Total</td>
                </thead>
                <tr>
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
                </tr>
            </table>
            <button className='TransactionButton'>Buy Tickets</button>
        </div>
    )
}

export default ticket;