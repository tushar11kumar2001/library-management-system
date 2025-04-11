import React from 'react'
import Header from '../component/Header'
import Main from '../component/Main'

const LandingPage = () => {
  return (
    <div>
      <Header/>
      <Main landing={true}/>
    </div>
  )
}

export default LandingPage;
