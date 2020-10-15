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
        <ul>
            {props.parts.map(part =>
                <li key={part.id}>
                    {part.name} {part.exercises}
                </li>
            )}
        </ul>
    )
  }
  
  /*
  const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
        </div>
    )
  }
  */

  const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
        </div>
      )
  }

  //To be added: <Total parts={props.course.parts} />


  export default Course;