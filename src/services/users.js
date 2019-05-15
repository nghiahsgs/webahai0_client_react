import axios from "axios";

let endPoint="";

let setEndpoint=(url)=>{
    endPoint=url;
}

let get=async ()=>{
    // console.log(endPoint)
    let users=await axios.get(endPoint);
    //console.log(users)
    return users.data;

}
let getFilter=async (objFilter)=>{
    let {filter,filterValue}=objFilter
    // console.log(filter,filterValue)

    let users=await axios.get(endPoint+"?"+filter+"="+filterValue);
    //console.log(users)
    return users.data;

}

//user la object de tao moi user
let post=async (user)=>{
    user=await axios.post(endPoint,user);
    return user;
}

let put=async (userid,user)=>{
    user=await axios.put(endPoint+userid,user);
    return user;
}

//detele user
let deleteData=async (userid)=>{
    console.log(userid)
    let user=await axios.delete(endPoint+userid);
    return user.data;
}

export default{
    get:get,
    getFilter:getFilter,
    post:post,
    put:put,
    deleteData:deleteData,
    setEndpoint:setEndpoint
    
    
}

// export default get;