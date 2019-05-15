import React, { Component } from 'react';
class OrderDetails extends Component {
    state = {  }
    handleSubmit=(event)=>{
        event.preventDefault();
        let product=this.refs["product"].value;
        let quantity=this.refs["quantity"].value;
        console.log(product,quantity)
        this.props.handleSubmit(product,quantity)
    }
    onChange=(e)=>{
        console.log(e.target.name)
        console.log(e.target.value)
        // this.setState({[e.target.name]: e.target.value});
    }
    render() { 
        console.log("hello fronm add new order detailzzz");
        return (
            <div>

            
            // <form onSubmit={this.handleSubmit}>
                {/* <div className="form-group"> */}
                    <label>product</label>
                    <input type="text" defaultValue={this.props.new_order['product']} onChange={this.onChange} name="product"/>
                    <label>quantity</label>
                    <input type="text" defaultValue={this.props.new_order['quantity']} />
                    
                {/* </div> */}
                <button className="btn btn-info">OK</button>

            // </form> 
            </div>
         );
    }
}
 
export default OrderDetails;