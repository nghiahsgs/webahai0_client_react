import React, { Component } from 'react';
class OrderDetailsNew extends Component {
    state = {  }
    onsubmit=(event)=>{
        this.props.onsubmit();
    }
    onChange=(e)=>{
        this.props.onchange(e);
    }
    
    render() { 
        console.log("hello fronm add new order detailzzz");
        return (
            <div>
                <label>product</label>
                {/* <input type="text" defaultValue={this.props.new_order['product']} onChange={this.onChange} name="product"/> */}
                
                <select defaultValue={this.props.new_order['product']} onChange={this.onChange} name="product">
                    
                    {
                        this.props.productsRange.map(p=>{
                        return <option key={p.value} value={p.value}>{p.option}</option>
                        })
                    }
                </select>

                <label>quantity</label>
                <input type="text" defaultValue={this.props.new_order['quantity']} onChange={this.onChange} name="quantity"/>
                
                <label className="btn btn-info" onClick={this.onsubmit}>OK</label>
            </div>
         );
    }
}
 
export default OrderDetailsNew;