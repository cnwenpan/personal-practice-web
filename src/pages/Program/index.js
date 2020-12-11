import React, {Component} from 'react';
import {Table, Card, Space, Button, Form, Input, Modal, Select, DatePicker, message} from 'antd'
import moment from 'moment'
import Api from './api'
import './index.less'

const {Option} = Select;

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};

class Program extends Component {
    formRef = React.createRef();
    state = {
        visible: false,
        data: []
    }

    columns = [
        {
            title: '状态',
            dataIndex: 'start_time',
            render: (value, row) => {
                if (value) {
                    return <div style={{backgroundColor:'#52C41A',width: 12, height: 12, borderRadius: '50%'}}/>
                }else{
                    return <div style={{backgroundColor:'gray',width: 12, height: 12, borderRadius: '50%'}}/>
                }
            }
        },
        {
            title: '项目名',
            dataIndex: 'name'
        },
        {
            title: '优先级',
            dataIndex: 'level'
        },
        {
            title: '进度',
            dataIndex: 'progress',
            render: (value) => value || 0
        },
        {
            title: '截止日期',
            dataIndex: 'end_time',
            render: (value, row) => {
                return moment(value).format('YYYY-MM-DD hh:mm:ss')
            }
        },
        {
            title: '里程碑数',
            dataIndex: 'landMasks',
            render: (value) => value || 0
        },
        {
            title: '操作',
            dataIndex: 'operate',
            render: (_, row) => {
                return <Space>

                    {!row.start_time&&<Button style={{backgroundColor:'#52C41A',color:'#ffffff'}} type="dashed" onClick={() => {
                        this.handleStartUp(row)
                    }}>启动</Button>}
                    <Button type="dashed" onClick={() => {
                        this.handleEdit(row)
                    }}>编辑</Button>
                    <Button type="primary" onClick={() => {
                        this.handleToTaskEdit(row)
                    }}>任务</Button>
                    <Button type="danger">删除</Button>
                </Space>
            }
        }

    ]

    componentDidMount() {
        this.query()
    }

    query = () => {
        Api.list().then(data => {
            this.setState({
                data,
            })
        }).catch(e => {

        })
    }

    handleEdit = (row) => {
        this.setState({
            current: row,
            visible: true
        }, () => {
            this.formRef.current.setFieldsValue({
                name: row.name,
                level: row.level,
                endTime: moment(row.end_time)
            })
        })


    }

    handleToTaskEdit = (row) => {
        const {history} = this.props;
        history.push({
            pathname: '/program_edit',
            state: {...row}
        })

    }

    handleStartUp = (row) => {
        Api.startUp({id: row.id}).then(res => {
            this.query()
        })
    }

    handleSave = () => {
        this.formRef.current.validateFields().then(values => {
            const {current} = this.state;
            if (current.id) {
                Api.update({...current}, ...values).then(res => {
                    this.query()
                    this.setState({
                        visible: false
                    })
                })
            } else {
                Api.add(values).then(res => {
                    this.query()
                    this.setState({
                        visible: false
                    })
                })
            }

        }).catch(e => {
            message.info(e.toString())
        })
    }
    renderStatus=(record)=>{
        // if(record.start_time){
        //     return 'program_active'
        // }else{
        //     return 'program_waiting'
        // }
    }

    render() {
        const {data, visible} = this.state
        return (
            <Card>
                <Space size={10} style={{marginBottom: 10}}>
                    <Button type="primary" onClick={() => {
                        this.handleEdit({})
                    }}>新增</Button>
                </Space>
                <Table dataSource={data} columns={this.columns} rowClassName={this.renderStatus}/>
                <Modal
                    visible={visible}
                    onCancel={() => {
                        this.setState({visible: false})
                    }}
                    onOk={this.handleSave}
                >
                    <Form {...layout} ref={this.formRef} name="control-ref">
                        <Form.Item
                            name="name"
                            label="项目名"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="level"
                            label="优先级"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select>
                                <Option value="s">S</Option>
                                <Option value="a">A</Option>
                                <Option value="b">B</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="endTime"
                            label="结束时间"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        );
    }
}

export default Program;
