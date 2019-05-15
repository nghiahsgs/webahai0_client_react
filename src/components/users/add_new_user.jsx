import React, { Component } from 'react';

import http from "../../services/users";

class Add_new_user extends Component {
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
     }
    handleSubmit=async (event)=>{
        event.preventDefault();
        
        let dataPost={}

        for(let element of this.props.templateRenders){
            if(element.name!=="_id"){
                dataPost[element.name]=this.refs[element.name].value
            }
            
            
        }
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
    render() { 
        console.log("hello from add new users")
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
 
export default Add_new_user;