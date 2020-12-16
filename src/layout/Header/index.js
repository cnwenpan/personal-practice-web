import React, {Component} from 'react';
import {Dropdown, Menu} from 'antd'
import cookies from 'js-cookie'
import './index.less'

class Header extends Component {
    handleLogout = () => {
        cookies.remove('token');
        window.location.href = '/#/login'
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={this.handleLogout}>
                        退出
                    </a>
                </Menu.Item>

            </Menu>
        );
        return (
            <div className="header">
                <div className="header_log">修炼自己</div>

                <div className="header_user_info">
                    <Dropdown arrow overlay={menu}>
                        <span>温攀</span>
                    </Dropdown>
                </div>
                <div style={{clear: 'both'}}/>
            </div>
        );
    }
}

export default Header;
