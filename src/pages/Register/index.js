import React, {Component} from 'react';
import {Form, Input, Button} from 'antd'
import {RollbackOutlined} from '@ant-design/icons';
import md5 from 'md5'
import Api from './api'
import './index.less'

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};

class Register extends Component {

    formRef = React.createRef();

    handleToLogin = () => {
        const {history} = this.props;
        history.push({
            pathname: '/login'
        })
    }

    handleSave = () => {
        this.formRef.current.validateFields().then(values => {
            const password = md5(values.password)
            Api.register({...values, password}).then(res => {

            }).catch(e => {
                return Promise.reject(e)
            })
        }).catch(e => {
            console.log(e)
        })
    }

    render() {
        return (
            <div className="register_container">
                <div className="register_content">
                    <div className="register_title"><span style={{fontWeight: 'bold'}}>管理自己</span>-注册</div>
                    <Form {...layout} ref={this.formRef} name="control-ref">
                        <Form.Item
                            name="account"
                            label="账号"
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
                            <Input type="text"/>

                        </Form.Item>
                        <Form.Item
                            name="passwordRepeat"
                            label="确认密码"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    validator: (_, value) => {
                                        const originPassword = this.formRef.current.getFieldValue('password');
                                        return value === originPassword ? Promise.resolve() : Promise.reject('密码不一致')
                                    }
                                },
                            ]}
                        >
                            <Input type="text"/>

                        </Form.Item>
                    </Form>
                    <div className="register_operate">
                        <Button type="dashed" onClick={this.handleToLogin}><RollbackOutlined/>返回登录页</Button>
                        <Button type="primary" onClick={this.handleSave}>保存</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
