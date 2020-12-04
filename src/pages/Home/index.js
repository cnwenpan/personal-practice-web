import React, {Component} from 'react';
import {Card,Row,Col} from 'antd'
import moment from 'moment'
import InfoBlock from "@/components/InfoBlock";
import CheckList from '@/components/CheckList'

class Home extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Row gutter={10}>
                        <Col>
                            <InfoBlock label="剩余时长" value={new Date().getTime()} format={(value)=>moment(value).format('hh:mm:ss')}/>
                        </Col>
                        <Col>
                            <InfoBlock label="剩余任务" value={3} />
                        </Col>
                    </Row>
                </Card>
                <Card style={{marginTop:20}} title="今日任务">
                    <CheckList />
                </Card>
            </div>
        );
    }
}
export default Home;
