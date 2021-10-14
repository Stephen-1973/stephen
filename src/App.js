import React from 'react';
import NavBar from './components/navbar';
import './sass/main.scss'
import Header from './components/Header'
import Blog from './components/Blog'
import { Switch, Route, useLocation } from 'react-router-dom';
import About from './components/About';
import Search from './utils/Search';
import BlogView from './utils/BlogView';
import { Helmet } from 'react-helmet';

function App() {
  const location = useLocation()
  return (
    <div>
      <Switch location={location} key={location.pathname}>
        <Route path='/' exact>
          <Helmet>
            <title>Stephen | Full Stack Web Developer</title>
            <meta name="description"
              content="Hey I am Stephen, Full Stack Web Developer. Join my blog series where you learn the tools required for landing a job in FAANG. You can learn Docker, Kubernetes, Typescript, Google Authentication and how to deploy your site to kubernetes cluster in digital ocean. All this made available for free. Not Only Web Developement I also write blogs where I teach datascience, Deep Learning, Machine Learning and Reinforcement Learning, Q learning in python."/>
            <meta name="robots" content="index,follow,archive"/>
            <meta name="Keywords" content="Stepeh Ex Web Developer 12 years of work experience Worked in FAANG"></meta>
          </Helmet>
          <NavBar />
          <Header />
          <Blog />
        </Route>
        <Route path='/blog'>
          <NavBar />
          <Blog />
        </Route>
        <Route path='/about'>
          <NavBar />
          <Header/>
          <About/>
        </Route>
        <Route path='/search/:query'>
          <NavBar/>
          <Search/>
        </Route>
        <Route path='/read/:id'>
          <NavBar/>
          <BlogView/>
        </Route>
      </Switch>
    </div>
  )
}

export default App
