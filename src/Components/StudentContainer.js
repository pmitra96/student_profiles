import React ,{Component} from "react";
import StudentCard from "./StudentCard";
import { ListItem } from '@material-ui/core';


class StudentContainer extends Component{
    componentDidUpdate(prevProps){
        if(prevProps.students !== this.props.students){
            console.log("props")
            console.log(prevProps,this.props)
            this.setState({          
                students: this.props.students,
                function() {
                    console.log("studentsss")
                    console.log(this.state.students);
                  }
            });
        }
    }
    
    constructor(props) {   
        console.log("constructor called")
        console.log(props)
        super(props);  
        this.state = {students: this.props.students}; 
     }
    render() {
        console.log("rendering again")
        console.log(this.state.students)
        return (
            
            <div>
            {
                
                this.state.students.length?
                this.state.students.map(({firstName, lastName,email, company,skill,grades,pic }, idx) => (
                        
                        <ListItem xs={12} sm={6} md={3}>
                        <StudentCard key = {idx+1} firstName = {firstName} lastName = {lastName} email = {email} company = {company} skill = {skill} grades = {grades} pic={pic}  />
                        </ListItem>
                    )) : 'no data'
            }
                </div>
        )
    }

}
export default StudentContainer;