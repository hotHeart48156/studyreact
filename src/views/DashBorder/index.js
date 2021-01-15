import { Card, Col, Row } from 'antd'
import React, { Component, createRef } from 'react'
import './dashborder.less'
import  echarts from 'echarts'
import {getArticalsAmount} from '../../request'
export default class DashBorder extends Component {

    constructor(){
        super()
        this.articalAmount=createRef()
    }
    componentDidMount(){
        this.initArticalChart()
    }
    initArticalChart=()=>{
        this.articalChart=echarts.init(this.articalAmount.current)
        getArticalsAmount().then(resp=>{
            console.log( resp.amount.map(item=>item.value));
            const option = {
                xAxis: {
                    type: 'category',
                    data: resp.amount.map(item=>item.month)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: resp.amount.map(item=>item.value),
                    type: 'line'
                }]
            }     
            this.articalChart.setOption(option)
  
        
        })
        
        
    }
    render() {
        return (
            <>
            <Card
            title="概览"
            bordered={false}
            
            />
                <Row gutter={16}>
                    <Col className="gutter-col" span="6">
                        <div  className="gutter-box">col-1</div>
                    </Col>
                    <Col className="gutter-col" span="6">
                        <div  className="gutter-box">col-1</div>
                    </Col>
                    <Col className="gutter-col" span="6">
                        <div  className="gutter-box">col-1</div>
                    </Col>
                    <Col className="gutter-col" span="6">
                        <div  className="gutter-box">col-1</div>
                    </Col>
                </Row>
                
                
                <Card
            title="最近浏览量"
            bordered={false}
            
            >
                <div ref={this.articalAmount} style={{height:"600px"}}>

                </div>
                </Card>

            </>
        )
    }
}
