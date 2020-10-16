import React from 'react';

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}
  
const Content = (props) => {
    return (
        <div>
            {props.parts.map(part =>
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            )}
        </div>
    )
}
  
const Total = (props) => {

    const arrOfExercises = (arr) => {
        return arr.map(part => part.exercises);
    }

    return (
        <div>
            <h3>Total of {arrOfExercises(props.parts).reduce( (total, num) => {
                return total + num;
                })} exercises
            </h3>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
      )
}

export default Course;