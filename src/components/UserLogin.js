import React from 'react'
import fire from './fire';
import './user.css';
import ClipLoader from "react-spinners/ClipLoader";
import ReactApexChart from "react-apexcharts";
import { CSVReader } from 'react-papaparse'
import axios from 'axios';
const buttonRef1 = React.createRef()
const buttonRef2 = React.createRef()
const buttonRef3 = React.createRef()
class UserLogin extends React.Component
{
    
        
        state = {
            move:24,
            loading:false,
            raja:'',
            don:[],
            bar:[],
            line:[],
            spsh : [],
            pharma:[],
            food:[],
            non_food:[],
            success:false,
            login : true,
            register:false,
            username:'',
            un:'',
            pwd:'',
            cpwd:'',
            email:'',
            password:'',
            hhh:[],
            prod: [],
            trans : [],
            arr:[],
            initial : [],
            final_data : [],
            lineGraph:{
                series: [{
                    name: "Desktops",
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                }],
                options: {
                  chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                      enabled: false
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'straight'
                  },
                  title: {
                    text: 'Product Trends by Month',
                    align: 'left'
                  },
                  grid: {
                    row: {
                      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                      opacity: 0.5
                    },
                  },
                  xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                  }
                }
            }
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
                      chart: {
                        type: 'donut',
                        width: 380
                      },
                      title: {
                        text: 'SPEND v/s INCOME RANGE',
                        align: 'left'
                      },
                      labels:don_nm,
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
                this.setState({don:pe})
            
            })
        }
        getBar = ()=>{
            var bfood =[]
            var bnonfood = []
            var bpharma =  []
            axios.get("http://localhost:5000/bar").then(result=>{
                console.log(result);
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
                    options: {
                      chart: {
                        type: 'bar',
                        height: 350,
                        stacked: true,
                        toolbar: {
                          show: true
                        },
                        zoom: {
                          enabled: true
                        }
                      },
                      responsive: [{
                        breakpoint: 480,
                        options: {
                          legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                          }
                        }
                      }],
                      plotOptions: {
                        bar: {
                          borderRadius: 8,
                          horizontal: false,
                        },
                      },
                      xaxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
                      },
                      legend: {
                        position: 'right',
                        offsetY: 40
                      },
                      fill: {
                        opacity: 1
                      }
                    },
                  
                  
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
                console.log(result);
                var ref = 0;
                result.data.map(ob =>{
                    if(ob.store_r == 'WEST')
                    {
                        west.push(ob.ss);
                    }
                    if(ob.store_r == 'EAST')
                    {
                        east.push(ob.ss);
                    }
                    if(ob.store_r == 'CENTRAL')
                    {
                        central.push(ob.ss);
                    }
                    if(ob.store_r == 'SOUTH')
                    {
                        south.push(ob.ss)
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
                      chart: {
                        height: 350,
                        type: 'line',
                        dropShadow: {
                          enabled: true,
                          color: '#000',
                          top: 18,
                          left: 7,
                          blur: 10,
                          opacity: 0.2
                        },
                        toolbar: {
                          show: false
                        }
                      },
                      colors: ['#9c0f08', '#91db1a','#faa200', '#f714ba'],
                      dataLabels: {
                        enabled: false,
                      },
                      stroke: {
                        curve: 'smooth',
                        width:2
                      },
                      title: {
                        text: 'Sales v/s Month',
                        align: 'left'
                      },
                      grid: {
                        borderColor: '#e7e7e7',
                        row: {
                          colors: ['#FFFFFF', '#FFFFFF','#FFFFFF', '#FFFFFF'], // takes an array which will be repeated on columns
                          opacity: 0.5
                        },
                      },
                      markers: {
                        size: 1,
                        strokeColors: ['#9c0f08', '#91db1a','#faa200', '#f714ba'],
                        strokeWidth: 6
                      },
                      xaxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
                        title: {
                          text: 'Month'
                        }
                      },
                      yaxis: {
                        title: {
                          text: 'Total Sales'
                        },
                        min: Math.min(...raj)-10,
                        max: Math.max(...raj)+10
                      },
                      legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        floating: true,
                        offsetY: -25,
                        offsetX: -5
                      }
                    },
                  
                  
                  };
                  this.setState({line:pc})
            })
        }
        getFoodPie = async()=>{
            console.log("food pie lo vunnam");
            var food_nm = [];
            var food_ss = [];
            axios.get("http://localhost:5000/food").then(result=>{
                console.log(result.data);
                result.data.map(ob => {
                    food_ss.push(ob.ss);
                    food_nm.push(ob.store_r);
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
                 
                    this.setState({food:pa})
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
                console.log(result.data);
                result.data.map(ob => {
                    non_food_ss.push(ob.ss);
                    non_food_nm.push(ob.store_r);
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
                 
                    this.setState({non_food:pb})
                })
            })
            .catch(err => {
                console.log(err);
            })
        }
        getPharma = async()=>{
            var phar_ss = [];
            var phar_nm = [];
            axios.get("http://localhost:5000/")
            .then(result=>{
                console.log(result.data);
                result.data.map(ob => {
                    phar_ss.push(ob.ss);
                    phar_nm.push(ob.store_r);
                    var ph = {
          
                        series: phar_ss,
                        options: {
                          chart: {
                            width: 380,
                            type: 'pie',
                          },
                          title: {
                            text: 'PHARMA v/s REGION',
                            align: 'left'
                          },
                          labels: phar_nm,
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
                 
                    this.setState({pharma:ph})
                })
            })
            .catch(err => {
                console.log(err);
            })
        }
        getPie = ()=>{
           
        }
        componentDidMount = ()=>{
            var raj = [];
            var phar_ss = [];
            var phar_nm = [];
            var food_ss = [];
            var food_nm = [];
            var non_food_ss =[];
            var non_food_nm = [];
            var west =[];
            var central = [];
            var east = [];
            var south = [];
            var bfood = [];
            var bnonfood = [];
            var bpharma = [];
            var don_ss =[];
            var don_nm = [];
            axios.get("http://localhost:5000/")
            .then(result=>{
                console.log(result.data);
                result.data.map(ob => {
                    phar_ss.push(ob.ss);
                    phar_nm.push(ob.store_r);
                    var ph = {
          
                        series: phar_ss,
                        options: {
                          chart: {
                            width: 380,
                            type: 'pie',
                          },
                          title: {
                            text: 'PHARMA v/s REGION',
                            align: 'left'
                          },
                          labels: phar_nm,
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
                 
                    this.setState({pharma:ph})
                })
            })
            .catch(err => {
                console.log(err);
            })
            axios.get("http://localhost:5000/food").then(result=>{
                console.log(result.data);
                result.data.map(ob => {
                    food_ss.push(ob.ss);
                    food_nm.push(ob.store_r);
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
                 
                    this.setState({food:pa})
                })
            })
            .catch(err => {
                console.log(err);
            })
            axios.get("http://localhost:5000/nonfood").then(result=>{
                console.log(result.data);
                result.data.map(ob => {
                    non_food_ss.push(ob.ss);
                    non_food_nm.push(ob.store_r);
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
                 
                    this.setState({non_food:pb})
                })
            })
            .catch(err => {
                console.log(err);
            })
            axios.get("http://localhost:5000/line").then(result=>{
                console.log(result);
                var ref = 0;
                result.data.map(ob =>{
                    if(ob.store_r == 'WEST')
                    {
                        west.push(ob.ss);
                    }
                    if(ob.store_r == 'EAST')
                    {
                        east.push(ob.ss);
                    }
                    if(ob.store_r == 'CENTRAL')
                    {
                        central.push(ob.ss);
                    }
                    if(ob.store_r == 'SOUTH')
                    {
                        south.push(ob.ss)
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
                      chart: {
                        height: 350,
                        type: 'line',
                        dropShadow: {
                          enabled: true,
                          color: '#000',
                          top: 18,
                          left: 7,
                          blur: 10,
                          opacity: 0.2
                        },
                        toolbar: {
                          show: false
                        }
                      },
                      colors: ['#9c0f08', '#91db1a','#faa200', '#f714ba'],
                      dataLabels: {
                        enabled: false,
                      },
                      stroke: {
                        curve: 'smooth',
                        width:2
                      },
                      title: {
                        text: 'Sales v/s Month',
                        align: 'left'
                      },
                      grid: {
                        borderColor: '#e7e7e7',
                        row: {
                          colors: ['#FFFFFF', '#FFFFFF','#FFFFFF', '#FFFFFF'], // takes an array which will be repeated on columns
                          opacity: 0.5
                        },
                      },
                      markers: {
                        size: 1,
                        strokeColors: ['#9c0f08', '#91db1a','#faa200', '#f714ba'],
                        strokeWidth: 6
                      },
                      xaxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
                        title: {
                          text: 'Month'
                        }
                      },
                      yaxis: {
                        title: {
                          text: 'Total Sales'
                        },
                        min: Math.min(...raj)-10,
                        max: Math.max(...raj)+10
                      },
                      legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        floating: true,
                        offsetY: -25,
                        offsetX: -5
                      }
                    },
                  
                  
                  };
                  this.setState({line:pc})
            })
            axios.get("http://localhost:5000/bar").then(result=>{
                console.log(result);
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
                    options: {
                      chart: {
                        type: 'bar',
                        height: 350,
                        stacked: true,
                        toolbar: {
                          show: true
                        },
                        zoom: {
                          enabled: true
                        }
                      },
                      responsive: [{
                        breakpoint: 480,
                        options: {
                          legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                          }
                        }
                      }],
                      plotOptions: {
                        bar: {
                          borderRadius: 8,
                          horizontal: false,
                        },
                      },
                      xaxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
                      },
                      legend: {
                        position: 'right',
                        offsetY: 40
                      },
                      fill: {
                        opacity: 1
                      }
                    },
                  
                  
                  };
                  
                  this.setState({bar:pd});
            })
            axios.get("http://localhost:5000/don").then(result=>
            {
                result.data.map(ob=>{
                    don_nm.push(ob.INCOME_RANGE);
                    don_ss.push(ob.ss);
                })
                var pe = {
                    series: don_ss,
                    options: {
                      chart: {
                        type: 'donut',
                        width: 380
                      },
                      title: {
                        text: 'SPEND v/s INCOME RANGE',
                        align: 'left'
                      },
                      labels:don_nm,
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
                this.setState({don:pe})
            
            })
          }
          handleOpenDialog1 = (e) => {
            if (buttonRef1.current) {
              buttonRef1.current.open(e)
            }
          }
        
          handleOnFileLoad1 = async(data) => {
            console.log('---------------------------')
            console.log(data)
            var raja = []
            console.log(data.length);
            console.log(data[0].data.length);
            for(let i=0;i<data.length;i++)
            {
                let x = {};
                for(let j=0;j<data[0].data.length;j++)
                {
                    let a = data[0].data[j]
                    let b = data[i].data[j]
                    if(b == undefined)
                    {
                        x[a.trim()] = b;
                    }
                    else{
                        x[a.trim()] = b.trim();
                    }
                    
                }
                raja.push(x);
            }   
            console.log(raja);
            await axios.post('http://localhost:5000/data/hh',{data:raja})
            .then( res => {
                console.log("sent data to node js");
                
            })
            console.log('---------------------------')
            this.setState({loading:true});
            setTimeout(() => {
                    this.getDonut()
                    this.setState({loading:false})
              }, 3000);
            
          }
        
          handleOnError1 = (err, file, inputElem, reason) => {
            console.log(err)
          }
        
          handleOnRemoveFile1 = (data) => {
            console.log('---------------------------')
            console.log(data)
            console.log('---------------------------')
          }
        
          handleRemoveFile1 = (e) => {
            // Note that the ref is set async, so it might be null at some point
            if (buttonRef1.current) {
              buttonRef1.current.removeFile(e)
            }
          }
        // *********************************************
        handleOpenDialog2 = (e) => {
            if (buttonRef2.current) {
              buttonRef2.current.open(e)
            }
          }
        
          handleOnFileLoad2 = (data) => {
            console.log('---------------------------')
            console.log(data)
            var raja = []
            console.log(data.length);
            console.log(data[0].data.length);
            for(let i=0;i<data.length;i++)
            {
                let x = {};
                for(let j=0;j<data[0].data.length;j++)
                {
                    let a = data[0].data[j]
                    let b = data[i].data[j]
                    if(b == undefined)
                    {
                        x[a.trim()] = b;
                    }
                    else{
                        x[a.trim()] = b.trim();
                    }
                    
                }
                raja.push(x);
            }   
            console.log(raja);
            axios.post('http://localhost:5000/data/pr',{data:raja})
            .then(res => {
                console.log("sent data to node js");
            })
            console.log('---------------------------')
            this.setState({loading:true});
            setTimeout(() => {
                    this.getPie()
                    this.setState({loading:false})
              }, 5000);
          }
        
          handleOnError2 = (err, file, inputElem, reason) => {
            console.log(err)
          }
        
          handleOnRemoveFile2 = (data) => {
            console.log('---------------------------')
            console.log(data)
            console.log('---------------------------')
          }
        
          handleRemoveFile2 = (e) => {
            // Note that the ref is set async, so it might be null at some point
            if (buttonRef2.current) {
              buttonRef2.current.removeFile(e)
            }
          }
          //**************************************** 
          handleOpenDialog3 = (e) => {
            if (buttonRef3.current) {
              buttonRef3.current.open(e)
            }
          }
        
          handleOnFileLoad3 = (data) => {
            console.log('---------------------------')
            console.log(data)
            var raja = []
            console.log(data.length);
            console.log(data[0].data.length);
            for(let i=0;i<data.length;i++)
            {
                let x = {};
                for(let j=0;j<data[0].data.length;j++)
                {
                    let a = data[0].data[j]
                    let b = data[i].data[j]
                    if(b == undefined)
                    {
                        x[a.trim()] = b;
                    }
                    else{
                        x[a.trim()] = b.trim();
                    }
                    
                }
                raja.push(x);
            }   
            console.log(raja);
            axios.post('http://localhost:5000/data/tr',{data:raja})
            .then(res => {
                console.log("sent data to node js");
            })
            console.log('---------------------------')
            this.setState({loading:true});
            setTimeout(async() => {
                    this.getLine();
                    this.getBar();
                    this.getDonut();
                        this.getFoodPie();
                        this.getPharma();
                        this.getNonfoodPie();
                    this.setState({loading:false})
              }, 3000);
               
          }
        
          handleOnError3 = (err, file, inputElem, reason) => {
            console.log(err)
          }
        
          handleOnRemoveFile3 = (data) => {
            console.log('---------------------------')
            console.log(data)
            console.log('---------------------------')
          }
        
          handleRemoveFile3 = (e) => {
            // Note that the ref is set async, so it might be null at some point
            if (buttonRef3.current) {
              buttonRef3.current.removeFile(e)
            }
          }
    handleRead = (e)=>{
        this.setState({[e.target.name]:e.target.value});
        console.log(this.state);
    }
    handleLogin = ()=>{
        console.log(this.state);
        
        if(this.state.username!='' && this.state.password!='')
        {
            var raj = 0;
            var ref = fire.database().ref("user");
            ref.orderByChild("un").equalTo(this.state.username).on("child_added", function(snapshot) {
                console.log(snapshot.key);
                    raj = 1;
                    console.log('mama');
          
              });
              console.log(raj);
             if(raj == 1)
             {
                this.setState({login:false,success:true})
             }
              console.log("hi ra nithin");

              
        }
        else{
            if(this.state.username=='')
            {
                alert('UserName is required');
            }
            else{
                alert('Password is required');
            }
        }
    }
    handleRegister = ()=>{
        if(this.state.un!='' && this.state.pwd==this.state.cpwd && this.state.email!='')
        {
            this.setState({login:!this.state.login});
            fire.database().ref().child('user').push(
                this.state,
                err=>
                {
                    if(err)
                    {
                        console.log(err);
                    }
                }
            )
            this.setState({login:true,success:false,register:false});
        }
    }
    render()
    {
        return(
        <div>
         {this.state.success? <div style={{marginTop:'10px',marginLeft:'20px',marginRight:'20px'}}>
                                <div style={{justifyContent:'space-between',display:'flex',fontSize:'19px',fontFamily:'cursive'}} >
                                    <h1>Hi {this.state.username}🦁</h1>
                                    <button onClick={()=>this.setState({login:true,success:false,register:false})}>Logout</button>
                                </div>
                         <div class="row">
                             <div class='col-md-4'>
                            <CSVReader
                                ref={buttonRef1}
                                onFileLoad={this.handleOnFileLoad1}
                                onError={this.handleOnError1}
                                noClick
                                noDrag
                                onRemoveFile={this.handleOnRemoveFile1}
                            >
                                {({ file }) => (
                                <aside
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                    }}
                                >
                                    <button
                                    type='button'
                                    onClick={this.handleOpenDialog1}
                                    style={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        width: '40%',
                                        paddingLeft: 0,
                                        paddingRight: 0
                                    }}
                                    >
                                    Browse file
                                    </button>
                                    <div
                                    style={{
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                        borderColor: '#ccc',
                                        height: 45,
                                        lineHeight: 2.5,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        paddingLeft: 13,
                                        paddingTop: 3,
                                        width: '60%'
                                    }}
                                    >
                                    {file && file.name}
                                    </div>
                                    <button
                                    style={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        paddingLeft: 20,
                                        paddingRight: 20
                                    }}
                                    onClick={this.handleRemoveFile1}
                                    >
                                    Remove
                                    </button>
                                </aside>
                                )}
                            </CSVReader>
                            </div>
                            <div class='col-md-4'>
                            <CSVReader
                                ref={buttonRef2}
                                onFileLoad={this.handleOnFileLoad2}
                                onError={this.handleOnError2}
                                noClick
                                noDrag
                                onRemoveFile={this.handleOnRemoveFile2}
                            >
                                {({ file }) => (
                                <aside
                                    style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: 10,
                                   
                                    }}
                                >
                                    <button
                                    type='button'
                                    onClick={this.handleOpenDialog2}
                                    style={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        width: '40%',
                                        paddingLeft: 0,
                                        paddingRight: 0
                                    }}
                                    >
                                    Browse file
                                    </button>
                                    <div
                                    style={{
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                        borderColor: '#ccc',
                                        height: 45,
                                        lineHeight: 2.5,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        paddingLeft: 13,
                                        paddingTop: 3,
                                        width: '60%'
                                    }}
                                    >
                                    {file && file.name}
                                    </div>
                                    <button
                                    style={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        paddingLeft: 20,
                                        paddingRight: 20
                                    }}
                                    onClick={this.handleRemoveFile2}
                                    >
                                    Remove
                                    </button>
                                </aside>
                                )}
                            </CSVReader>
                            </div>
                            <div class='col-md-4'>
                            <CSVReader
                                ref={buttonRef3}
                                onFileLoad={this.handleOnFileLoad3}
                                onError={this.handleOnError3}
                                noClick
                                noDrag
                                onRemoveFile={this.handleOnRemoveFile3}
                            >
                                {({ file }) => (
                                <aside
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                    }}
                                >
                                    <button
                                    type='button'
                                    onClick={this.handleOpenDialog3}
                                    style={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        width: '40%',
                                        paddingLeft: 0,
                                        paddingRight: 0
                                    }}
                                    >
                                    Browse file
                                    </button>
                                    <div
                                    style={{
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                        borderColor: '#ccc',
                                        height: 45,
                                        lineHeight: 2.5,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        paddingLeft: 13,
                                        paddingTop: 3,
                                        width: '60%',
                                    }}
                                    >
                                    {file && file.name}
                                    </div>
                                    <button
                                    style={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        paddingLeft: 20,
                                        paddingRight: 20
                                    }}
                                    onClick={this.handleRemoveFile3}
                                    >
                                    Remove
                                    </button>
                                </aside>
                                )}
                            </CSVReader>
                            </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 border">
                                <ReactApexChart options={this.state.line.options} series={this.state.line.series} type="line" style={{width:"100%"}} height={400} />
                                    </div>
                                    <div class="col-md-6 border">
                                    <ReactApexChart options={this.state.bar.options} series={this.state.bar.series} type="bar" height={350} />
    
                                        </div>
                            </div>
                            <div class="row border w3-animate-opacity">
                                    <div style={{width:`24%`}}>
                                    <ReactApexChart options={this.state.pharma.options} series={this.state.pharma.series} type="pie" width={380} />
                                    </div>
                                    <div style={{width:`24%`}}>
                                    <ReactApexChart options={this.state.food.options} series={this.state.food.series} type="pie" width={380} />
                                    </div>
                                    <div style={{width:`24%`}}>
                                    <ReactApexChart options={this.state.non_food.options} series={this.state.non_food.series} type="pie" width={380} />
                                    </div>
                                    <div style={{width:`28%`}}>
                                    <ReactApexChart options={this.state.don.options} series={this.state.don.series} type="donut" />
                                    </div>
                            </div>
                            
             </div> : <div></div> }
        { this.state.login ?
            <div id="login">
            <h3 class="text-center text-white pt-5">Login form</h3>
            <div class="container">
                <div id="login-row" class="row justify-content-center align-items-center">
                    <div id="login-column" class="col-md-6">
                        <div id="login-box" class="col-md-12">
                            <form id="login-form" class="form">
                                <h3 class="text-center text-info">Login</h3>
                                <div class="form-group">
                                    <label for="username" class="text-info">Username:</label><br/>
                                    <input onChange={(e)=>this.handleRead(e)} style={{fontSize:'16px'}} type="text" value={this.state.username} name="username" id="username" class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="text-info">Password:</label><br/>
                                    <input onChange={(e)=>this.handleRead(e)} value={this.state.password} type="password" name="password" id="password" class="form-control"/>
                                </div>
                                <br/>
                                <div class="form-group">
                                    <input onClick={()=>this.handleLogin()} style={{fontSize:'16px'}} type="button" name="submit" class="btn btn-info btn-md" value="Login"/>
                                </div>
                                <br/>
                                <div id="register-link" class="text-right">
                                    <a style={{cursor:'pointer'}} onClick={()=>this.setState({login:false,register:true,sucess:false})} class="text-info">Register here</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>: <div> </div>

         }
         {
             this.state.register ? <div>
                 <div id="register">
        <h3 class="text-center text-white pt-5">Registration form</h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form">
                            <h3 class="text-center text-info">Register</h3>
                            <div class="form-group">
                                <label for="username" class="text-info">Username:</label><br/>
                                <input onChange={(e)=>this.handleRead(e)} style={{fontSize:'16px'}} type="text" name="un" id="username" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="email" class="text-info">Email:</label><br/>
                                <input onChange={(e)=>this.handleRead(e)} style={{fontSize:'16px'}} type="email" name="email" id="email" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br/>
                                <input onChange={(e)=>this.handleRead(e)} type="password" name="pwd" id="password" class="form-control"/>
                            </div>
                            
                            <div class="form-group">
                                <label for="cpassword" class="text-info">Confirm Password:</label><br/>
                                <input onChange={(e)=>this.handleRead(e)} type="password" name="cpwd" id="cpassword" class="form-control"/>
                            </div>
                            
                            <div style={{justifyContent:'space-between',display:'flex'}} class="form-group">
                                <input onClick={()=>this.handleRegister()} style={{fontSize:'16px'}} type="button" name="submit" class="btn btn-info btn-md" value="Register"/>
                                <input onClick={()=>this.setState({login:true,register:false,success:false})} style={{fontSize:'16px'}} type="button" name="submit" class="btn btn-info btn-md" value="<- Back to Login Page"/>
                            </div>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
                 </div> : <div> </div>
         }
    </div>    
        )
    }
}
export default UserLogin;