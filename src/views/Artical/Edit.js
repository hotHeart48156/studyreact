import React, { Component } from 'react'
import{Button, Card,DatePicker,Form, Input} from 'antd'

export default class ArticalEdit extends Component {
    onFinish(value){
        console.log(value);
    }
    render() {
        return (
           <Card 
                title="编辑文章"
                bordered={false}
                extra={<Button>取消</Button>}
            >
                <Form
                    onFinish={this.onFinish}
                >
                    <Form.Item
                    label="标题"
                    name="title"
                    rules={
                        [
                            {
                                required:true,
                                message:"请输入标题"
                            },
                            {
                                min:4,
                                message:"标题字数最小4个"

                            }
                        ]
                    }
                    >
                         <Input placeholder="请输入作者" />
                    </Form.Item>
                    <Form.Item
                    label="作者"
                    name="author"
                    rules={
                        [
                            {
                                required:true,
                                message:"请输入作者"
                            },
                        
                        ]
                    }
                    >
                         <Input placeholder="请输入文章作者" />
                    </Form.Item>
                    <Form.Item
                    label="创建时间"
                    name="createAt"
                    rules={
                        [
                            {
                                required:true,
                                message:"请输入创建时间"
                            },
                           
                        ]
                    }
                    >
                         <DatePicker
                         showTime
                         placeholder="选择创建时间"
                        //  onChange={}
                        //  onClick={}
                         />
                    </Form.Item>
                    <Form.Item
                    label="内容"
                    name="content"
                    rules={
                        [
                            {
                                required:true,
                                message:"必须有内容"
                            }
                        ]
                    }
                    >
                        <textarea></textarea>

                    </Form.Item>
                    <Form.Item
                    wrapperCol={{offset:4}}
                    >
                    <Button type="primary" htmlType="submit">
                      保存修改
                     </Button>
                    </Form.Item>
                    
                </Form>

           </Card>
        )
    }
}
