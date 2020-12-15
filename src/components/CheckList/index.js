import React, {Component} from 'react';
import {Checkbox, Button, Input, Modal, Badge} from "antd";
import classnames from 'classnames'
import Api from '@/pages/ProgramEdit/api'
import './index.less'

class CheckList extends Component {

    state = {
        current: {},
        visible: false
    }

    handleOpenRecord = (row) => {
        this.setState({
            current: row,
            visible: true

        })
    }

    handleStatusChange = (e, row) => {
        const value = e.target.checked
        const {onRefresh} = this.props;
        Api.taskUpdateStatus({taskId: row.id, status: Number(value)}).then(res => {
            onRefresh()
        })
    }

    render() {
        const {current, visible} = this.state;
        const {data} = this.props;
        const unDoList = data.filter(item => item.status === 0);
        const doneList = data.filter(item => item.status === 1);
        const result = [...unDoList, ...doneList]
        return (
            <div className="check_list">
                <div className="check_list_header">
                    <div style={{width: 400}}>任务</div>
                    <div style={{width: 100}}>优先级</div>
                    <div>指标</div>
                    <div>耗时</div>
                    <div>日记</div>
                </div>
                {result && result.map(item => {
                    return (
                        <div key={item.id} className={classnames('check_list_body', {'gray': !!item.status})}>
                            <div style={{width: 400}}>
                                <Checkbox checked={!!item.status} onChange={(e) => {
                                    this.handleStatusChange(e, item)
                                }}>
                                    {item.name}-<span style={{color: '#bfbdbd'}}>{item.programName}</span>
                                </Checkbox>
                            </div>
                            <div className="check_list_body_level">{item.level}</div>
                            <div>{item.targets}</div>
                            <div>{item.time_of_day || 0} 分钟</div>
                            <div><a onClick={() => {
                                this.handleOpenRecord(item)
                            }}>日记


                            </a><Badge count={!!item.diaryText ? 1 : 0}/></div>
                        </div>
                    )
                })}
                <Modal
                    visible={visible}
                    onCancel={() => {
                        this.setState({visible: false})
                    }}
                    maskClosable={false}
                    closeIcon={' '}
                    // title="写日记"
                >
                    <div className="check_list_body_diary_title">
                        <span>项目：</span><span>{current.programName}</span>
                        <span>里程碑：</span><span>{current.landMarkName}</span>
                        <span>任务：</span><span>{current.name}</span>
                    </div>
                    <Input.TextArea autoSize={{minRows: 10}}/>
                </Modal>
            </div>

        )
            ;
    }
}

export default CheckList;
