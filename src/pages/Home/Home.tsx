import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer"
import TvShowsList from "../../components/TvShowsList"
import MoviesList from "../../components/MoviesList"
import { useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const Home = () => {
    const [page, setPage] = useState(1);
    
    const nextPage = () => setPage(prev => prev + 1);
    const prevPage = () => setPage(prev => (prev > 1 ? prev - 1 : 1));
  
  
  return (
    <div>
      <NavBar/>
      <MoviesList category="popular"  title="Popular Movies" no={1} page={page}/>
      <MoviesList title="Blockbuster Movie" category="top_rated" page={page}/>
      <MoviesList title="Upcoming" category="upcoming" page={page}/>
      <MoviesList title="Top Pics for you" category="now_playing" page={page}/>
      <TvShowsList category="popular" page={page}/>
      <TvShowsList category="top_rated" title="Top Rated" page={page}/>
      <TvShowsList category="on_the_air" title="On the Air" page={page}/>
      <TvShowsList category="airing_today" title="Airing Today" page={page}/>

      <div className="flex justify-between px-6 py-4">
          <button onClick={prevPage} disabled={page === 1}
            className="bg-gray-700 flex items-center text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50">
            <IoIosArrowBack/>
            <p className="hidden sm:flex">Previous</p>
            
          </button>
          <span className="text-white font-semibold text-lg">Page: {page}</span>
          <button onClick={nextPage}
            className="bg-gray-700 flex items-center text-white px-4 py-2 rounded hover:bg-gray-600">
            <p className="hidden sm:flex">Next</p>
            <IoIosArrowForward/>
          </button>
        </div>
      <Footer/>
    </div> 

  )
}

export default Home