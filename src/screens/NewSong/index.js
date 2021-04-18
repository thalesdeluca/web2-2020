import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Spinner from '../../components/Spinner';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '../../components/Alert';
import { SongContext } from '../../contexts/SongsContext';
import { Content, Form } from '../Auth/styles';
import { Input } from '../../components';
import { useHistory } from 'react-router';

const validationSchema = yup.object().shape({
  name: yup.string().required("Title is Required"),
  description: yup.string()
});

const NewSong = () => {
  const { song, saveSong }= useContext(SongContext);
  const [sent, setSent] = useState(false)
  const history = useHistory();

  const { register, handleSubmit, formState:{ errors } } = useForm({ 
    resolver: yupResolver(validationSchema)
    });

    const { loading, error, success} = song;
  
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState({ 
    open: false,
    message: '',
    type: "success",
  });
  

  useEffect(() => {
    if(!sent) {
      return;
    }

    if(success) {
      setAlert({
        type: "success",
        open: true,
        message: "Song saved successfully"
      }) 

      setTimeout(() => {
        history.push('/')
      }, 1500)
    } 

    if(error) {
      setAlert({
        type: "error",
        open: true,
        message: `Error on saving:\n ${error}`
      })
    }
  }, [success, error])

  const onSubmit = ({ name, description }) => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', file);

    saveSong(formData)
    setSent(true);
  }



  return (
    <div className="container">
      <Content>
      <Form className="row" onSubmit={handleSubmit(onSubmit)}>
      <Input 
        name="name" 
        placeholder="Title" 
        register={register} 
        errors={errors}
      />

      <Input 
        name="description" 
        type="text" placeholder="Description" 
        register={register} 
        errors={errors}
      />

      <input 
        name="score" 
        id="score"
        accept="image/*" 
        type="file" 
        onChange={(e) => {
          setFile(e.target.files[0])
        }}
   
        placeholder="Score" 
      />
      
      {loading 
        ? (
        <Spinner /> 
        )
        : (
          <input 
            type="submit" 
            value="Save" 
            disabled={loading} 
          />
        )
      }
    </Form>
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

export { NewSong }
