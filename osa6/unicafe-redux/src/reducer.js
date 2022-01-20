const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodCount = state.good
      return {
        ...state,
        good: goodCount + 1
      }
    case 'OK':
      const okCount = state.ok
      return {
        ...state,
        ok: okCount + 1
      }
    case 'BAD':
      const badCount = state.bad
      return {
        ...state,
        bad: badCount + 1
      }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer