import React, {Component} from 'react';
import {Form, Input,Button} from 'antd'
import './index.less'

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};


class Login extends Component {
    formRef = React.createRef();
    handleToRegister=()=>{
        const {history} = this.props;
        history.push({
            pathname:'/register',
        })
    }
    render() {
        return (
            <div className="login_container">
                <div className="login_content">
                    <div className="login_title"><span style={{fontWeight:'bold'}}>管理自己</span>-登录</div>
                    <Form {...layout} ref={this.formRef} name="control-ref">
                        <Form.Item
                            name="name"
                            label="用户名"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input type="password"/>

                        </Form.Item>
                    </Form>
                    <div className="login_operate">
                        <Button type="dashed" onClick={this.handleToRegister}>注册</Button>
                        <Button type="primary">登录</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
