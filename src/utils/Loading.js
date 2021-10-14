import Typical from 'react-typical'

function Loading() {
    return (
        <div className="loading">
            <h1 className='loading_text'>
                <Typical wrapper='p' steps={['Loading...']}/>
            </h1>
        </div>
    )
}

export default Loading
