import React from 'react'

type props = {
    
}

const StateCard :React.FC = () => {
    return (
        <>
            <div className="flex justify-center items-center p-6 text-center bg-gray-100 rounded xl:p-12 dark:bg-gray-800">
                <div className="text-gray-900 dark:text-white">
                    <p className="mb-2 text-4xl font-extrabold md:text-5xl">24,837</p>
                    <h3 className="mb-2 text-xl font-semibold">Interactions</h3>
                    <p className="font-light text-gray-500 dark:text-gray-400">Engagements recorded</p>
                </div>
            </div>
        </>
    )
}

export default StateCard
