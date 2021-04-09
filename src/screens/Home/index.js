import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import FormModal from '../../components/FormModal';
import SongItem from '../../components/SongItem';
import Spinner from '../../components/Spinner';
import { SongContext } from '../../contexts/SongsContext';
import { Container } from './styles';

const HomeScreen = () => {
  const { song, songs, getSongs, saveSong }= useContext(SongContext);
  const [search, setSearch] = useState('')

  const history = useHistory();

  useEffect(() => {
    getSongs();
  }, [])


  

  const handleNewSong = () => {
    history.push("/new")
  }

  const handleLoadMore = () => {
    getSongs({ name: search, page:0, size: songs?.size + 10})
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getSongs({ name: search, page: 0, size: 10})
  }
  

  const renderList = () => {
    if(songs?.loading) {
      return <Spinner />
    }

    return songs?.data.map((data) => (
      <SongItem {...data}/>
    ));
  }

  return (
    <Container className="container">
      <h2 className="fw-bold">Song scores list</h2>
      <div class="search">
        <button className="btn btn-outline-light" onClick={handleNewSong}>Add new Song</button>

        <input name="search"
        value={search} placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>

        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
     

      <div className="row d-flex justify-content-center w-100">
        {renderList()}
      </div>

      <button className="btn btn-outline-primary" onClick={handleLoadMore}>Load More</button>
    </Container>
  )
}

export { HomeScreen }
