import React from 'react'
import CuratedShows from './components/CuratedShows'
import ArtWork from './components/ArtWork'

const Kaleidoscope = () => {

  return (
    <div className='py-8 px-8   flex-grow overflow-y-auto'>
      <div className='rounded-lg bg-black bg-opacity-30 p-4'>

        <div className='flex justify-between'>
          <p className='text-white text-opacity-95 text-'
            style={{ fontFamily: 'Geometria' }}
          >
            Choose any one Curated Experience <strong className='text-white '>OR</strong> any 5 Artworks to start the experience
          </p>
          <p className='rounded-2xl border-white border-2 px-4 py-1 text-white'
            style={{ fontFamily: 'Geometria' }}>
            Next
          </p>
        </div>

        <div className='flex gap-4 mt-4'>
          <CuratedShows />
          <ArtWork />
        </div>
      </div>


    </div>
  )
}

export default Kaleidoscope