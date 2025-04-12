import { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { fetchTvShows, fetchTvShowsByLanguage, fetchTvShowsChildren } from '../services/tmdbService';
import { FaPlay } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';

interface TVShow {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
  [key: string]: any;
}

interface Props {
  title?: string;
  category?: string;
  no?: number;
  lang?: string;
  children?: boolean;
  page?: number;
}

const TvShowsList = ({ title, category, no, lang, children, page}: Props) => {
  const [apiData, setApiData] = useState<TVShow[]>([]);
  const [bannerShow, setBannerShow] = useState<TVShow | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollAmount = 300;
  
  // API Fetch
  const fetchData = async () => {
    
    try {
      let data;
      if (lang) {
        data = await fetchTvShowsByLanguage(lang, page? page: 1);
      } else if (category) {
        data = await fetchTvShows(category, (page? page: 1));
      } else if(children){
        data = await fetchTvShowsChildren(page? page: 1);
      }else {
        console.warn("No category or language provided to TitleCard.");
        return;
      }

      setApiData(data.results);
      setBannerShow(data.results[5]);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    }
  };
  
  // Scroll with arrows
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Scroll with mouse wheel
  const handleWheel = (e: WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollBy({
        left: e.deltaY < 0 ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    fetchData();
    scrollRef.current?.addEventListener('wheel', handleWheel);
  }, [lang, category, page]);

  return (
    <>
      {/* Banner */}
      {no===1 &&bannerShow && (
        <div
          className="relative w-full h-[85vh] bg-cover bg-center flex items-end"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerShow.backdrop_path})`,
          }}
        >
          <div className="bg-gradient-to-t from-black/80 to-transparent absolute w-full h-full"></div>

          <div className="relative z-10 p-8 text-white max-w-3xl">
            <h1 className="text-2xl sm:text-5xl font-bold mb-4">{bannerShow.name}</h1>
            <p className="text-lg mb-6 line-clamp-2 sm:line-clamp-3">{bannerShow.overview}</p>

            <div className="flex gap-4">
             <Link to={`/player/${bannerShow.id}`}
                className="flex items-center gap-2 bg-white text-black px-3 sm:px-6 py-2 rounded-md font-semibold hover:bg-gray-300 transition">
                  <FaPlay className="text-xl" />
                  Play
              </Link>
              <Link
                to={`/info/${bannerShow.id}`}
                className="flex items-center gap-2 bg-white/30 text-white px-3 sm:px-6 py-2 rounded-md font-semibold hover:bg-white/20 transition">
                <MdInfoOutline className="text-xl" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Scroll List */}
      <div className={'px-6 relative'}>
        <h1 className="mb-4 text-2xl text-white font-bold">
          {title ? title : "Popular TV Shows"}
        </h1>

        {/* Scroll Buttons */}
        <button
          className="cursor-pointer hidden md:flex absolute left-2 top-[50%] z-10 bg-black/60 text-white p-2 rounded-full hover:bg-white/20 transition"
          onClick={() => scroll('left')}
        >
          <FaAngleLeft size={24} />
        </button>

        <button
          className="cursor-pointer hidden md:flex absolute right-2 top-[50%] z-10 bg-black/60 text-white p-2 rounded-full hover:bg-white/20 transition"
          onClick={() => scroll('right')}
        >
          <FaAngleRight size={24} />
        </button>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory focus:outline-none"
        >
          <div className="flex gap-6 min-w-max pb-4">
            {apiData.map((card, index) => (
              <Link
                to={`/player/${card.id}`}
                key={index}
                className="bg-[#141414] rounded-sm overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer w-[150px] md:w-[240px] relative"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`}
                  alt={card.name}
                  className="w-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white p-2">
                  <h2 className="text-sm font-semibold truncate">{card.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TvShowsList;
