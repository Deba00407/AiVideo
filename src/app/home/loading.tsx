import React from 'react'
import Image from 'next/image'

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-20">
            <Image
                src="/Loader.gif"
                alt="Loading..."
                width={40}
                height={40}
                priority
            />
        </div>
    )
}

export default Loading