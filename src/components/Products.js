import React from 'react'
import axios from 'axios';
import { withRouter } from 'react-router';
import { CSVReader } from 'react-papaparse';
const buttonRef2 = React.createRef()
class Products extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading: true
        }
    }
    handleOnError2 = (err, file, inputElem, reason) => {
        console.log(err)
      }
    handleOnFileLoad2 = (data) => {
        var raja = []
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
        axios.post('http://localhost:5000/data/pr',{data:raja})
        .then(res => {
            console.log("sent data to node js");
        })
        this.setState({loading:true});
        
        // setTimeout(() => {
        //         this.props.getPie();
        //         this.setState({loading:false});
        //   }, 5000);
      }
      handleOpenDialog2 = (e) => {
        if (buttonRef2.current) {
          buttonRef2.current.open(e)
        }
      }
      handleRemoveFile2 = (e) => {
        if (buttonRef2.current) {
          buttonRef2.current.removeFile(e)
        }
      }
      handleOnRemoveFile2 = (data) => {
        console.log(data)
      }
    render()
    {
        return(
            <div>
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
                                    UPLOAD PRODUCTS
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
                                    {
                                      file && file.name ? file && file.name : "PRODUCTS FILE HERE"
                                    }
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
        );
    }
}
export default withRouter(Products);