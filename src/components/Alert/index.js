import React, { useEffect, useState } from 'react'
import { AlertContainer } from './styles';

export const ALERT_TYPES = {
  'success': 'bg-success',
  "error": 'bg-danger'
}

const Alert = ({ 
  delay = 3000, 
  message = '', 
  isOpen = false, 
  onFinish = () => {}, 
  type = 'success' 
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(isOpen) {
      setOpen(isOpen);
      setTimeout(() => {
        setOpen(false);
      console.log("Finish", false);

        onFinish(true);
      }, delay)
    }
  }, [isOpen, delay, onFinish])
  console.log("isOpen", isOpen);
  return (
    <AlertContainer className={ALERT_TYPES[type]} isOpen={open}>
      <h4>{message}</h4>
    </AlertContainer>
  )
}

export default Alert
