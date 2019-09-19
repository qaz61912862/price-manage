import React, { Component } from 'react'
import { Input, Upload, Icon, message, Button  } from 'antd';
import { getBase64, beforeUpload } from '../../../../utils/upload'
import './index.less'
import E from 'wangeditor'
const { TextArea } = Input;

export default class ArticleEdit extends Component {
  componentDidMount() {
    this.initEditor()
  }
  state = {
    loading: false,
  };
  initEditor = () => {
    const elem = this.refs.editorElem
    const editor = new E(elem)
 
    this.editor = editor
 
    editor.customConfig.zIndex = 100
    editor.customConfig.uploadImgServer ='https://www.mocky.io/v2/5cc8019d300000980a055e76'
    // 限制一次最多上传 1 张图片
    editor.customConfig.uploadImgMaxLength = 1
    editor.customConfig.customUploadImg = function (files, insert) {
      // files 是 input 中选中的文件列表
      console.log(files)
      if (files[0]) {
        const formData = new window.FormData()
        formData.append('file', files[0], 'cover.jpg')
        fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
          method: 'POST',
          body: formData
        }).then((res) => {
          return res.json()
        }).then((res) => {
          const data = res.resultData
          if (data) {
            // 上传代码返回结果之后，将图片插入到编辑器中
            insert(data.resourceUrl)
          } else {
            // console.log(data.msg)
          }
        })
      } else {
        message.info('請選擇要上傳的圖片')
      }
    }
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      // 'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      // 'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      // 'emoticon', // 表情
      'image', // 插入图片
      // 'table', // 表格
      // 'video', // 插入视频
      // 'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    editor.customConfig.lang = {
      '设置标题': 'Title',
      '字号': 'Size',
      '文字颜色': 'Color',
      '设置列表': 'List',
      '有序列表': '',
      '无序列表': '',
      '对齐方式': 'Align',
      '靠左': '',
      '居中': '',
      '靠右': '',
      '正文': 'p',
      '链接文字': 'link text',
      '链接': 'link',
      '上传图片': 'Upload',
      '网络图片': 'Web',
      '图片link': 'image url',
      '插入视频': 'Video',
      '格式如': 'format',
      '上传': 'Upload',
      '创建': 'init'
    }
    editor.create()
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload(400 × 250)</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div className="articleEdit">
        <Input className="common-input" placeholder="输入文章标题" />
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <TextArea
          className="textarea-input"
          autosize={false}
          // onChange={this.onChange}
          placeholder="输入列表页面显示文字简介"
        />
        <div className="editor" ref='editorElem' style={{ textAlign: 'left' }} />
        <Button type="primary" className="confirm-btn">发布</Button>
      </div>
    )
  }
}
