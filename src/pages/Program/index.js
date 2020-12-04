import React, {Component} from 'react';
import {Table, Card, Space, Button,Form,Input,Modal,Select} from 'antd'

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
        visible:false,
        data: [
            {
                name:'1',
                level:2,
                progress:10,
                endTime:'ddd',
                landMasks:3,
            }
        ]
    }

    columns = [
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
            dataIndex: 'progress'
        },
        {
            title: '截止日期',
            dataIndex: 'endTime'
        },
        {
            title:'里程碑数',
            dataIndex: 'landMasks'
        },
        {
            title:'操作',
            dataIndex: 'operate',
            render:(_,row)=>{
                return <Space>
                    <Button type="dashed" onClick={()=>{this.handleEdit(row)}}>编辑</Button>
                    <Button type="primary" onClick={()=>{this.handleToTaskEdit(row)}}>任务</Button>
                    <Button type="danger">删除</Button>
                </Space>
            }
        }

    ]

    handleEdit=(row)=>{
        this.setState({
            current:row,
            visible:true
        })

    }

    handleToTaskEdit=(row)=>{
        const {history}=this.props;
        history.push({
            pathname:'/program_edit',
            state:{...row}
        })

    }

    render() {
        const {data,visible} = this.state
        return (
            <Card>
                <Space size={10} style={{marginBottom: 10}}>
                    <Button type="primary">新增</Button>
                </Space>
                <Table dataSource={data} columns={this.columns}/>
                <Modal visible={visible} onCancel={()=>{this.setState({visible: false})}}>
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
                            <Input />
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
                    </Form>
                </Modal>
            </Card>
        );
    }
}

export default Program;
