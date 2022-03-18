import { signIn } from '../features/authentication/authenticationSlice'
import AuthForm from '../components/auth-form'
import { useDispatch } from 'react-redux'

const SignIn = () => {
  const dispatch = useDispatch()

  const onSubmitHandler = (event, { email, password }) => {
    event.preventDefault()
    dispatch(signIn({ email, password }))
  }

  return <AuthForm onSubmitHandler={onSubmitHandler} title="Sign In" />
}

export default SignIn
