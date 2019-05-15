import React, { Component } from 'react';
import http from "../../services/users";
import OrderDetailsNew from "./orderDetailsNew"
import randomstring from "randomstring";


class Order_detail_info extends Component {
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
        new_order:{},
        new_orders:[
            // {_id:"111",product:"prodcut1",quantity:"1"},
            // {_id:"112",product:"prodcut10",quantity:"10"}
        ]

     }
     componentDidMount() {
         this.setState({new_orders:this.props.user.order_details})
     }
    handleSubmit=async (event)=>{
        event.preventDefault();
        let dataPost={}
        for(let element of this.props.templateRenders){
            if(element.name!=="_id"){
                dataPost[element.name]=this.refs[element.name].value
            }
        }
        // let new_orders=this.state.new_orders.map(o=>{
        //     return {
        //         "product":o.product,
        //         "quantity":o.quantity
        //     }
        // })
        // console.log(new_orders)
        dataPost['order_details']=this.state.new_orders
        console.log(dataPost)

       await http.put(this.props.user._id,dataPost)
       window.document.location.reload()

    }
    renderOptions=(element)=>{
        return element.range.map(opt=> {
            return <option key={opt.option} value={opt.value}>{opt.option}</option>
        })
     }
     deleteOrderDetail(_id){
        console.log("delete",_id);
        let new_orders=[...this.state.new_orders];
        new_orders=new_orders.filter(o=>{
            if(o._id!==_id){
                return o
            }
        });
        console.log(new_orders)
        this.setState({new_orders})
    }
    onChangeAddNewOrderDetail=(e)=>{
        let new_order={...this.state.new_order};
        new_order[e.target.name]=e.target.value
        this.setState({new_order})
        // console.log(this.state.new_order);
    }
    onSubmitAddNewOrderDetail=()=>{
        let new_order={...this.state.new_order};
        //new_order._id=randomstring.generate(24)

        //console.log(this.state.new_order);
        let new_orders=[...this.state.new_orders,new_order];
       // console.log(this.state.new_orders);
        this.setState({new_orders})
        //this.setState({new_order:{}})
    }

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
                <label>Order detail</label>
                    <OrderDetailsNew 
                    onchange={this.onChangeAddNewOrderDetail}
                    onsubmit={this.onSubmitAddNewOrderDetail}
                    new_order={{product:'null',quantity:''}}
                    productsRange={this.props.productsRange}
                    />

                {
                        this.state.new_orders.map(o=>{
                            console.log(o)

                            // {_id: "5cdb8a46df243b6a56e9e20c", product: "5cdb85e72a402e623d9fd0a9", quantity: 4}

                            return <div key={o._id}>
                            {/* <input disabled={true} type="text" defaultValue={o.product}/> */}
                            
                            <select disabled={true} defaultValue={o.product}>
                    
                                {
                                    this.props.productsRange.map(p=>{
                                    return <option key={p.value} value={p.value}>{p.option}</option>
                                    })
                                }
                            </select>

                            <input disabled={true} type="text" defaultValue={o.quantity}/>
                            <label onClick={()=>{this.deleteOrderDetail(o._id)}} className="btn btn-danger">X</label>
                            </div>
                            
                        })
                }

                <button className="btn btn-danger">Submit</button>
                </form>
            </div>
        )
    }
}
 
export default Order_detail_info;
