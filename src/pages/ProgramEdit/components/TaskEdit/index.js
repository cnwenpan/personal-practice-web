import React, {Component} from 'react';
import {Button, Switch, Space, Table, Form, Input, Modal, DatePicker} from 'antd'
import moment from "moment";

const layout = {
    labelCol: {
        span: 4,
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
            dataIndex: 'level'
        },
        {
            title: '是否重复',
            dataIndex: 'progress'
        },
        {
            title: '时间',
            dataIndex: 'endTime'
        },
        {
            title: '备注',
            dataIndex: 'landMasks'
        },
        {
            title: '操作',
            dataIndex: 'operate',
            render: (_, row) => {
                return <Space>
                    <Button type="dashed" onClick={() => {
                        this.handleEdit(row)
                    }}>编辑</Button>
                    <Button type="primary" onClick={() => {
                        this.handleToTaskEdit(row)
                    }}>启动</Button>
                    <Button type="danger">删除</Button>
                </Space>
            }
        }
    ]

    handleSave = () => {

    }

    handleEdit = (row) => {
        this.setState({
            current: row,
            visible: true
        }, () => {
            this.formRef.current.setFieldsValue({
                name: row.name,
                starTime: moment(row.start_time),
                repeat: row.repeat,
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
                            name="starTime"
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
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Switch/>
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
