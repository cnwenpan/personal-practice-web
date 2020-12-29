import React, {Component} from 'react';
import {Checkbox, Slider, Modal, message} from "antd";
import classnames from 'classnames'
import Api from '@/pages/ProgramEdit/api'
import DiaryApi from '@/pages/Diary/api'
import RichText, {getHtml, toRich} from '../RichText'
import moment from 'moment'
import FocusModal from '../FocusModal'
import './index.less'

class CheckList extends Component {
    richTextRef = null;
    richText = null;
    state = {
        current: {},
        visible: false,
        focusVisible: false
    }

    handleOpenRecord = (row) => {
        this.setState({
                current: {...row, diaryText: toRich(row.diaryText)},
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
        const {onRefresh} = this.props;
        if (row.is_repeat === 0) {
            if (row.progress !== 100) {
                message.info('进度必须完成，才能完成任务。')
                return
            }
        }
        Api.taskUpdateStatus({recordId: row.id, isRepeat: row.is_repeat}).then(res => {
            onRefresh()
        })
    }

    handleSave = () => {
        const {current} = this.state;
        current.diaryText = getHtml(current.diaryText)
        if (current.diaryId) {
            DiaryApi.update({id: current.diaryId, data: current.diaryText}).then(res => {
                this.setState({
                    visible: false
                })
            })
        } else {
            DiaryApi.add({taskId: current.id, data: current.diaryText}).then(res => {
                this.setState({
                    visible: false
                })
            })
        }
    }
    handleDiaryChange = (eidtorState) => {
        const value = eidtorState
        const {current} = this.state;
        current.diaryText = value
        this.setState({
            current
        })
    }

    handleProgressChange = (value, row) => {
        Api.taskUpdateProgress({id: row.id, progress: value}).then(res => {
            console.log(res)
        })
    }

    handleOpenFocus = row => {
        this.setState({
            focusVisible: true,
            current: row
        })
    }

    render() {
        const {current, visible, focusVisible} = this.state;
        const {data, type} = this.props;
        const unDoList = data.filter(item => item.status === null);
        const doneList = data.filter(item => !!item.status);
        const result = [...unDoList, ...doneList]
        return (
            <div className="check_list">
                <div className="check_list_header">
                    <div style={{width: 400}}>任务</div>
                    <div style={{width: 100}}>优先级</div>
                    {type !== 1 && <div>指标</div>}
                    {type === 1 && <div>进度</div>}
                    {type !== 1 && <div>耗时</div>}
                    {type === 1 && <div style={{width: 200}}>截止时间</div>}
                    <div>日记</div>
                </div>
                {result && result.map(item => {
                    return (
                        <div key={item.id}
                             className={classnames(
                                 'check_list_body',
                                 {'gray': !!item.status}
                             )}>
                            <div style={{width: 400}}>
                                <Checkbox checked={!!item.status} onChange={(e) => {
                                    this.handleStatusChange(e, item)
                                }}>
                                    <span style={{marginRight: 10}}>{item.name}</span>
                                    {type === 1 &&
                                    <span style={{color: '#418686', fontSize: 12}}>{item.landmarksName}</span>}
                                    -<span style={{
                                    color: '#2054a1',
                                    fontWeight: 'bold',
                                    fontSize: 12
                                }}>{item.programName}</span>
                                </Checkbox>
                            </div>

                            <div className="check_list_body_level">{item.level.toUpperCase()}</div>
                            {type !== 1 && <div>{item.targets}</div>}
                            {type === 1 && <div style={{padding: '0 10px'}}>
                                <Slider
                                    defaultValue={item.progress || 0}
                                    onAfterChange={(value) => {
                                        this.handleProgressChange(value, item)
                                    }}
                                />
                            </div>}
                            {type !== 1 && <div>{item.time_of_day || 0} 分钟</div>}
                            {type === 1 &&
                            <div
                                className={classnames({'danger': type === 1 && moment(item.start_time).isBefore(moment(new Date()))})}
                                style={{width: 200}}>{moment(item.start_time).format('YYYY-MM-DD')}</div>}
                            <div>
                                <a onClick={() => {
                                    this.handleOpenRecord(item)
                                }}>
                                    日记
                                </a>
                                <span className="check_list_body_diary_count">{!!item.diaryText ? 1 : 0}</span>
                                <a onClick={() => {
                                    this.handleOpenFocus(item)
                                }} style={{marginLeft: 40, color: '#971010'}}>专注模式</a>
                            </div>
                        </div>
                    )
                })}
                <Modal
                    width={800}
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
                        <span style={{fontWeight: 'bold'}}>项目：</span><span>{current.programName}</span>
                        {/*<span style={{fontWeight:'bold'}}>里程碑：</span><span>{current.landMarkName}</span>*/}
                        <span style={{fontWeight: 'bold', marginLeft: 10}}>任务：</span><span>{current.name}</span>
                    </div>
                    <RichText value={current.diaryText} onChange={this.handleDiaryChange}/>

                    {/*<div ref={ref => this.richTextRef = ref}>*/}

                    {/*</div>*/}
                </Modal>
                {focusVisible && <FocusModal onCancel={() => {
                    this.setState({
                        focusVisible: false
                    })
                }}>
                    <div style={
                        {
                            width: 600,
                            height: 600,
                            overflow: 'auto',
                            borderRadius: 10,
                            padding: 10,
                            margin: '50px auto auto auto',
                            backgroundColor: '#ffffff',

                        }
                    } dangerouslySetInnerHTML={{__html: current.description}}/>
                </FocusModal>}
            </div>

        )
            ;
    }
}

export default CheckList;
