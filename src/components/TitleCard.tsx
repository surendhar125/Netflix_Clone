import { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';

type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  backdrop_path: string;
  // Add more fields if needed
};

type MovieResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
};


interface Props{
  position?: string | null;
  title?: string;
  category: string;
  no?: number;
  
}
const TitleCard = ({position, title, category, no}: Props) => {

  const [apiData, setApiData]=useState<Movie[]>([]);
  const [bannerShow, setBannerShow] = useState<Movie | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollAmount = 300;

  //api fetch
  const fetchNowPlayingMovies = () => {
    axios
      .get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWNkMTVjNDMxOWExMDc2MWE1MmVhYTlhYzM2Y2YyNyIsIm5iZiI6MTc0MzE2MjAyOS42NDQsInN1YiI6IjY3ZTY4YWFkNDIxZWI4YzMzMWJhODZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GfkeJ0HU99Hi4PH_e51Vq5qQzguTLwpfNvFp8_KN1CM',
          },
        }
      )
      .then((response: AxiosResponse<MovieResponse>) => {
        setApiData(response.data.results); // Movie list
        setBannerShow(response.data.results[5]); // Set the first show as the banner

      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  };
  


  // Function to scroll left or right by button
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
 
      });
    }
  };

    // Handle mouse wheel to scroll horizontally
  const handleWheel = (e: WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollBy({ left: e.deltaY < 0 ? -scrollAmount : scrollAmount, behavior: 'smooth'});
    }
  };


    useEffect(() => {
      fetchNowPlayingMovies();

      scrollRef.current?.addEventListener('wheel', handleWheel);
    },[]);
  

  return (
    <>
    {no===1 &&bannerShow && (
        <div
          className="relative w-full h-[80vh] bg-cover bg-center flex items-end"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerShow.backdrop_path})`,
          }}
        >
          <div className="bg-gradient-to-t from-black/80 to-transparent absolute w-full h-full"></div>

          <div className="relative z-10 p-8 text-white max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">{bannerShow.title}</h1>
            <p className="text-lg mb-6 line-clamp-3">{bannerShow.overview}</p>

            <div className="flex gap-4">
              <Link
                to={`/player/${bannerShow.id}`}
                className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 transition"
              >
                ▶ Play
              </Link>
              <Link
                to={`/info/${bannerShow.id}`}
                className="bg-gray-500/70 text-white px-6 py-2 rounded font-semibold hover:bg-gray-700 transition"
              >
                ℹ More Info
              </Link>
            </div>
          </div>
        </div>
      )}
    <div className= {`${position} px-6 relative`}> 
      <h1 className="mb-4 text-2xl text-white font-bold">{title ? title : "Popular on Netflix"}</h1>

      {/* Scroll Left Button */}
      <button className="cursor-pointer hidden md:flex absolute left-2 top-[50%] z-10 bg-black/60 text-white p-2 rounded-full hover:bg-white/20 transition"
        onClick={() => scroll('left')}>
        <FaAngleLeft size={24} />
      </button>

      {/* Scroll Right Button */}
      <button className="cursor-pointer hidden md:flex absolute right-2 top-[50%] z-10 bg-black/60 text-white p-2 rounded-full hover:bg-white/20 transition"
        onClick={() => scroll('right')} >
        <FaAngleRight size={24} />
      </button>

      {/* Scrollable Card Row */}
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory focus:outline-none">
        <div className="flex gap-6 min-w-max pb-4">
          {apiData.map((card, index) => (
            <Link to={`/player/${card.id}`} key={index} className="bg-[#141414] rounded-sm overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer w-[150px] md:w-[240px] relative">
            <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt={card.title} 
              className="w-full object-cover object-center"/>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white p-2">
              <h2 className="text-sm font-semibold truncate">{card.title}</h2>
            </div>
          </Link>
          
          ))}
        </div>
      </div>

    </div>
    </>
  );
};

export default TitleCard;
