import React ,{Component} from "react";
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {getAllStudents,doesContainTag} from "../utils/utils";
import StudentContainer from "../Containers/StudentContainer";
import _ from "lodash";

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
          .then(students => this.setState({ loading :false ,AllStudents : students["students"]}))
          // TODO: not doing anything with error right now
          // not using loading right now , but can be used later
          .catch(() => {
            this.setState({ loading: false });
          });
      }
    
    addNewTag = (email,tags) => {
        console.log("add new tag",email,tags)
        const StudentsAfterTagUpdate = this.modifyStateWithTags(this.state.AllStudents,email,tags)
        this.setState({ AllStudents : StudentsAfterTagUpdate })
    }

    modifyStateWithTags = (students,email,tags) =>
    {
        var newStudents = _.cloneDeep(students)
        for(var i =0 ; i  < newStudents.length;i++){
            if (newStudents[i].email === email){
                newStudents[i]["tags"] = tags
            }
        }
        return newStudents;
    }
    
    editSearchTerm = (e) => {
    this.setState({searchKey: e.target.value})
    };
    editTagKey = (e) => {
    this.setState({tagKey: e.target.value})
    }

    dynamicSearch = () => {

        let searchKey = this.state.searchKey
        let tagKey = this.state.tagKey
        console.log("search key ")
        console.log(searchKey)

        var filteredStudents =  this.state.AllStudents.filter(student => 
            
            {
                const nameFilter =  (student.firstName.toLowerCase().includes(searchKey.toLowerCase())|| 
                    student.lastName.toLowerCase().includes(searchKey.toLowerCase()))
                
                return nameFilter 
            }
        
        )

        var tagFilteredStudents =  this.state.AllStudents.filter(student => 
            
            {
                return doesContainTag(student.tags,tagKey)

            }
        
        )
        if (tagKey === ''){
            tagFilteredStudents = this.state.AllStudents
        }
        if(searchKey === ''){
            filteredStudents = this.state.AllStudents
        }
        var finalResult = filteredStudents.filter(value => tagFilteredStudents.includes(value))
        return finalResult;
  
    }
   
    render() {
        
        return (
            <div>
            <Container fixed>
            <TextField 
                value = {this.state.searchKey}
                id="standard-full-width"
                style={{ margin: 8 }}
                placeholder="enter student firstName or lastName"
                fullWidth
                margin="normal"
                onChange = {this.editSearchTerm}
                InputLabelProps={{
                    shrink: true,
            }}
            />
            <TextField
                value = {this.state.tagKey}
                
                style={{ margin: 8 }}
                placeholder="enter a tag to search"
                fullWidth
                margin="normal"
                onChange = {this.editTagKey}
                InputLabelProps={{
                    shrink: true,
            }}
            />
                {
                    this.state.loading
                        ?
                        <p > loading</p>
                        :<StudentContainer addNewTag = {this.addNewTag} students = {this.dynamicSearch()}/>
                        
              }
              </Container>
              </div>
        
        );
    }
}


export default StudentBoard