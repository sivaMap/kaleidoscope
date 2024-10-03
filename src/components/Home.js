import React from 'react'
import { constants } from '../constants'
import { useKaleidoCrud } from '../context/kaleidoscopeCrudContext';

const Home = () => {
    const { setLoadName } = useKaleidoCrud();
    return (
        <div className='flex flex-col gap-9 my-14'>
            <div className='flex justify-center' onClick={() => setLoadName(constants.loadScreen.curate)}>
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

            <div className='flex justify-center' onClick={() => setLoadName(constants.loadScreen.art)}>
                <span
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                    className='border-white border-opacity-30 border-2 rounded-full px-16 py-6'>
                    Create your own Show
                </span>
            </div>
        </div>
    )
}

export default Home