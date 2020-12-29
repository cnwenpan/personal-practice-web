import React, {Component} from 'react';
import {Card, DatePicker, Form, Input} from 'antd'
import TimeLine from "./components/TimeLine";
import TaskEdit from "./components/TaskEdit";
import {PlusCircleOutlined, MinusCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import classnames from 'classnames'
import moment from 'moment'
import Api from './api'
import './index.less'

class ProgramEdit extends Component {
    state = {
        data: [],
        landMarksSelectedIndex: 0,
        currentLandMark: null
    }

    componentDidMount() {
        this.queryLandMasks()
    }

    queryLandMasks = () => {
        const {landMarksSelectedIndex, currentLandMark} = this.state;
        const {state} = this.props.location;
        if (!state) {
            this.props.history.push({pathname: '/program'})
            return
        }
        Api.landMaskList({programId: state.id}).then(res => {
            const data = res
            console.log(data.map(item => item.type === 'landmarks'))
            this.setState({
                data: data,
                currentLandMark: landMarksSelectedIndex === 0 ? data.filter(item => item.type === 'landmarks')[0] : currentLandMark,
                landMarksSelectedIndex: landMarksSelectedIndex === 0 ? data.findIndex(item => item.type === 'landmarks') : landMarksSelectedIndex

            })
        })
    }


    handleAdd = (row) => {
        const {data} = this.state;
        data.push({
            id: 2,
            name: '',
            endTime: moment(new Date()),
            status: 1,
            type: 'landmarks'
        })
        this.setState({
            data
        })
    }

    handleDel = (row) => {

    }

    handleSave = (row) => {
        const {state} = this.props.location;
        row.endTime = moment(row.endTime).format('YYYY-MM-DD hh:mm:ss')
        if (row.id === 2) {
            Api.landMaskAdd({...row, programId: state.id}).then(res => {
                this.queryLandMasks()
            })
        } else {
            Api.landMaskUpdate({...row}).then(res => {
                this.queryLandMasks()
            })
        }

    }

    handleAddMask = () => {
        this.setState({
            data: [{
                id: 2,
                name: '',
                endTime: moment(new Date()),
                status: 1,
                type: 'landmarks'
            },]
        })
    }

    handleEditMasks = (value, index) => {
        const {data} = this.state;
        data[index] = {...data[index], ...value}
        this.setState({
            data
        })
    }

    renderLandmask = (row, index) => {
        const {landMarksSelectedIndex} = this.state;
        return row.type === 'landmarks' &&
            <div
                onClick={() => {
                    this.setState({
                        landMarksSelectedIndex: index,
                        currentLandMark: row
                    })
                }}
                className={classnames('landmask', {'selected': landMarksSelectedIndex === index})}
            >

                <Input
                    defaultValue={row.name}
                    onChange={(e) => {
                        const {value} = e.target;
                        this.handleEditMasks({name: value}, index)
                    }} style={{width: 200}}/>

                <DatePicker
                    defaultValue={moment(row.end_time)}
                    onChange={(date) => {
                        this.handleEditMasks({endTime: date}, index)
                    }
                    } style={{width: 140, display: 'inline-block'}}
                />

                <PlusCircleOutlined style={{marginLeft: 10}} onClick={() => {
                    this.handleAdd(row)
                }}/>

                <MinusCircleOutlined style={{marginLeft: 10}} onClick={() => {
                    this.handleDel(row)
                }}/>

                <CheckCircleOutlined style={{marginLeft: 10, color: row.name.length > 0 ? '#52C41A' : ''}}
                                     onClick={() => {
                                         this.handleSave(row)
                                     }}/>

                <div className="line"/>
            </div>
    }

    render() {
        const {data, currentLandMark} = this.state;
        return (
            <div className="edit_container">
                <div >
                    <Card>
                        {data.length === 0 && <div onClick={this.handleAddMask}><PlusCircleOutlined/>新增里程碑</div>}
                        {data.length > 0 && <TimeLine data={data} afterSlot={this.renderLandmask}/>}
                    </Card>
                </div>
                <div style={{marginTop:10}}>
                    <Card>
                        {currentLandMark && <TaskEdit landMark={currentLandMark} onSuccess={this.queryLandMasks}/>}
                    </Card>
                </div>
            </div>
        );
    }
}

export default ProgramEdit;
