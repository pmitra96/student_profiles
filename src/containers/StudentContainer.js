import React, { Component } from "react";
import StudentCard from "../Components/StudentCard";
import { ListItem } from "@material-ui/core";

class StudentContainer extends Component {
  render() {
    return (
      <div>
        {this.props.students.length
          ? this.props.students.map(
              (
                { firstName, lastName, email, company, skill, grades, pic },
                idx
              ) => (
                <ListItem key={idx + 1} xs={12} sm={6} md={3}>
                  <StudentCard
                    addNewTag = {this.props.addNewTag}
                    key={idx + 1}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    company={company}
                    skill={skill}
                    grades={grades}
                    pic={pic}
                  />
                </ListItem>
              )
            )
          : "no data"}
      </div>
    );
  }
}
export default StudentContainer;
