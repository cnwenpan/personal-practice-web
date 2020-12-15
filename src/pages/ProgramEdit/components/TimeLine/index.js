import React, {Component} from 'react';
import Block from '../Block'
import classnames from 'classnames'
import './index.less'

class TimeLine extends Component {
    render() {
        const {
            data, afterSlot = () => {
            }
        } = this.props;
        return (
            <div className="time_line_container">
                {
                    data.map((item, index) => {
                        return <div key={item.id}
                                    className={classnames('time_line_item', {high: item.type === 'landmarks'}, {task: item.type !== 'landmarks'})}>
                            {item.type === 'landmarks' && <Block  {...item} />}
                            {afterSlot(item, index)}
                        </div>
                    })
                }
            </div>
        );
    }
}

export default TimeLine;
