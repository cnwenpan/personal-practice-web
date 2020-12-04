import React, {Component} from 'react';
import {Button, Card, Space, Table} from 'antd'

class TaskEdit extends Component {
    state = {
        data: []
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
                    }}>任务</Button>
                    <Button type="danger">删除</Button>
                </Space>
            }
        }
    ]

    render() {
        const {data} = this.state;
        return (
            <div>
                <Space style={{marginBottom:10}}>
                    <Button type="primary">新增</Button>
                </Space>
                <Table dataSource={data} columns={this.columns}/>
            </div>
        );
    }
}

export default TaskEdit;
