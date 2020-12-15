import React, {Component} from 'react';
import './index.less'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header_log">修炼自己</div>
                <div className="header_user_info">
                    温攀
                </div>
                <div style={{clear:'both'}} />
            </div>
        );
    }
}

export default Header;
