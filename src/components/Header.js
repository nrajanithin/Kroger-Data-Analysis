import React from 'react'
import './user.css';
import {withRouter} from 'react-router-dom'
class Header extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            name : this.props.na,
            displayregion: this.props.displayregion,
            scrollpharma: this.props.scrollpharma,
            scrollfood: this.props.scrollfood,
            scrollnonfood: this.props.scrollnonfood,
            scrolldonut: this.props.scrolldonut
        }
        console.log(this.state.name);
        console.log(this.props.na);
    }
    render()
    {
        return(
            <div style={{justifyContent:'space-between',display:'flex',fontSize:'19px',fontFamily:'cursive'}}>
                                    <h1>Welcome!! {this.props.name}🦁</h1>
                                    <marquee style={{fontFamily:'Cursive'}} scrollamount="9" width="80%" direction="left" height="30px">
                                      The highest sales in the country is observed to be in <b style={{color:'green'}}>{this.props.displayregion} </b>region. 
                                        Pharma sales recorded its highest in <b style={{color:'green'}}>{this.props.scrollpharma}</b>  region.
                                        Food sales recorded its highest in <b style={{color:'green'}}>{this.props.scrollfood}</b> region.
                                        Non-Food sales recorded its highest in <b style={{color:'green'}}>{this.props.scrollnonfood} </b>region.
                                        It is visualized that citizens with Income Range <b style={{color:'green'}}>{this.props.scrolldonut} </b> spend the most.
                                      </marquee>
                                    <button onClick={()=>this.props.history.push('/')}>Logout</button>
            </div>
        );
    }
}
export default withRouter(Header);