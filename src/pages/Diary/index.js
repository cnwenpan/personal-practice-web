import React, {Component} from 'react';
import {Card, List} from 'antd'
import classnames from 'classnames'
import Api from './api'
import './index.less'

class Diary extends Component {


    state = {
        data: []
    }

    componentDidMount() {
        Api.list().then(res => {
            this.setState({
                data: res
            })
        })
    }

    query = () => {

    }

    render() {
        const {data} = this.state;
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <div style={{
                            padding: 10,
                            backgroundColor: '#ffffff',
                            overflow: 'hidden'
                        }}>
                            <List.Item>
                                <List.Item.Meta
                                    title={<div className="diary_title">{item.time}</div>}
                                    description={
                                        <div>
                                            {item.list.map(i => <div
                                                className={classnames('diary_item')}>
                                                <div
                                                    className={classnames('diary_item_name', `diary_item_level_${i.level}`)}>{i.name}</div>
                                                <div className="diary_item_text">{i.diaryText}</div>
                                            </div>)}
                                        </div>
                                    }
                                />
                            </List.Item>
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default Diary;
