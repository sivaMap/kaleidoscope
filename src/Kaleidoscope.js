import React from 'react'

const Kaleidoscope = (props) => {

  return (
    <div className='px-10   flex-grow overflow-y-auto'>
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          fontFamily: 'Geometria'
        }}
        className='rounded-lg p-4 text-white text-xl font-bold'>

        <div className='flex flex-col gap-9 my-14'>
          <div className='flex justify-center'>
            <span
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
              className='border-white border-opacity-30 border-2 rounded-full px-12 py-6'>
              Experience a Curated Show
            </span>
          </div>

          <div className='flex justify-center  items-center gap-5'>
            <hr className="w-2/12 border-t border-gray-300 mx-2" />
            <p >OR</p>
            <hr className="w-2/12 border-t border-gray-300 mx-2" />
          </div>

          <div className='flex justify-center'>
            <span
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
              className='border-white border-opacity-30 border-2 rounded-full px-16 py-6'>
              Create your own Show
            </span>
          </div>
        </div>
      </div>


    </div>
  )
}
// background: rgba(0, 0, 0, 0.3);

export default Kaleidoscope