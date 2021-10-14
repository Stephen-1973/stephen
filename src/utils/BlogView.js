import DOMPurify from 'dompurify';
import { useHistory,useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';



function BlogView() {
  const router = useHistory();
  const [blogData, setBlogData] = useState([]);

  const [loading, setLoading] = useState(true);

  const { id } = useParams();


  useEffect(() => {
    axios.post(`http://127.0.0.1:5000/api/get/${id}`, { 'password': process.env.REACT_APP_API_KEY }).then(response => {
      setBlogData(response.data)
      setLoading(false)
    }).catch(err => {
      console.log(err);
    })
  }, [])

  // const readPreviousBlog = (blogData) => {
  //   if (blogData.length > 1) {
  //     const previousId = blogData[1].id
  //     router.push(`/read/${previousId}`)
  //   }
  //   else {
  //     alert('This is the first blog.')
  //   }
  // }

  return (
  <>
    {
      loading ? (
          <div>
            Unable to load the blog. Refresh the page or try again in 2 minutes.
            Sorry for the inconvenience.
            {id}
          </div>
        ): (
            <div className='blogView'>
              <Helmet>
                <meta charSet='utf-8'></meta>
                <title>{blogData[0].title || 'Coding Blog to land a job in FAANG.'}</title>
                <link rel='stylesheet' type='text/css' href={blogData[0].cssRef || null}></link>
                <meta name='description' content={blogData[0].pageDescription || "Blog that helps students to land a job in FAANG. Read more find out how to land a job in FAANG"}></meta>
              </Helmet>
              <button style={{padding: '0.2rem 2rem'}} className='btn btn-red' onClick={() => { router.push('/') }}>
                <p>
                  Exit
                </p>
              </button>
              <div className='blogView_blog' >
                <div className='blogStart' >
                  <div className='blogStart-read' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogData[0].message)}}></div>
                </div>
                {/* {
                  (blogData.length > 1) ? (
                  <div className='blogView_previousBlog' onClick={readPreviousBlog(blogData)}>
                    Read my previous blog.
                    </div>
                  ) : (
                      null
                  )
                } */}
              </div>
            </div>
        )
      }

    </>
      
    
  )
}

export default BlogView
