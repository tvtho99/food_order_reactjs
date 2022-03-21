import { useReducer } from 'react'

const initalInputState = {
  value: '',
  isTouched: false,
}

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return { value: action.value, isTouched: state.isTouched }
    case 'BLUR':
      return { ...state, isTouched: true }
    case 'RESET':
      return initalInputState
    default:
      return initalInputState
  }
}

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initalInputState)

  const valueIsValid = validateValue(inputState.value)
  const hasError = !valueIsValid && inputState.isTouched

  const valueChangeHandler = (e) => {
    dispatch({ type: 'INPUT', value: e.target.value })
  }

  const inputBlurHandler = (e) => {
    dispatch({ type: 'BLUR' })
  }

  const resetForm = () => {
    dispatch({ type: 'RESET' })
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    resetForm,
  }
}

export default useInput
