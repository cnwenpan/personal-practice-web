import React, {Component} from 'react';
import {Checkbox, Input, Modal} from "antd";
import classnames from 'classnames'
import Api from '@/pages/ProgramEdit/api'
import DiaryApi from '@/pages/Diary/api'
import E from 'wangeditor'

import './index.less'

class CheckList extends Component {
    richTextRef = null;
    richText = null;
    state = {
        current: {},
        visible: false
    }

    handleOpenRecord = (row) => {
        this.setState({
            current: row,
            visible: true
        },
        //     () => {
        //
        //     if (!this.richText) {
        //         this.richText = new E(this.richTextRef);
        //         this.richText.config.onchange = this.handleDiaryChange
        //         this.richText.create()
        //
        //     }
        //
        //     this.richText.txt.html(row.diaryText)
        //
        // }
        )
    }

    handleStatusChange = (e, row) => {
        const value = e.target.checked
        const {onRefresh} = this.props;
        Api.taskUpdateStatus({taskId: row.id, status: Number(value)}).then(res => {
            onRefresh()
        })
    }

    handleSave = () => {
        const {current} = this.state;
        if (current.diaryId) {
            DiaryApi.update({id: current.diaryId, data: current.diaryText}).then(res => {

            })
        } else {
            DiaryApi.add({taskId: current.id, data: current.diaryText}).then(res => {

            })
        }

    }
    handleDiaryChange = (e) => {
        const value=e.target.value
        const {current} = this.state;
        current.diaryText =value
        this.setState({
            current
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

                            <div className="check_list_body_level">{item.level.toUpperCase()}</div>
                            <div>{item.targets}</div>
                            <div>{item.time_of_day || 0} 分钟</div>
                            <div>
                                <a onClick={() => {
                                    this.handleOpenRecord(item)
                                }}>
                                    日记
                                </a>
                                <span className="check_list_body_diary_count">{!!item.diaryText ? 1 : 0}</span>
                            </div>
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
                    onOk={this.handleSave}
                    // title="写日记"
                >
                    <div className="check_list_body_diary_title">
                        <span>项目：</span><span>{current.programName}</span>
                        <span>里程碑：</span><span>{current.landMarkName}</span>
                        <span>任务：</span><span>{current.name}</span>
                    </div>
                    <Input.TextArea value={current.diaryText} onChange={this.handleDiaryChange}
                                    autoSize={{minRows: 10}}/>
                    {/*<div ref={ref => this.richTextRef = ref}>*/}

                    {/*</div>*/}
                </Modal>
            </div>

        )
            ;
    }
}

export default CheckList;
