import React, {Component} from 'react';
import moment from 'moment'
import {  LogoutOutlined } from '@ant-design/icons';
import './index.less'
class Focus extends Component {
    state={
        restTime:new Date('2020-12-20 12:30:00').getTime()
    }

    componentDidMount() {
        this.timer=setInterval(()=>{
            const {restTime}=this.state;
            this.setState({
                restTime:restTime-1000
            })
        },1000)
    }

    render() {
        const {restTime}=this.state;
        const {onCancel}=this.props
        return (
            <div className="focus_container">
                <div className="focus_time">{moment(restTime).format('mm:ss')}</div>
                <div className="focus_close" onClick={onCancel}><LogoutOutlined /></div>
                {this.props.children}
            </div>
        );
    }
}

export default Focus;