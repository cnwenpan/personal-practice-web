import React, {Component} from 'react';
import {Card, Row, Col} from 'antd'
import moment from 'moment'
import InfoBlock from "@/components/InfoBlock";
import CheckList from '@/components/CheckList'
import Api from './api'

class Home extends Component {
    state = {
        data: [],
        unRepeatData:[]
    }

    componentDidMount() {
        this.queryTodayTasks()
    }

    queryTodayTasks = () => {

        Api.today().then(res => {
            this.setState({
                data: res.repeatResult,
                unRepeatData:res.notRepeatResult
            })
        })
    }

    render() {
        const {data,unRepeatData} = this.state;
        const unDoTaskList = data.filter(item => !item.status);
        let restTime = 0;
        unDoTaskList.forEach(item => {
            restTime = restTime + item.time_of_day
        })
        return (
            <div>
                <Card>
                    <div style={{marginBottom:10,color:'#345753'}}>重复任务</div>
                    <Row gutter={10} style={{marginBottom:10}}>
                        <Col>
                            <InfoBlock label="剩余时长" value={restTime}
                            />
                        </Col>
                        <Col>
                            <InfoBlock label="剩余任务" value={unDoTaskList.length}/>
                        </Col>
                    </Row>

                    <CheckList data={data} onRefresh={this.queryTodayTasks}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div style={{marginBottom:10,color:'#345753'}}>不重复任务</div>
                    <CheckList data={unRepeatData} type={1} onRefresh={this.queryTodayTasks}/>
                </Card>
            </div>
        );
    }
}

export default Home;
