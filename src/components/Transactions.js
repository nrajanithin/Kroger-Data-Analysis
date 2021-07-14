import React from 'react'
import axios from 'axios';
import { withRouter } from 'react-router';
import { CSVReader } from 'react-papaparse';
const buttonRef3 = React.createRef()
class Transactions extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }
    handleOpenDialog3 = (e) => {
        if (buttonRef3.current) {
          buttonRef3.current.open(e)
        }
      }
      handleOnFileLoad3 = async(data) => {
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
        axios.post('http://localhost:5000/data/tr',{data:raja})
        .then(res => {
            console.log("sent data to node js");
                    this.setState({varma:false})
        })
        this.setState({loading:true});
        setTimeout(() => {
            this.props.refresh();
      }, 5000);
      }
      handleOnError3 = (err, file, inputElem, reason) => {
        console.log(err)
      }
      handleOnRemoveFile3 = (data) => {
        console.log(data)
      }
      
      handleRemoveFile3 = (e) => {
        if (buttonRef3.current) {
          buttonRef3.current.removeFile(e)
        }
      }
    render()
    {
        return(
            <div>
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
                                    UPLOAD TRANSACTIONS
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
                                     {
                                      file && file.name ? file && file.name : "TRANSACTIONS FILE HERE"
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
                                    onClick={this.handleRemoveFile3}
                                    >
                                    Remove
                                    </button>
                                </aside>
                                )}
                            </CSVReader>
            </div>
        )
    }
}
export default withRouter(Transactions);