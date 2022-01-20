const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTED':
      return action.data.message
    case 'CREATED':
      return action.data.message
    case 'CLEAR':
      return action.data.message
  }
  return state
}

const initialState = null

export const voted = target => {
  const message = `You voted for '${target}'`
  return {
    type: 'VOTED',
    data: { message }
  }
}

export const created = target => {
  const message = `You created the anecdote '${target}'`
  return {
    type: 'CREATED',
    data: { message }
  }
}

export const clear = () => {
  const message = null
  return {
    type: 'CLEAR',
    data: { message }
  }
}

export default notificationReducer