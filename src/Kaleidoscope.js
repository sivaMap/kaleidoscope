import React from 'react'
import CuratedShows from './components/CuratedShows'
import ArtWork from './components/ArtWork'
import Home from './components/Home'
import { constants } from './constants'
import { useKaleidoCrud } from './context/kaleidoscopeCrudContext'

const Kaleidoscope = () => {
  const { loadName } = useKaleidoCrud();

  // Either one of Three bodies or cases will be loaded based on loadName state
  const loadDocument = () => {
    let view = [];
    switch (loadName) {
      case constants.loadScreen.default: view.push(
        <Home key={"KaleidoscopeHome"} />
      )
        break;
      case constants.loadScreen.curate: view.push(
        <CuratedShows key={"KaleidoscopeCurate"} />
      )
        break;
      case constants.loadScreen.art: view.push(
        <ArtWork key={"KaleidoscopeArt"} />
      )
        break;
      default: break
    }
    return view;
  }

  return (
    <div className='px-10 flex-grow'>
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          fontFamily: 'Geometria'
        }}
        className='rounded-lg p-4 text-white text-xl font-bold'>
        {/* dynamic application body */}
        {loadDocument()}
      </div>
    </div>
  )
}

export default Kaleidoscope