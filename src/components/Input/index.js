import React from 'react'
import { InputContainer } from './styles'

export const Input = ({ errors = [], register, label, ...props}) => {
  return (
    <InputContainer>
      <label htmlFor={props?.name}>{label}</label>
      <input {...props} {...register(props?.name)}/>
      {errors[props?.name] && <span>{errors[props?.name]?.message}</span>}
    </InputContainer>
   
  
  )
}

