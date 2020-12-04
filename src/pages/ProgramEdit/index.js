import React, {Component} from 'react';
import {Card, Input} from 'antd'
import TimeLine from "./components/TimeLine";
import TaskEdit from "./components/TaskEdit";
import {PlusCircleOutlined, MinusCircleOutlined,CheckCircleOutlined} from '@ant-design/icons';
import classnames from 'classnames'
import './index.less'

class ProgramEdit extends Component {
    state = {
        data: [
            {
                id: 1,
                status: 0
            },
            {
                id: 2,
                status: 1,
                type:'landmasks'
            },
            {
                id: 3,
                status: 9,
            },
            {
                id: 3,
                status: 6,
                type:'landmasks'
            }
        ]
    }

    handleAdd = (row) => {

    }

    handleDel = (row) => {

    }

    handleSave = () => {

    }

    renderLandmask = (row) => {
        console.log(row)
        return row.type==='landmasks'&&<div className={classnames('landmask')}>
            <Input style={{width:200}}/>
            <PlusCircleOutlined style={{marginLeft:10}} onClick={() => {
                this.handleAdd(row)
            }}/>
            <MinusCircleOutlined style={{marginLeft:10}} onClick={() => {
                this.handleDel(row)
            }}/>
            <CheckCircleOutlined style={{marginLeft:10}} onClick={() => {
                this.handleSave()
            }}/>
            <div className="line"></div>
        </div>
    }

    render() {
        const {data} = this.state;
        return (
            <div className="edit_container">
                <div className="edit_left">
                    <Card>
                        <TimeLine data={data} afterSlot={
                            this.renderLandmask
                        }/>
                    </Card>
                </div>
                <div className="edit_right">
                    <Card>
                        <TaskEdit />
                    </Card>
                </div>
            </div>
        );
    }
}

export default ProgramEdit;
