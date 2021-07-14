import React from 'react'
import './user.css';
import {withRouter} from 'react-router-dom'
import ReactApexChart from "react-apexcharts";
import Products from './Products';
import axios from 'axios';
import HouseHoldsData  from './HouseHoldsData';
import HouseHolds from './HouseHolds';
import Transactions from './Transactions';
import Header from './Header.js';
import { barOptions, dchart, dresponse, dtitle, line, pharma } from './GraphProps';
class Kroger extends React.Component
{
        constructor(props)
        {
          super(props);
          this.state = {
            na: '',
            scrolldonut:'',
            scrollpharma : '',
            scrollfood: '',
            scrollnonfood:'',
            don:[],
            bar:[],
            line:[],
            pharma:[],
            food:[],
            non_food:[],
            displayregion : '',
        }
        this.getFoodPie = this.getFoodPie.bind(this);
        this.getNonfoodPie = this.getNonfoodPie.bind(this);
        this.getPharma = this.getPharma.bind(this);
        }
        refresh = ()=>{
            this.getPie()
            this.getLine()
            this.getDonut()
        }
        getDonut = ()=>{
            var don_ss = [];
            var don_nm = [];
            axios.get("http://localhost:5000/don").then(result=>
            { 
                result.data.map(ob=>{
                    don_nm.push(ob.INCOME_RANGE);
                    don_ss.push(ob.ss);
                })
                var pe = {
                    series: don_ss,
                    options: {
                      chart: dchart,
                      title: dtitle,
                      labels:don_nm,
                      responsive: dresponse
                    },
                  };
                  var maxpe = don_nm[don_ss.indexOf(Math.max(...don_ss))]
                  this.setState({scrolldonut:maxpe})
                this.setState({don:pe})
            })
        }
        getBar = ()=>{
            var bfood =[]
            var bnonfood = []
            var bpharma =  []
            axios.get("http://localhost:5000/bar").then(result=>{
                var ref = [];
                result.data.map(ob => {
                    if(ob.department == "FOOD")
                    {
                        bfood.push(ob.ss);
                        ref.push(ob.ss);
                    }
                    if(ob.department == "NON-FOOD")
                    {
                        bnonfood.push(ob.ss);
                        ref.push(ob.ss);
                    }
                    if(ob.department == "PHARMA")
                    {
                        bpharma.push(ob.ss);
                        ref.push(ob.ss);
                    }
                })
                var pd = {
                    series: [{
                      name: 'FOOD',
                      data:  bfood
                    }, {
                      name: 'NON-FOOD',
                      data: bnonfood
                    }, {
                      name: 'PHARMA',
                      data: bpharma
                    }],
                    options: barOptions,
                  };     
                  this.setState({bar:pd});
            })
        }
        getLine = ()=>{
            var west = [];
            var east = [];
            var central = [];
            var south = [];
            var raj = [];
            axios.get("http://localhost:5000/line").then(result=>{
                var ref = 0;
                var reg = []
                result.data.map(ob =>{
                    if(ob.store_r == 'WEST')
                    {
                        west.push(ob.ss);
                        reg.push('WEST');
                    }
                    if(ob.store_r == 'EAST')
                    {
                        east.push(ob.ss);
                        reg.push('EAST');
                    }
                    if(ob.store_r == 'CENTRAL')
                    {
                        central.push(ob.ss);
                        reg.push('CENTRAL');
                    }
                    if(ob.store_r == 'SOUTH')
                    {
                        south.push(ob.ss)
                        reg.push('SOUTH');
                    }
                    raj.push(ob.ss);
                })
                var pc = {
                    series: [
                      {
                        name: "EAST",
                        data: east
                      },
                      {
                        name: "WEST",
                        data: west
                      },
                      {
                        name: "CENTRAL",
                        data: central
                      },
                      {
                        name: "SOUTH",
                        data: south
                      }
                    ],
                    options: {
                      chart: line.Chart,
                      colors: line.colors,
                      dataLabels: {
                        enabled: false,
                      },
                      stroke: line.stroke,
                      title: line.title,
                      grid: line.grid,
                      markers: line.markers,
                      xaxis: line.xaxis,
                      yaxis: {
                        title: {
                          text: 'Total Sales'
                        },
                        min: Math.min(...raj)-10,
                        max: Math.max(...raj)+10
                      },
                      legend: line.legend
                    },
                  };
                  this.setState({line:pc})
                  var index = reg[raj.indexOf(Math.max(...raj))]
                  this.setState({displayregion : index})
            })
        }
        getFoodPie = async()=>{
            var food_nm = [];
            var food_ss = [];
            axios.get("http://localhost:5000/food").then(result=>{
                result.data.map(ob => {
                    food_ss.push(ob.ss);
                    food_nm.push(ob.store_r);   
                })
                var pa = {
                  series: food_ss,
                  options: {
                    chart: {
                      width: 380,
                      type: 'pie',
                    },
                    title: {
                      text: 'FOOD v/s REGION',
                      align: 'left'
                    },
                    labels: food_nm,
                    responsive: [{
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 200
                        },
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }]
                  },
                };
               this.setState({food:{}},()=>{
                this.setState({food:pa})
                var maxf = food_nm[food_ss.indexOf(Math.max(...food_ss))]
                this.setState({scrollfood:maxf})
               })
            })
            .catch(err => {
                console.log(err);
            })
        }
        getNonfoodPie = async()=>{
            var non_food_nm = [];
            var non_food_ss = [];
            axios.get("http://localhost:5000/nonfood").then(result=>{
                result.data.map(ob => {
                    non_food_ss.push(ob.ss);
                    non_food_nm.push(ob.store_r);
                })
                var pb = {
                  series: non_food_ss,
                  options: {
                    chart: {
                      width: 380,
                      type: 'pie',
                    },
                    title: {
                      text: 'NON-FOOD v/s REGION',
                      align: 'left'
                    },
                    labels: non_food_nm,
                    responsive: [{
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 200
                        },
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }]
                  },
                };
              this.setState({non_food:{}})
              this.setState({non_food:pb},()=>{
                var elem = document.getElementById('cincy');
                elem.style.width = "99.9%"
              })
              var maxn = non_food_nm[non_food_ss.indexOf(Math.max(...non_food_ss))]
                this.setState({scrollnonfood:maxn})
            })
            .catch(err => {
                console.log(err);
            })
        }
        getPharma = ()=>{
            var phar_ss = [];
            var phar_nm = [];
            axios.get("http://localhost:5000/")
            .then(result=>{
                console.log(result.data);
                result.data.map(ob => {
                    phar_ss.push(ob.ss);
                    phar_nm.push(ob.store_r);
                })
                var ph = {
                  series: phar_ss,
                  options: {
                    chart: pharma.Chart,
                    title: pharma.title,
                    labels: phar_nm,
                    responsive: pharma.responsive
                  },
                };
                this.setState({pharma:{}})
                this.setState({pharma:ph},()=>{
                  var elem = document.getElementById('cincy');
                  elem.style.width = "99%"
                })
                var max = phar_nm[phar_ss.indexOf(Math.max(...phar_ss))]
              this.setState({scrollpharma:max})
            })
            .catch(err => {
                console.log(err);
            })
        }
        getPie = ()=>{
           this.getBar()
           this.getFoodPie()
           this.getNonfoodPie()
           this.getPharma()
        }
        componentDidMount = async()=>{
              this.getPie()
              this.getLine()
              this.getDonut()
              console.log(this.props.location.state.na);
              this.setState({na:this.props.location.state.na});
          } 
    handleRead = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    render()
    {
        return(
        <div>
        <div style={{marginTop:'10px',marginLeft:'20px',marginRight:'20px'}}>
                                <div>
                                    <Header name={this.state.na} displayregion={this.state.displayregion}
                                      scrollpharma={this.state.scrollpharma} scrollfood={this.state.scrollfood} scrollnonfood={this.state.scrollnonfood} scrolldonut={this.state.scrolldonut} />
                                </div>
                         <div class="row">
                             <div class='col-md-4'>
                                <HouseHolds refresh = {this.refresh}/>
                            </div>
                            <div class='col-md-4'>
                                 <Products refresh = {this.refresh}/>
                            </div>
                            <div class='col-md-4'>
                                 <Transactions refresh = {this.refresh}/>
                            </div>
                            </div>
                            <div class="row">
                                    <div class="col-md-6 border">
                                      {
                                        this.state.line.length!=0 ? <ReactApexChart options={this.state.line.options} series={this.state.line.series} type="line" style={{width:"100%"}} height={400} /> : <h2>Loading...</h2>
                                      }
                                    </div>
                                    <div class="col-md-6 border">
                                      {
                                        this.state.bar.length!=0 ? <ReactApexChart options={this.state.bar.options} series={this.state.bar.series} type="bar" height={350} /> : <h2>Loading...</h2>
                                      }
                                    </div>
                            </div>
                            <div id="cincy" class="row border w3-animate-opacity">
                                    <div id="pie1" style={{width:`24%`}}>
                                      {
                                        this.state.pharma.options!=undefined && this.state.pharma.series!=undefined ? <ReactApexChart id="pie1" options={this.state.pharma.options} series={this.state.pharma.series} type="pie" width={380} /> : <h2>Loading...</h2>
                                      }
                                    </div>
                                    <div id="pie2" style={{width:`24%`}}>
                                      {
                                        this.state.food.options!=undefined && this.state.food.series!=undefined ? <ReactApexChart id="pie2" options={this.state.food.options} series={this.state.food.series} type="pie" width={380} /> : <h2>Loading...</h2>
                                      }
                                    </div>
                                    <div id="pie3" style={{width:`24%`}}>
                                      {
                                        this.state.non_food.options!=undefined && this.state.non_food.series!=undefined ? <ReactApexChart id="pie3" options={this.state.non_food.options} series={this.state.non_food.series} type="pie" width={380} /> : <h2>Loading...</h2>
                                      }
                                    </div>
                                    <div id="pie4" style={{width:`28%`}}>
                                      {
                                        this.state.don.options!=undefined &&  this.state.don.series!=undefined ? <ReactApexChart options={this.state.don.options} series={this.state.don.series} type="donut" /> :<h2>Loading...</h2>
                                      }
                                    </div>
                            </div>
                        {
                          this.state.line.length!=0 ?  <HouseHoldsData/>  : <p>Loading...</p>
                        }  
             </div> 
    </div>    
        )
    }
}
export default withRouter(Kroger);