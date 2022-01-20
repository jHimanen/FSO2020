import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clear, voted } from '../reducers/notificationReducer'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>Vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const castVote = (id, content) => {
    dispatch(vote(id))
    dispatch(voted(content))
    setTimeout(() => {
      dispatch(clear())
    }, 5000)
  }
  const anecdotes = useSelector(state => state.anecdotes)
  return (
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => castVote(anecdote.id, anecdote.content)}
        />
      )}
    </div>
  )
}

export default AnecdoteList