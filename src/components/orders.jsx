import React, { Component } from 'react';
import Add_new_order from "./users/add_new_order"
import Order_detail_info from './users/order_detail_info';
import queryString from "query-string";

import http from "../services/users";


class Orders extends Component {
    state = { 
        new_user_isShow:false,
        
        users:[],
        templateRenders:[
            {type:"select",name:"status",range:[],value:""},
            {type:"select",name:"statusextends_transfer",range:[],value:""},
       
            {type:"input",name:"addressextends",range:"",value:""},
            {type:"select",name:"address_in_hanoi",range:[
                {option:"false",value:"false"},
                {option:"true",value:"true"}
                
            ],value:""},
            {type:"input",name:"phone",range:"",value:""},
            {type:"input",name:"note",range:"",value:""},
            {type:"input",name:"total",range:"",value:""},
            {type:"input",name:"customer",range:"",value:""},
            {type:"input",name:"user",range:"",value:""},

            // {type:"objectInput",name:"order_details",range:[
            //     // {type:"input",name:"user",range:"",value:""},
            //     // {type:"input",name:"user",range:"",value:""},
            //     {_id:'5cda893ac224f65b8e3a9af7',product:'5ccfae953152e724a5934636',quantity:'4'},
            //     {_id:'5cda893ac224f65b8e3a9af8',product:'5ccfae953152e724a5934637',quantity:'5'},
            //     {product:'',quantity:''},

            // ]}

    
// order_details


        ],
        mainField:"phone"
     }
    async componentDidMount() {
        //init cac option cho status
        http.setEndpoint("http://localhost:5000/api/statuss/");
        let data=await http.get();
        let statussRange=[{option:"null",value:"null"}]
        data.map(s=>{
            statussRange.push({option:s.text,value:s._id})
        })
        //init cac option cho status_transfer
        http.setEndpoint("http://localhost:5000/api/status_transfers/");
        data=await http.get();
        let status_transferRange=[{option:"null",value:"null"}]
        data.map(s=>{
            status_transferRange.push({option:s.text,value:s._id})
        })
        
       


        //init data customer //chi url co userid dung thi ms get dc ve data
        const userId=queryString.parse(this.props.location.search)['user'];
        const customerId=queryString.parse(this.props.location.search)['customer'];
        //update templateRenders
        let templateRenders=this.state.templateRenders.map(element=>{
            if(element.name==="user"){
                element.value=userId;
            }
            if(element.name==="customer"){
                element.value=customerId;
            }
            if(element.name==="status"){
                element.range=statussRange
                element.value=statussRange[statussRange.length-1].value;
            }
            if(element.name==="status_transfer"){
                element.range=status_transferRange
                element.value=status_transferRange[status_transferRange.length-1].value;

            }
            return element;
        })
        this.setState({templateRenders});
        
        http.setEndpoint("http://localhost:5000/api/orders/"+"?user="+userId+"&customer="+customerId);
        
        let users=await http.get();
        //them isShow
        users=users.map(u=>{
            u.isShow=false
            return u
        })
        //console.log(users);
        this.setState({users})

        http.setEndpoint("http://localhost:5000/api/orders/");
    }

    handleShowEdit=(user)=>{
        //hieu ung toggle
        let users=this.state.users.map(u=>{
            if(u._id===user._id){
                u.isShow=!u.isShow;
            }
            return u;
        })
        this.setState({users:users})
    }

    handleShowCreate=()=>{
        let new_user_isShow=!this.state.new_user_isShow
        this.setState({new_user_isShow:new_user_isShow})
    }

    handleDelete=async (userId)=>{
        //xoa user tu database
        await http.deleteData(userId);
        window.document.location.reload();
    }

    
    renderOptionsFilter=()=>{
        return this.state.templateRenders.map(element=> <option key={element.name} value={element.name}>{element.name}</option>)
     }

    handleSubmitFilter=async ()=>{
        event.preventDefault();
        
        let filter=this.refs["filter"].value
        let filterValue=this.refs["filterValue"].value
        

        let users=await http.getFilter({
            "filter":filter,
            "filterValue":filterValue,
        });
        
        //them isShow
        users=users.map(u=>{
            u.isShow=false
            return u
        })
        this.setState({users})

     }
    render() { 
        
        return ( 
            <div className="container">
                <h2 className="text-center">Create new Orderszz</h2>

                <Add_new_order new_user_isShow={this.state.new_user_isShow} 
                endPoint="http://localhost:5000/api/orders/" 
                templateRenders={this.state.templateRenders} handleShowCreate={()=>this.handleShowCreate()}
                
                />


                <hr/>


                <h2 className="text-center">Filter</h2>
                <form onSubmit={this.handleSubmitFilter}>
                    <div className="form-group">
                        <select className="form-control" ref="filter">
                            {this.renderOptionsFilter()}
                        </select>
                    </div>
                    <div className="form-group">
                    <input type="text" ref="filterValue" className="form-control"/>
                    </div>

                    <button className="btn btn-danger">Submit</button>
                </form>


                <hr/>
                <h2 className="text-center">Danh sach</h2>
                {this.state.users.map(u=> {
                     if(u.isShow){
                         return(
                            <React.Fragment key={u._id}>
                                <div className="user_main_info">
                                    <p>{u[this.state.mainField]}</p>
                                    
                                    <button className="btn btn-primary" style={{marginRight:10}} onClick={()=>this.handleShowEdit(u)}>edit</button>
                                    <button className="btn btn-warning" onClick={()=>this.handleDelete(u._id)}>delete</button>
                                </div>
                                
                                <Order_detail_info user={u} templateRenders={this.state.templateRenders}/>
                                <hr/>
                            </React.Fragment>
                        )
                    }else{
                        return (
                            <React.Fragment key={u._id}>
                                <div className="user_main_info">
                                <p>{u[this.state.mainField]}</p>

                                    <button className="btn btn-primary" style={{marginRight:10}} onClick={()=>this.handleShowEdit(u)}>edit</button>
                                    <button className="btn btn-warning" onClick={()=>this.handleDelete(u._id)}>delete</button>
                                </div>
                                <hr/>
                            </React.Fragment>
                        )
                    }
                    
                    
                }
                   
                )}
            </div>
         );
    }
}
 
export default Orders;
