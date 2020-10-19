import React ,{Component} from "react";
import {getAverage} from "../utils/utils";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class StudentCard extends Component{
    state = {
        isExpanded : false,
        firstName : this.props.firstName,
        lastName : this.props.lastName,
        email : this.props.email,
        company : this.props.company,
        skill : this.props.skill,
        grades : this.props.grades,
        pic : this.props.pic,
        tags : [],
        currentTag : ''
    }
    
    
    toggleExpandButton = () => {
        if (this.state.isExpanded === false){
            this.setState({isExpanded : true})
        }
        else{
            this.setState({isExpanded : false})
        }
    }

    addNewTag = () => {
        if (this.state.currentTag !== ''){
            let tags = this.state.tags;
            tags.push(this.state.currentTag);
            this.setState({currentTag : '',tags : tags})
        }   
    }
    
    editCurrentTag = (e) => {
        this.setState({currentTag: e.target.value })
    }

    render() {
        const imgStyle = {
            borderRadius: "100%",
            border:"2px solid #333",
            size : "100%"
          };
        
        return (
            <div > 
                <img 
                src= {this.state.pic}
                alt="pic"
                style= {imgStyle}
                />
                <h1> {this.state.firstName}  {this.state.lastName}</h1>
                <p> email : {this.state.email}</p>
                <p> company : {this.state.company} </p>
                <p> skill : {this.state.skill}</p>
                <p> average : {getAverage(this.state.grades)} </p>
                {
                    !this.state.isExpanded?
                    (<AddIcon onClick = {this.toggleExpandButton}/>):
                    (
                        <div> 
                            <RemoveIcon onClick = {this.toggleExpandButton} />
                            {this.state.grades.map((grade,idx) => 
                                {
                                    return <p key = {idx+1}>  test {idx+1}: {grade} </p>
                                }
                            )}
                            <Button variant="contained" onClick = {this.addNewTag}>New Tag</Button>
                            <TextField
                                value = {this.state.currentTag}
                                style={{ margin: 8 }}
                                placeholder= "noob"
                                margin="normal"
                                onChange = {this.editCurrentTag}
                                InputLabelProps={{
                                    shrink: true,
                            }}
                            />
                        </div>
                        
                    )
                }
            </div>
        );
    }
}

export default StudentCard;








