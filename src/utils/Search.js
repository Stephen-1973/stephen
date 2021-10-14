import { useParams,useHistory } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

function Search() {
  const { query } = useParams();

  const [searchResults, setResults] = useState();
  const [error, setError] = useState(true)
  const router = useHistory()
  const [userQuery, setQuery] = useState(query);

  const [autoComplete, setAutoComplete] = useState([])

  const [valueChanged, setValueChanged] = useState(false);


  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/search/${query}`)
      .then(res => {
        setResults(res.data);
        setError(false)
      })
      .catch(err => { setError(true); console.log(err) });
  }, [])

  const changeValue = (e) => {
    setValueChanged(true)
    setQuery(e.target.value)
    axios.get(`http://127.0.0.1:5000/api/${query}`)
      .then(
        response => {
          setAutoComplete(response.data)
        }
      )
      .catch(err => {console.log(err)})
  }

  const search = () => {
    router.push(`/search/${userQuery}`)
  }

  
  return (
    <div>
      {
        error ? (
          <>
            </>
        ) : (
            <>
              <div className='searchTab'>
                <div className='searchTab-container'>
                  <svg className='search-svg' focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                </div>
                <div className='searchTab-Holder'>
                  <form onSubmit={search}>
                    <input onChange={changeValue} value={userQuery}/>
                  </form>
                  <div onClick={() => {setQuery('')}}>&times;</div>
                </div>
                {valueChanged ? (
                (autoComplete.length === 0) ? (
                    <div></div>
                ) : (
                      autoComplete.map(results => {
                          return <div className='searchResults-div_container'>
                                <svg className='search-svg' focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                </svg>
                              <p>{results}</p>
                            </div>
                    })
                  )
                  
                ) : (
                    <div></div>
                )}
                <div className='searchResults-div'>
                </div>
              </div>
              
            <div className='search-results'>
              {searchResults.map(searchResult => {
                return <div key={searchResult.id} className='search-results_display'>
                  <img class='main-div_blogs-image' src={searchResult.imageSource} alt={searchResult.imageDescription} />
                  <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%',margin: 'auto', alignText: 'left'}}>
                    <h2 className='search-results_display-result'>{searchResult.title}</h2>
                    <p className='search-results_display-result-p'>{searchResult.pageDescription}</p>
                  </div>
                  
                </div>
              })}
              </div>
              </>
        )
      }
    </div>
  )
}

export default Search
