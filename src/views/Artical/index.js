import { Button, Card, Table, Tag,Modal,Typography, message } from 'antd'
import React, { Component } from 'react'
import {getArticals,deleteArticalsById} from '../../request'
import moment from 'moment'
import ButtonGroup from 'antd/lib/button/button-group'
import XLSX from 'xlsx'
export default class Artical extends Component {

    titleDisplayMap={
        id:"序号",
        title:"标题",
        author:"作者",
        createAt:"创建时间",
        amount:"阅读量",
    }

    
constructor(){
    super()
    this.state={
        dataSource:[],
        // columns:[],
        totle:"0",
        isLoading:false,
        offset:0,
        limited:10,
        isShowDeleteArtical:false,
        deleteArticalTitle:null,
        deleteArticalConfirmLoading:false,
        deleteArticalId:null
        
    }
    this.getData()

    
}


createColums=(columnsKey)=>{
    const colums=columnsKey.map(
      item =>{
          if (item==='amount') {
              return{
                    title:this.titleDisplayMap[item],
                    key:item,
                    render:(text,record)=>{
                        const {amount}=record
                    return<Tag color={amount>2000?'red':'green'}>{amount}</Tag>
                    }
              }
          } 
          if (item==='createAt') {
              return {
                  title:this.titleDisplayMap[item],
                  key:item,
                  render:(text,record)=>{
                      const {createAt}=record
                      return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
                  }
              }
          }

          return{
              title:this.titleDisplayMap[item],
              dataIndex:item,
              key:item
          }
      }
    )
    
    colums.push({
        title:"操作",
        dataIndex:"action",
        key:"action",
        render:(text,record)=>{
            return (
            <ButtonGroup>
                <Button size="small" type="primary" onClick={()=>{this.props.history.push("/admin/artical/edit")}} >编辑</Button>
                <Button size="small" type="danger" onClick={this.showDeleteArtical.bind(this,record)}>删除</Button>
            </ButtonGroup>
            )
        }
    })
    return colums;
}
deleteArtical(){
// this.setState({
//     deleteArticalConfirmLoading:false,

// })
deleteArticalsById(this.state.deleteArticalId).then(
    resp=>{
        message.success(resp.msg)
    }
).finally(
    ()=>{
         this.setState(
            {
                deleteArticalConfirmLoading:false,
                isShowDeleteArtical:false
            }
        )
    }
)
}
//此方法原本为deleteArtical
showDeleteArtical(record){
//    Modal.confirm(
//        {
//            title:<Typography>确定删除<span style={{color:'red'}}>{record.title}</span></Typography>,
//            onOk(){
//             deleteArticals(record.id).then(
//                 (respose)=>{
//                     console.log(respose);
//                 }
//             )
//            },
//            okText:"确认删除",
//            cancelText:"我点错了"
//        }
//    )
  
this.setState({
    isShowDeleteArtical:true,
    deleteArticalTitle:record.title,
    deleteArticalId:record.id
})
}
handleOk(id){
    
}
handleCancel(){}
onPageChange=(page,pageSize)=>{
    // console.log(page,pageSize);
      
this.setState({
    offset:pageSize*(page-1),
    limited:pageSize
}
,()=>{this.getData()}
)
}
onShowSizeChange=(current,size)=>{
      
    this.setState({
        //首页offset是0，当前页offset是current-1
        offset:current-1,
        limited:size
    }
    ,()=>{this.getData()}
    )
}
toExcel=()=>{
    const data=[Object.keys(this.state.dataSource[0])]
    for (let i = 0; i < this.state.dataSource.length; i++) {
        data.push(
            [
                this.state.dataSource[i].id,
                this.state.dataSource[i].title,
                this.state.dataSource[i].author,
                this.state.dataSource[i].amount,
               moment( this.state.dataSource[i].createAt).format("YYYY-mm-DD HH:mm:ss"),




            ]
        )        
    }
    const ws=XLSX.utils.aoa_to_sheet(data)
    const wb=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,ws,"SheetJs")
    XLSX.writeFile(wb,`sheet-${moment().format("YYYY-MM-DD--HH-mm-ss")}.xlsx`)
}
getData=()=>{
      
    this.setState({
        isLoading:true
    })
    getArticals(this.state.offset,this.state.limited).then(
        resp=>{
            const columnsKey=Object.keys(resp.list[0])
            const columns=this.createColums(columnsKey)
            // console.log(columns);
     
            this.setState({
                total:resp.total,
                dataSource:resp.list,
                isLoading:false,
                columns
            })
        }
    ).catch(err=>{
    }).finally(()=>{
 
        this.setState({
            isLoading:false
        })
    })
}
hideDeleteArticalModal=()=>{
      
    this.setState({
        isShowDeleteArtical:false,
        deleteArticalTitle:""
    })
}

    render() {
        // console.log(this.state.columns+"reder");
        return (
            
              <Card title="文章列表" bordered={false} extra={<Button onClick={this.toExcel}>导出excel</Button>}>
                 
                <Table  dataSource={this.state.dataSource } 
                        rowKey={record=>record.id}
                        columns={this.state.columns }
                        loading={this.state.isLoading}
                        pagination={{
                        current:this.state.offset/this.state.limited+1,
                        total:this.state.total,
                        showSizeChanger:true,
                        onShowSizeChange:this.onShowSizeChange,
                        hideOnSinglePage:true,
                        // 调用方法不用加花括号不用加方法括号
                        onChange:this.onPageChange,
                        showQuickJumper:true
                    }}
                 />
                 <Modal
              title="此操作不可逆，请谨慎"
              
              visible={this.state.isShowDeleteArtical}
              onCancel={this.hideDeleteArticalModal}
              confirmLoading={this.state.deleteArticalConfirmLoading}
              onOk={this.deleteArtical}
              >
<Typography>确定删除<span style={{color:'red'}}>{this.state.deleteArticalTitle}</span></Typography>,

              </Modal>
              </Card>
              
        )
    }
}
