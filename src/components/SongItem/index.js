import React from 'react'
import { SongContainer } from './styles'

const SongItem = ({ id, name, description, image_path }) => {
  return (
    <SongContainer className="card col-lg-3 col-sm-6 col-md-4 col-xs-12 m-2 p-0" key={String(id)}>
        <img 
          src={image_path} 
          className="card-img-top" 
          alt={name} 
          style={{ objectFit: 'cover', maxHeight: 100, width: '100%' }} 
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
        </div>
    </SongContainer>
  )
}

export default SongItem
