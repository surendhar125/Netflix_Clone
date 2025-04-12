import { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import MoviesList from "../../components/MoviesList";
import TvShowsList from "../../components/TvShowsList";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const languageOptions = [
  {code: "en", label: 'English'},
  { code: "ta", label: "Tamil" },
  { code: "ml", label: "Malayalam" },
  { code: "hi", label: "Hindi" },
  { code: "te", label: "Telugu" },
  { code: "kn", label: "Kannada" },
  { code: "mr", label: "Marathi" },
  { code: "bn", label: "Bengali" },
  { code: "gu", label: "Gujarati" },
  { code: "pa", label: "Punjabi" },
  { code: "ur", label: "Urdu" },
];

const TvShows = () => {
  const [selectedLang, setSelectedLang] = useState("");

    const [page, setPage] = useState(1);
    
    const nextPage = () => setPage(prev => prev + 1);
    const prevPage = () => setPage(prev => (prev > 1 ? prev - 1 : 1));


  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLang(e.target.value);
    setPage(1);
  };

  return (
    
    <div>
      <NavBar />


      {/* Content */}
      {!selectedLang?
        (<div>
          <MoviesList lang='ta' title='Popular in Tamil' no={1} page={page} />
          <MoviesList lang='en' title='Popular in English' page={page}/>
          <MoviesList lang='ml' title='Popular in Malayalam'   page={page}/>
          <MoviesList lang='hi' title='Popular in Hindi' page={page}/>
          <MoviesList lang='te' title='Popular in Telugu' page={page}/>
          <MoviesList lang='kn' title='Popular in Kannada' page={page}/>
          <MoviesList lang='mr' title='Popular in Marathi' page={page}/>
          <MoviesList lang='bn' title='Popular in Bengali' page={page}/>
        </div>)
      : (<div>
          <MoviesList lang={selectedLang} title={`Popular in ${languageOptions.find(l => l.code === selectedLang)?.label}`} no={1} page={page} />
          <TvShowsList lang={selectedLang} title={`Popular in ${languageOptions.find(l => l.code === selectedLang)?.label}`} page={page} />
        </div>)}


      {/* Language Selector */}
      <div className="px-6 py-4">
        <label className="text-white font-semibold mr-2">Select Language:</label>
        <select value={selectedLang} onChange={handleLanguageChange}
          className="p-2 bg-neutral-900 text-white border-0 outline-0">
          {languageOptions.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
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

      <Footer />
    </div>
  );
};

export default TvShows;
