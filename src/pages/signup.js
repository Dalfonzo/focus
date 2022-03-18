import { signUp } from '../features/authentication/authenticationSlice'
import AuthForm from '../components/auth-form'
import { useDispatch } from 'react-redux'

const SignUp = () => {
  const dispatch = useDispatch()

  const onSubmitHandler = (event, { email, password }) => {
    event.preventDefault()
    dispatch(signUp({ email, password }))
  }

  return <AuthForm onSubmitHandler={onSubmitHandler} title="Sign Up" />
}

export default SignUp
