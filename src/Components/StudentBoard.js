import React ,{Component} from "react";
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {getAllStudents} from "../utils/utils";
import StudentContainer from "./StudentContainer";


class StudentBoard extends Component{

    state = {
        loading : false,
        AllStudents : [],
        searchKey : '',
        tagKey : ''
       
    }
    componentDidMount() {
        this.setState({ loading: true });
        getAllStudents()
          .then(res => res.json())
          .then(students => this.setState({ "students" : students["students"],loading :false ,AllStudents : students["students"]}))
          // TODO: not doing anything with error right now
          // not using loading right now , but can be used later
          .catch(() => {
            this.setState({ loading: false });
          });
      }
    
    editSearchTerm = (e) => {
    this.setState({searchKey: e.target.value})
    };
    
    dynamicSearch = () => {
        let searchKey = this.state.searchKey
        
        console.log("search key ")
        console.log(searchKey)

        const filteredStudents =  this.state.AllStudents.filter(student => 
            
            student.firstName.toLowerCase().includes(searchKey.toLowerCase())
            || 
            student.lastName.toLowerCase().includes(searchKey.toLowerCase())
        )
        console.log("filtered students")
        console.log(filteredStudents)
         return filteredStudents;
  
    }
   
    render() {
        
        return (
            <div>
            <Container fixed>
            <TextField
                value = {this.state.searchKey}
                id="standard-full-width"
                style={{ margin: 8 }}
                placeholder="Placeholder"
                fullWidth
                margin="normal"
                onChange = {this.editSearchTerm}
                InputLabelProps={{
                    shrink: true,
            }}
            />
                {
                    this.state.loading
                        ?
                        <p > loading</p>
                        :<StudentContainer students = {this.dynamicSearch()}/>
                        
              }
              </Container>
              </div>
        
        );
    }
}


export default StudentBoard