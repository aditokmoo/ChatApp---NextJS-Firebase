import React from 'react'

interface PropTypes {
    progress: number
}

export default function ProgressBar({ progress }: PropTypes) {
    return (
        <div className={`fixed top-0 left-0 right-0 w-full overflow-hidden ${progress > 0 ? 'h-2 bg-gray-200' : 'bg-[#232533]'}`}>
            <div style={{ width: `${progress}%` }} className='w-full h-2 bg-primary transition-all duration-500'></div>
        </div>
    )
}
