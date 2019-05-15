import React, { Component } from 'react';
import OrderDetailsNew from "./orderDetailsNew"
import http from "../../services/users";
import randomstring from "randomstring";
class Add_new_order extends Component {
    state = { 
        new_order:{},
        new_orders:[
            // {_id:"111",product:"prodcut1",quantity:"1"},
            // {_id:"112",product:"prodcut10",quantity:"10"}
        ]
     }
    handleSubmit=async (event)=>{
        event.preventDefault();
        
        let dataPost={}

        for(let element of this.props.templateRenders){
            if(element.name!=="_id"){
                dataPost[element.name]=this.refs[element.name].value
            }
            
            
        }
        
        let new_orders=this.state.new_orders.map(o=>{
            return {
                "product":o.product,
                "quantity":o.quantity
            }
        })
        // console.log(new_orders)
        dataPost['order_details']=new_orders
        console.log(dataPost)

        await http.post(dataPost)
        window.document.location.reload()
    }
    componentDidMount() {
        
        http.setEndpoint(this.props.endPoint);
    }
    renderOptions=(element)=>{
       return element.range.map(opt=> <option key={opt.option} value={opt.value}>{opt.option}</option>)
    }
   
    onChangeAddNewOrderDetail=(e)=>{
        let new_order={...this.state.new_order};
        new_order[e.target.name]=e.target.value
        this.setState({new_order})
        // console.log(this.state.new_order);
    }
    onSubmitAddNewOrderDetail=()=>{
        let new_order={...this.state.new_order};
        new_order._id=randomstring.generate()

        //console.log(this.state.new_order);
        let new_orders=[...this.state.new_orders,new_order];
       // console.log(this.state.new_orders);
        this.setState({new_orders})
        //this.setState({new_order:{}})
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
    render() { 
        // console.log(randomstring.generate());
        // console.log("hello from add new orderxzz")
        if(this.props.new_user_isShow){
            return (
                <div>
                    <button className="btn btn-info" onClick={()=>this.props.handleShowCreate()}>create</button>
                    <form onSubmit={this.handleSubmit}>
                    {
                        this.props.templateRenders.map(element=>{
                            if(element.type==="input"&&element.name!=="_id"){
                                return (
                                    <React.Fragment key={element.name}>
                                        <div className="form-group">
                                            <label>{element.name}</label>
                                            <input type="text" ref={element.name} className="form-control" defaultValue={element.value}/>
                                        </div>
                                    </React.Fragment>
                                )
                            }
                            if(element.type==="select"){
                                return (
                                    <React.Fragment key={element.name}>
                                        
                                        <div className="form-group">
                                            <label>{element.name}</label>
                                            <select className="form-control" ref={element.name} defaultValue={element.value}>
                                                {this.renderOptions(element)}
                                                
                                            </select>
                                        </div>

                                    </React.Fragment>
                                )
                            }
                            return null

                        })

                    }
                    <label>Order detail</label>
                    <OrderDetailsNew 
                    onchange={this.onChangeAddNewOrderDetail}
                    onsubmit={this.onSubmitAddNewOrderDetail}
                    new_order={{product:'null',quantity:''}}
                    productsRange={this.props.productsRange}
                    />

                    {/* {this.renderListOrderDetailAddnew()} */}
                    {
                        this.state.new_orders.map(o=>{
                            // console.log(o)
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


                    <button className="btn btn-info">Submit</button>
                    </form>
                </div>
            )

        }else{
            return (
                <button className="btn btn-info" onClick={()=>this.props.handleShowCreate()}>create</button>
            )
        }
        
    }
}
 
export default Add_new_order;