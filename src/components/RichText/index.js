import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'

export default class EditorDemo extends React.Component {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null)
    }

    async componentDidMount() {
        // 假设此处从服务端获取html格式的编辑器内容
        const htmlContent = this.props.value
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        this.setState({
            editorState: BraftEditor.createEditorState(htmlContent)
        })
    }

    handleEditorChange = (editorState) => {
        const {
            onChange = () => {
            }
        } = this.props;
        this.setState({editorState})
        onChange(editorState)
    }

    render() {
        const {value}=this.props
        const controls = ['bold', 'italic', 'underline', 'text-color', 'list-ul', 'separator', 'link', 'separator','undo','code','emoji']

        return (
            <div className="rich_container">
                <BraftEditor
                    style={{minHeight:200}}
                    value={value}
                    controls={controls}
                    onChange={this.handleEditorChange}
                />
            </div>
        )

    }

}

export const getHtml = (editorState) => {
    if (editorState) {
        return editorState.toHTML();
    } else {
        return ''
    }
}
export const toRich = (str) => {
    return BraftEditor.createEditorState(str)
}