import React, {Component} from 'react';
import Block from '../Block'
import classnames from 'classnames'
import './index.less'

class TimeLine extends Component {
    render() {
        const {data,afterSlot=()=>{}} = this.props;
        return (
            <div className="time_line_container">
                {
                    data.map((item, index) => {
                        return <div className={classnames('time_line_item',{high:item.type==='landmasks'},{task:item.type!=='landmasks'})}>
                            <Block key={index} {...item} />
                            {afterSlot(item)}
                        </div>
                    })
                }
            </div>
        );
    }
}

export default TimeLine;
