import React, {Component} from 'react';
import {Dropdown, Menu} from 'antd'
import cookies from 'js-cookie'
import './index.less'

class Header extends Component {

    handleLogout = () => {
        cookies.remove('token');
        window.location.href = '/#/login'
    }

    componentDidMount() {

    }

    render() {
        let user;
        try {
            user = JSON.parse(cookies.get('user'))

        } catch (e) {
            user={}
        }
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
                        <span>{user.name||'佚名'}</span>
                    </Dropdown>
                </div>
                <div style={{clear: 'both'}}/>
            </div>
        );
    }
}

export default Header;
