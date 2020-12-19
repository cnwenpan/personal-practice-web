import React, {Component} from 'react';
import {Card, Row, Col} from 'antd'
import moment from 'moment'
import InfoBlock from "@/components/InfoBlock";
import CheckList from '@/components/CheckList'
import Api from './api'

class Home extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.queryTodayTasks()
    }

    queryTodayTasks = () => {

        Api.today().then(res => {
            this.setState({
                data: res
            })
        })
    }

    render() {
        const {data} = this.state;
        const unDoTaskList = data.filter(item => !item.status);
        let restTime = 0;
        unDoTaskList.forEach(item => {
            restTime = restTime + item.time_of_day
        })
        return (
            <div>
                <Card>
                    <Row gutter={10}>
                        <Col>
                            <InfoBlock label="剩余时长" value={restTime}
                            />
                        </Col>
                        <Col>
                            <InfoBlock label="剩余任务" value={unDoTaskList.length}/>
                        </Col>
                    </Row>
                </Card>
                <Card style={{marginTop: 20}}>
                    <CheckList data={data} onRefresh={this.queryTodayTasks}/>

                </Card>
            </div>
        );
    }
}

export default Home;
