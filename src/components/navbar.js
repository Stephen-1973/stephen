import SearchIcon from '../utils/SearchIcon';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



function NavBar() {

    const router = useHistory();

    const [searchActive, setSearchActive] = useState(false);
    const [searchData, setSearchData] = useState()
    const [searchResults, setSearchResults] = useState();
    const [searchError, setSearchError] = useState(true);

    const activateSearch = () => {
        setSearchActive(true);
    }

    const deactivateSearch = () => {
        setSearchActive(false);
        setSearchResults('');
        setSearchData('');
        setSearchError(false)
    }

    const handleChange = (e) => {
        axios.get(`http://127.0.0.1:5000/api/${searchData}`)
            .then(res => {
                setSearchResults(res.data);
                setSearchError(false)
            }).catch(err => { setSearchError(true) })
        setSearchData(e.target.value)
    }

    const handleSearchResultClick = (e) => {
        setSearchData(e.target.innerText);
        router.push(`/search/${searchData}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchData) {
            console.log('Null Value')
        }
        else {
            axios.get(`http://127.0.0.1:5000/add/autoComplete/${searchData}`)
            router.push(`/search/${searchData}`);
        }
    }

    const navigateHome = () => {
        router.push('/')
    }

    const navigateAbout = () => {
        router.push('/about')
    }


    return (
        <div className='navbar'>
            <div className='navbar-logo'>
                <h1 onClick={navigateHome} className='navbar-logo_header'>Stephen.</h1>
            </div>
            <div className='navbar-links'>
                <li className='navbar-links_blogs'>
                    <a href='#blog' style={{textDecoration: 'none',color:'black'}}>Blog</a>
                </li>
                <li className='navbar-links_about'>
                    <div onClick={navigateAbout} style={{ textDecoration: 'none', color: 'black' }}>About</div></li>
                {searchActive ? (
                    <div className='navbar-links_search'>
                        <div className='bigSearch'>
                            <div className='navbar-links_search bigSearch_search'>
                                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                                <form onSubmit={handleSubmit}>
                                    <input type='text' name='search' value={searchData} onChange={handleChange} placeholder="Search Blogs.." />
                                </form>
                                <div className='bigSearch_search-exit' onClick={deactivateSearch}>&times;</div>
                            </div>
                            {searchError ? (
                                <div>
                                    
                                </div>
                            ) : (
                                (searchResults.length > 0) ?  (
                                    
                                searchResults.map(searchResult => {
                                    return <div className='searchResult' key={searchResult}>
                                        <p onClick={handleSearchResultClick}>
                                            {searchResult}
                                        </p>
                                    </div>
                                })
                                    )
                                        :
                                        (
                                            <div></div>
                                        )
                            )}
                        </div>
                    </div>
                ) : (
                        <div className='navbar-links_search' onClick={activateSearch}>
                            <SearchIcon />
                        </div>                    
                    )}
                
            </div>
        </div>
    )
}

export default NavBar
