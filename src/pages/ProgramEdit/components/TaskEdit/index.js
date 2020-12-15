import React, {Component} from 'react';
import {Button, Switch, Space, Table, Form, Input, Modal, DatePicker} from 'antd'
import moment from "moment";
import Api from '../../api'

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};

class TaskEdit extends Component {
    formRef = React.createRef();
    state = {
        data: [],
        visible: false
    }
    columns = [
        {
            title: '任务名',
            dataIndex: 'name'
        },
        {
            title: '指标',
            dataIndex: 'targets'
        },
        {
            title: '是否重复',
            dataIndex: 'is_repeat',
            render: (value, row) => {
                return value ? '是' : '否'
            }
        },
        {
            title: '时间',
            dataIndex: 'start_time',
            render: (value, row) => {
                return moment(value).format('YYYY-MM-DD hh:mm:ss/')
            }
        },
        {
            title: '描述',
            dataIndex: 'description'
        },
        {
            title: '操作',
            dataIndex: 'operate',
            render: (_, row) => {
                return <Space>
                    <Button type="dashed" onClick={() => {
                        this.handleEdit(row)
                    }}>编辑</Button>
                    {/*<Button type="primary" onClick={() => {*/}
                    {/*    this.handleToTaskEdit(row)*/}
                    {/*}}>启动</Button>*/}
                    <Button type="danger" onClick={() => {
                        this.handleDel(row)
                    }}>删除</Button>
                </Space>
            }
        }
    ]

    componentDidMount() {
        this.query()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.landMark.id !== this.props.landMark.id) {
            this.query(nextProps)
        }

    }

    handleDel = (row) => {
        Api.taskDel({id: row.id}).then(res => {
            this.query()
        }).catch(e => {
            console.log(e)
        })
    }

    query(nextProps) {
        const {landMark} = nextProps || this.props
        Api.taskList({landMarkId: landMark.id}).then(res => {
            this.setState({
                data: res
            })
        })
    }

    handleSave = () => {
        const {landMark, onSuccess} = this.props;
        const {current} = this.state;
        this.formRef.current.validateFields().then(values => {
            if (current.id) {
                Api.taskUpdate({...current, ...values}).then(res => {
                    this.query()
                    onSuccess()
                    this.setState({
                        visible: false
                    })
                })
            } else {
                Api.taskAdd({...values, landMarkId: landMark.id}).then(res => {
                    this.query()
                    onSuccess()
                    this.setState({
                        visible: false
                    })
                })

            }

        }).catch(e => {
            console.log(e)
        })

    }

    handleEdit = (row) => {
        this.setState({
            current: row,
            visible: true
        }, () => {
            this.formRef.current.setFieldsValue({
                name: row.name,
                startTime: moment(row.start_time),
                repeat: Boolean(row.is_repeat),
                targets: row.targets,
                description: row.description
            })
        })

    }

    render() {
        const {data, visible} = this.state;
        return (
            <div>
                <Space style={{marginBottom: 10}}>
                    <Button type="primary" onClick={() => {
                        this.handleEdit({})
                    }}>新增</Button>
                </Space>
                <Table dataSource={data} columns={this.columns}/>
                <Modal
                    title="任务编辑"
                    visible={visible}
                    onCancel={() => {
                        this.setState({visible: false})
                    }}
                    onOk={this.handleSave}
                >
                    <Form {...layout} ref={this.formRef} name="control-ref">
                        <Form.Item
                            name="name"
                            label="任务名"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="startTime"
                            label="时间"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item
                            name="repeat"
                            label="是否重复"
                            // rules={[
                            //     {
                            //         required: true,
                            //     },
                            // ]}
                        >
                            <Switch/>
                        </Form.Item>
                        <Form.Item
                            name="time_of_day"
                            label="单日耗时(分)"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="targets"
                            label="指标"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="描述"

                        >
                            <Input/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default TaskEdit;
