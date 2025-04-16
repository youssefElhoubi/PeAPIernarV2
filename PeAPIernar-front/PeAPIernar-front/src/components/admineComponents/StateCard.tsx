import React from 'react'

type props = {
    sales : number

}

const StateCard :React.FC<props> = ({sales}) => {
    return (
        <>
            <div className="flex justify-center items-center p-6 text-center bg-gray-100 rounded xl:p-12 dark:bg-gray-800">
                <div className="text-gray-900 dark:text-white">
                    <p className="mb-2 text-4xl font-extrabold md:text-5xl">{sales}</p>
                    <h3 className="mb-2 text-xl font-semibold">totale sales</h3>
                </div>
            </div>
        </>
    )
}

export default StateCard
