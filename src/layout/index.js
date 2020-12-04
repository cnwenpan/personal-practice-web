import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Card} from 'antd';
import {Link} from 'react-router-dom'
import 'antd/dist/antd.css';
import Header from "./Header";
import routeConfig from '../Route'

const {Content, Sider} = Layout;

class Structure extends Component {
    render() {
        return (
            <Layout>
                <Header/>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={[routeConfig[0]['path']]}
                            style={{height: '100%', borderRight: 0}}
                        >
                            {/*<SubMenu key="sub1" icon={<UserOutlined/>} title="subnav 1">*/}
                            {
                                routeConfig.map(item => {
                                    if (!item.hidden) {
                                        return <Menu.Item key={item.path}> <Link
                                            to={item.path}>{item.name}</Link></Menu.Item>
                                    }

                                })
                            }


                            {/*</SubMenu>*/}

                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                        {/*</Breadcrumb>*/}
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >

                            {this.props.children}

                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Structure;
