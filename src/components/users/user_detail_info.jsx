import React, { Component } from 'react';
import http from "../../services/users";
// import OrderDetails from "./orderDetails";

class User_detail_info extends Component {
    state = { 
         // templateRenders:[
        //     {type:"input",name:"fullname",range:""},
        //     {type:"input",name:"username",range:""},
        //     {type:"input",name:"password",range:""},
        //     {type:"select",name:"isAdmin",range:[
        //         {option:"true",value="true"},
        //         {option:"false",value="false"}
        //     ]}
            
        // ]
        order_details:[]
     }
    handleSubmit=async (event)=>{
        event.preventDefault();
        let dataPost={}
        for(let element of this.props.templateRenders){
            if(element.type==="objectInput"){
                // dataPost[element.name]=[

                // ]
            }else{
                dataPost[element.name]=this.refs[element.name].value
            }
            
        }

        await http.put(this.props.user._id,dataPost)
        window.document.location.reload()

    }
    renderOptions=(element)=>{
        return element.range.map(opt=> {
            return <option key={opt.option} value={opt.value}>{opt.option}</option>
        })
     }

    addOrderDetail=(new_ip)=>{
        let order_details=[...order_details];
        order_details.push(new_ip);
        console.log(order_details)
        this.setState({order_details});
    }
    // renderObjectInput=(element)=>{
    //     return element.range.map(ip=> {
    //         return (
    //             <OrderDetails ip={ip} key={ip.name} addOrderDetail={()=>this.addOrderDetail(ip)}/>
    //         )
    //     })
    //  }
    render() { 
        return (
            <div>
                
                <form onSubmit={this.handleSubmit}>
                {
                    this.props.templateRenders.map(element=>{
                        if(element.type==="input"){
                            return (
                                <React.Fragment key={element.name}>
                                    <div className="form-group">
                                        <label>{element.name}</label>
                                        <input type="text" ref={element.name} className="form-control" defaultValue={this.props.user[element.name]}/>
                                    </div>
                                </React.Fragment>
                            )
                        }
                        if(element.type==="select"){
                            return (
                                <React.Fragment key={element.name}>
                                    
                                    <div className="form-group">
                                        <label>{element.name}</label>
                                        <select className="form-control" ref={element.name} defaultValue={this.props.user[element.name]}>
                                            {this.renderOptions(element)}
                                            
                                        </select>
                                    </div>

                                </React.Fragment>
                            )
                        }
                        // if(element.type==="objectInput"){
                        //     return (
                        //         <React.Fragment key={element.name}>
                                    
                                    
                        //             {this.renderObjectInput(element)}


                        //         </React.Fragment>
                        //     )
                        // }
                        return "unsupport type"

                    })

                }
                <button className="btn btn-danger">Submit</button>
                </form>
            </div>
        )
    }
}
 
export default User_detail_info;
