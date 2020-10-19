export const getAverage = (grades) => {
    var num_grades = grades.length;
    var sum = 0;
    for (let i = 0; i < num_grades; i++) {
        let grade = parseInt(grades[i]);
        sum = sum + grade
    }
    return sum/num_grades
}

export const getAllStudents = () => {
    return fetch("https://www.hatchways.io/api/assessment/students")
}

export const doesContainTag = (tags,tagKey) => 
{

    if (tags !== undefined){
        console.log(tags,tagKey)
    for(var i=0;i<tags.length;i++){
        if (tags[i].toLowerCase().includes(tagKey.toLowerCase())){
            console.log("returning true")
            return true 
        }
    }
    return false}
    else{
        return false
    }
}

