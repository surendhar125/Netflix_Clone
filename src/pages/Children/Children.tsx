import { useState } from "react"
import Footer from "../../components/Footer"
import MoviesList from "../../components/MoviesList"
import NavBar from "../../components/NavBar"
import TvShowsList from "../../components/TvShowsList"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Children = () => {
   const [page, setPage] = useState(1);
    
    const nextPage = () => setPage(prev => prev + 2);
    const prevPage = () => setPage(prev => (prev > 1 ? prev - 2 : 1));
  
  return (
    <div>
      <NavBar/>
      <div >
        <MoviesList children={true} no={1} page={page}/>
        <MoviesList children={true} page={page+1} title="Top Rated"/>
        <TvShowsList children={true} page={page}/>
        <TvShowsList children={true} page={page+1} title="Top Rated"/>


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

export default Children