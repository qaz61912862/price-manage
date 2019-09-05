import React, { Component } from 'react'
import { Icon, Button } from 'antd'

import './index.less'

export default class ChildHeader extends Component {
    render() {
        return (
            <div className="user-info">
                <div className="avatar">
                    <Icon type="smile" theme="outlined" />
                </div>
                <div class="user-name">Hanson,</div>
                <Button type="primary" shape="circle" icon="logout" />
            </div>
        )
    }
}
