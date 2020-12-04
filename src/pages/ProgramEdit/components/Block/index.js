import React, {Component} from 'react';
import classnames from 'classnames'
import './index.less'

class Block extends Component {
    render() {
        const {status} = this.props
        return (
            <div className={classnames(
                'block',
                {'block_undo': status === 0},
                {'block_ing': status === 1},
                {'block_check': status === 9},
                {'block_pass': status === 4},
                {'block_done':status===6}
            )}>

            </div>
        );
    }
}

export default Block;
