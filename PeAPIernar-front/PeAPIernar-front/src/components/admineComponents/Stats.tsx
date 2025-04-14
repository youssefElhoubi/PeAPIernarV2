import React, { useState, useEffect } from 'react'

const Stats = () => {
    return (
        <>
            <section className="bg-white">
                <div className="px-4 py-8 mx-auto max-w-screen-xl sm:py-16 lg:px-6 xl:px-0 dark:bg-gray-900">
                    <div className="mx-auto mb-8 max-w-screen-md text-center md:mb-16">
                        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 md:text-4xl dark:text-white">
                            Trusted around
                            the world
                        </h2>

                    </div>
                    <div className="mb-4 space-y-4 md:grid md:grid-cols-3 md:gap-4 xl:gap-16 md:space-y-0 md:mb-8">
                        <div className="flex justify-center items-center p-6 text-center bg-gray-100 rounded xl:p-12 dark:bg-gray-800">
                            <div className="text-gray-900 dark:text-white">
                                <p className="mb-2 text-4xl font-extrabold md:text-5xl">24,837</p>
                                <h3 className="mb-2 text-xl font-semibold">Interactions</h3>
                                <p className="font-light text-gray-500 dark:text-gray-400">Engagements recorded</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center p-6 text-center bg-gray-100 rounded xl:p-12 dark:bg-gray-800">
                            <div className="text-gray-900 dark:text-white">
                                <p className="mb-2 text-4xl font-extrabold md:text-5xl">590</p>
                                <h3 className="mb-2 text-xl font-semibold">Enterprise Clients</h3>
                                <p className="font-light text-gray-500 dark:text-gray-400">Served</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center p-6 text-center bg-gray-100 rounded xl:p-12 dark:bg-gray-800">
                            <div className="text-gray-900 dark:text-white">
                                <p className="mb-2 text-4xl font-extrabold md:text-5xl">1,234</p>
                                <h3 className="mb-2 text-xl font-semibold">Active Users</h3>
                                <p className="font-light text-gray-500 dark:text-gray-400">On our platform</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                        Last updated at Feb. 29, 2024, 7:12 p.m.
                    </p>
                </div>
            </section>
        </>
    )
}

export default Stats
