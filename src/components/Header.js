import Typical from 'react-typical';


function Header() {
    return (
        <header>
            <div className='header'>
                {/* <h3 className='heading-primary--sub header-welcome' style={{fontFamily: 'Alex Brush, cursive'}}>Welcome to my
                    world!</h3> */}
                <div className='header-mini'>
                    <h1 className='heading-primary--main header-name'><Typical steps={['Hey',1000,"I'm Stephen"]} wrapper="p"/></h1>
                    <p className='heading-primary--sub header-work'>A
                        <span>Pr<span>o</span></span>grammer
                    </p>
                    <button className='btn'>
                        Discover
                    </button>
                </div>
            </div>

        </header>
    )
}

export default Header
