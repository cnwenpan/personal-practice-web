import React, {Component} from 'react';
import './index.less'

class InfoBlock extends Component {
    render() {
        const {label, value, format} = this.props;
        return (
            <div className="info_block">
                <div className="info_block_label">
                    {label}
                </div>
                <div className="info_block_value">{format ? format(value) : value}</div>
            </div>
        );
    }
}

export default InfoBlock;
