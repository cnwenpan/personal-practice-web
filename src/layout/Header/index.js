import React, {Component} from 'react';
import {Dropdown, Menu} from 'antd'
import cookies from 'js-cookie'
import './index.less'

class Header extends Component {
    state = {
        user: {}
    }
    handleLogout = () => {
        cookies.remove('token');
        window.location.href = '/#/login'
    }

    componentDidMount() {
        try {
            const user = JSON.parse(cookies.get('user'))
            this.setState({
                user
            })
        } catch (e) {

        }
    }

    render() {
        const {user}=this.state;
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
                        <span>{user.name}</span>
                    </Dropdown>
                </div>
                <div style={{clear: 'both'}}/>
            </div>
        );
    }
}

export default Header;
