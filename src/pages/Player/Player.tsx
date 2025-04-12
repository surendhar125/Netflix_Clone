import { useEffect, useState } from 'react';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

type videoData={
  name: string;
  key: string;
  published_at: String;
  type: string;
};

const Player = () => {
  const {id}=useParams(); // from URL like /player/:id
  const navigate =useNavigate(); //for navigation to home screen
  const [apiData, setApiData]=useState<videoData | null>(null);

  const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWNkMTVjNDMxOWExMDc2MWE1MmVhYTlhYzM2Y2YyNyIsIm5iZiI6MTc0MzE2MjAyOS42NDQsInN1YiI6IjY3ZTY4YWFkNDIxZWI4YzMzMWJhODZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GfkeJ0HU99Hi4PH_e51Vq5qQzguTLwpfNvFp8_KN1CM';

  const getMovieVideos = (movieId: string) => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
      headers: {
        accept: 'application/json',
        Authorization: API_KEY,
      }
    })
    .then((response: AxiosResponse) => {
      setApiData(response.data.results[0]);
    })
    .catch((error) => {
      console.error('Error fetching movie videos:', error);
    });
  };
  useEffect(()=>{
    if (id) {
    getMovieVideos(id); 
    }
  },[id])



  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <img src={back_arrow_icon} onClick={()=>{navigate(-1)}} alt="Back" className='absolute top-2 left-2 w-10 cursor-pointer' />
      <iframe src={`https://www.youtube.com/embed/${apiData?.key}`} width='90%' height='90%' title='trailer' frameBorder='0' allowFullScreen
      className='rounded-sm'></iframe>
      <div className='flex items-center justify-between w-[90%]'>
        <p>{apiData?.published_at.slice(0,10)}</p>
        <p>{apiData?.name}</p>
        <p>{apiData?.type}</p>
      </div>
    </div>
  )
}

export default Player