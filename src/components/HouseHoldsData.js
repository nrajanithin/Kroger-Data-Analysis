import React from 'react'
import axios from 'axios';
import { JsonToTable } from "react-json-to-table";
class HouseHoldsData extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            tabledata : [],
            hnum : 10,
        }
    }
    componentDidMount = ()=>{
        axios.post("http://localhost:5000/hhnum",{hn:this.state.hnum})
            .then(result=>{
                this.setState({tabledata:[]});
                this.setState({tabledata:result.data})
            })
    }
    handleRead = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleHH = ()=>{
        axios.post("http://localhost:5000/hhnum",{hn:this.state.hnum})
        .then(result=>{
            this.setState({tabledata:[]})
            this.setState({tabledata:result.data});
        })
      }
    render()
    {
        return(
            <div>
                <div class="row" style={{width:'100%'}}>
                    <input style={{width:'20%'}} class="form-control" type="text" placeholder="Enter Household Number" name="hnum" onChange={(e)=>this.handleRead(e)}/>
                    <button class="btn btn-primary" onClick={()=>this.handleHH()}>Pull HouseHold</button>
                </div>
                <div class="row" style={{width:'100%',fontSize:'40pt'}} >
                    <JsonToTable  json={this.state.tabledata} />
                </div>     
            </div>
        );
    }
}
export default HouseHoldsData;