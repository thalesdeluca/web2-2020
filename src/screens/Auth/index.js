import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../components';
import { Content, Form } from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import Alert from '../../components/Alert';
import Spinner from '../../components/Spinner';

const validationSchema = yup.object().shape({
  login: yup.string().required("Username/Email is required"),
  password: yup.string().required("Password is required")
});

const validationRegisterSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirm_password: yup.string().required("Confirmation Password is required").oneOf([yup.ref("password")], "Passwords do not match")
});


const AuthScreen = () => {
  const [isRegister, setIsRegister] = useState(false);

  const { register, handleSubmit, formState:{ errors } } = useForm({ 
    resolver: yupResolver(isRegister 
      ? validationRegisterSchema 
      : validationSchema)
    });

  const { register: signup, auth, login } = useContext(AuthContext);

  const { loginLoading, loginSuccess, loginError } = auth;

  const [alert, setAlert] = useState({ 
    open: false,
    message: '',
    type: "success",
  });

  useEffect(() => {
    if(loginSuccess) {
      setAlert({
        type: "success",
        open: true,
        message: "User authenticated successfully"
      })
    } 

    if(loginError) {
      console.log("çlogin", loginError)
      setAlert({
        type: "error",
        open: true,
        message: `Authentication Error:\n ${loginError}`
      })
    }
  }, [loginSuccess, loginError])

  const onChangeTab = (e) => {
    e.preventDefault()
    setIsRegister(!isRegister)
  }

  const onSubmit = useCallback((values) => {
    if(isRegister) {
      signup(values)
    } else {
      const params = {
        ...(values?.login?.includes("@") 
          ? { email: values.login } 
          : { username: values.login }),
        password: values['password']
      }
      login(params);
    }
    
  }, [signup, login, isRegister])

  const RegisterForm = () => (
    <Form className="row" onSubmit={handleSubmit(onSubmit)}>
      <Input name="email" placeholder="Email" register={register} errors={errors}/>
      <Input name="username" placeholder="Username" register={register} errors={errors}/>
      <Input name="password" type="password" placeholder="Password" register={register}  errors={errors}/>
      <Input name="confirm_password" type="password" placeholder="Confirm Password" register={register} errors={errors}/>
      { loginLoading 
        ? (
        <Spinner /> 
        )
        : (
          <input 
            type="submit" 
            value="Register" 
            disabled={loginLoading} 
          />
        )
      }
      <a href="#" className="pt-4" onClick={onChangeTab}>Already have an account? Log in</a>
    </Form>
  )

  const LoginForm = () => (
    <Form className="row" onSubmit={handleSubmit(onSubmit)}>
      <Input name="login" placeholder="Username or Email" register={register} errors={errors}/>
      <Input name="password" type="password" placeholder="Password" register={register} errors={errors}/>
      
      {loginLoading 
        ? (
        <Spinner /> 
        )
        : (
          <input 
            type="submit" 
            value="Login" 
            disabled={loginLoading} 
          />
        )
      }
      <a href="#" className="pt-4" onClick={onChangeTab}>Sign up</a>
    </Form>
  )

  return (
    <div className="container">
      <Content>
        {isRegister ? <RegisterForm /> : <LoginForm />}
      </Content>     
      
      <Alert 
        delay={3000}
        type={alert?.type}        
        isOpen={alert?.open}
        message={alert?.message}
        onFinish={() => setAlert({ ...alert, open: false })}
      />
    </div>
  )
}

export { AuthScreen } 
