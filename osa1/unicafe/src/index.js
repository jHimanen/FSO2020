import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}> {text} </button>

const StatisticLine = ({ text, status }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{status}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (!props.good && !props.neutral && !props.bad) {
    return <div>No feedback given</div>
  }
  else {
    return (
        <table>
          <tbody>
            <StatisticLine text="Good" status={props.good} />
            <StatisticLine text="Neutral" status={props.neutral} />
            <StatisticLine text="Bad" status={props.bad} />
            <StatisticLine text="All" status={props.sum} />
            <StatisticLine text="Average" status={props.average} />
            <StatisticLine text="Positive" status={props.positive} />
          </tbody>
        </table>
    )
  } 
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const changeGood = newValue => setGood(newValue)
  const changeNeutral = newValue => setNeutral(newValue)
  const changeBad = newValue => setBad(newValue)
  const sum = good + neutral + bad

  const calcAverage = () => (good - bad) / sum || 0;
  const calcPositive = () => {
    const percentage = good * 100 / sum || 0;
    return percentage + " %"
  }

  return (
    <div>
      {/* Palauteosio */}
      <Header text = "Give feedback!" />
      <Button handleClick={() => changeGood(good + 1)} text="Good" />
      <Button handleClick={() => changeNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => changeBad(bad + 1)} text="Bad" />

      {/* Tilastot */}
      <Header text = "Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} sum={sum}
        average={calcAverage()} positive={calcPositive()} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)