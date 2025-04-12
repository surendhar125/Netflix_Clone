import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer"
import TvShowsList from "../../components/TvShowsList"
import { useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const TvShows = () => {
    const [page, setPage] = useState(1);
  
    const nextPage = () => setPage(prev => prev + 1);
    const prevPage = () => setPage(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      <NavBar/>
      <div >
        <TvShowsList category="popular" title="Popular" no={1} page={page} />
        <TvShowsList category="top_rated" title="Top Rated" page={page} />
        <TvShowsList category="on_the_air" title="On the Air" page={page} />
        <TvShowsList category="airing_today" title="Airing Today" page={page} />



      </div>

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

export default TvShows