import { BottomScrollListener } from 'react-bottom-scroll-listener';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Loading from '../utils/Loading';
import Footer from './Footer';
import {useHistory} from 'react-router-dom'


function Blog() {

    const router = useHistory();
    const [counter, setCounter] = useState(0);
    const [blogAxios, setBlogAxios] = useState()
    const [blogsFinished, setblogsFinished] = useState(false)
    const [errorOccured, setErrorOccured] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post('http://127.0.0.1:5000find', { 'password': process.env.REACT_APP_API_KEY })
            .then(res => {
                if (res.data[0].status === 'Not Found') {
                    setErrorOccured(true)
                    setLoading(false);
                }
                else {
                    setBlogAxios(res.data);
                    setLoading(false)
                }
            })
            .catch(err => {
                setErrorOccured(true)
                setLoading(false)
            })
    }, [])

    const handleOnDocumentBottom = () => {
        const newCounter = counter + 3
        if (newCounter > blogAxios.length) {
            setCounter(counter+3)
        }
        else {
            setCounter(blogAxios.length)
            setblogsFinished(true)
        }
    }

    const readBlog = (id) => {
        router.push(`/read/${id}`)
    }

    if (loading) {
        return <Loading/>
    }
    else {

        return (
            <main id='blog' className='main'>
                <div className='main-div'>
                    <div className='main-div_blog'>
                        <h1 className='main-div_blog-header'>
                            Blogs
                        </h1>
                    </div>
                    {errorOccured ? (
                        <div style={{color:'black'}}>The API is currently offline. Please try again in 10 seconds.</div>
                    ) : (
                        <div className='main-div_blogs'>
                            {
                                (6 <= blogAxios.length) ? (
                                    blogAxios.slice(0, counter).map(blog => {
                                        return <div key={blog.id} className='main-div_blogs-container' onClick={() => { readBlog(blog.id) }}>
                                            <img className='main-div_blogs-image' alt={blog.imageDescription} src={blog?.imageSource} />
                                            <div className='main-div_blogs-container-tags-container'>
                                                {blog?.tags.map(tag => { return <div style={{ color: 'white' }} key={tag} className='main-div_blogs-container-tags'>#{tag}</div> })
                                                }
                                            </div>
                                            <h3>
                                                {blog.title}
                                            </h3>
                                        </div>
                                    })
                                ) : (
                                    blogAxios.slice(0, blogAxios.length)?.map(blog => {
                                        return <div key={blog.id} className='main-div_blogs-container' onClick={() => { readBlog(blog.id) }}>
                                            <img className='main-div_blogs-image' alt={blog.imageDescription} src={blog.imageSourc || 'https://www.goodcore.co.uk/blog/wp-content/uploads/2019/08/coding-vs-programming-2.jpg'} />
                                            <div>{blog.time}</div>
                                            <div className='main-div_blogs-container-tags-container'>
                                                {blog.tags.map(tag => { return <div style={{ color: 'black' }} key={tag} className='main-div_blogs-container-tags'>#{tag}</div> })
                                                }
                                            </div>
                                                <h3 className='main-div_blogs-container-title'>
                                                    {blog.title}
                                                </h3>
                                            
                                        </div>
                                    })
                                )
                            }
                        </div>
                    )}
                </div>
                {blogsFinished ? (
                    <Footer />
                ) : (
                    <BottomScrollListener onBottom={handleOnDocumentBottom} />
                )}
                
            </main>
        )
    }
}

export default Blog
