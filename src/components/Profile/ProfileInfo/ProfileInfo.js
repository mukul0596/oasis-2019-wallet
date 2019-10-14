import React from 'react';
import QRCode from 'qrcode-react';

import './ProfileInfo.css';

const profileInfo = (props) => {
    return (
        <div className='ProfileInfo'>
            <div className='UserInfo'>
                <div className='UserName'>{ props.userName }</div>
                <div className='UserId'>User Id: { props.userId }</div>
                <div className='WalletInfo'>
                    <div className='WalletMoney'>
                        <div>&#8377;{ props.walletMoney }</div>
                        Wallet(Stalls)
                    </div>
                    <div className='WalletTokens'>
                        <div>{ props.walletTokens }</div>
                        Token
                    </div>
                </div>
            </div>
            <div className='QRCode'>
                <QRCode value={ props.qrCode } bgcolor='#31365E' fgcolor='#ffffff' size={76} />
            </div>
        </div>
    )
}

export default profileInfo;