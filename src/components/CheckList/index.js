import React, {Component} from 'react';
import {Checkbox,Button} from "antd";
import './index.less'

class CheckList extends Component {
    render() {
        return (
            <div className="check_list">
                <div className="check_list_header">
                    <div>任务</div>
                    <div>指标</div>
                    <div>耗时</div>
                    <div>日记</div>

                </div>
                <div className="check_list_body">
                    <div><Checkbox>任务一</Checkbox></div>
                    <div>222</div>
                    <div>30</div>
                    <div><Button>日记</Button></div>
                </div>
            </div>

        )
            ;
    }
}

export default CheckList;
