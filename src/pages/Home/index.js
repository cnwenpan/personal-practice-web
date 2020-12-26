import React, {Component} from 'react';
import {Card, Row, Col, Tag} from 'antd'
import moment from 'moment'
import InfoBlock from "@/components/InfoBlock";
import CheckList from '@/components/CheckList'
import Api from './api'

const {CheckableTag} = Tag;

class Home extends Component {
    state = {
        data: [],
        unRepeatData: [],
        selectedTags: [],
        programs: []


    }

    componentDidMount() {
        this.queryTodayTasks()
    }

    queryTodayTasks = () => {

        Api.today().then(res => {
            this.setState({
                data: res.repeatResult,
                unRepeatData: res.notRepeatResult,
                programs: [...new Set(res.notRepeatResult.map(item => item.programName))]
            })
        })
    }


    handleTagChange = (row, value) => {
        const {selectedTags} = this.state;
        const nextSelectedTags = value ? [...selectedTags, row] : selectedTags.filter(t => t !== row);

        this.setState({selectedTags: nextSelectedTags});
    }


    render() {
        const {data, unRepeatData, selectedTags, programs} = this.state;
        const unDoTaskList = data.filter(item => !item.status);
        let restTime = 0;
        unDoTaskList.forEach(item => {
            restTime = restTime + item.time_of_day
        })
        return (
            <div>
                <Card>
                    <div style={{marginBottom: 10, color: '#345753'}}>重复任务</div>
                    <Row gutter={10} style={{marginBottom: 10}}>
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
                <Card style={{marginTop: 10}}>
                    <div style={{marginBottom: 10, color: '#345753'}}>

                        <span style={{marginRight:20}}>不重复任务</span>
                        {programs.map(item => (<CheckableTag
                            key={item}
                            checked={selectedTags.indexOf(item) > -1}
                            onChange={checked => this.handleTagChange(item, checked)}
                        >
                            {item}
                        </CheckableTag>))}
                    </div>

                    <CheckList
                        data={selectedTags.length === 0 ? unRepeatData : unRepeatData.filter(item => selectedTags.indexOf(item.programName) > -1)}
                        type={1} onRefresh={this.queryTodayTasks}/>
                </Card>
            </div>
        );
    }
}

export default Home;
