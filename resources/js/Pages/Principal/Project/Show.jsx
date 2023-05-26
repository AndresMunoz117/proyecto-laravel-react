import NavLink from '@/Components/NavLink'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Show = ({auth, projects}) => {
    return (
        <Authenticated user={auth}>
            <Head title="Project" />
            <div className='w-full max-w-md mx-auto mt-8'>
                <h2 className="text-center mb-5 text-3xl font-sans font-bold leading-tight text-gray-900">{projects.project_name}</h2>
                <h2 className="text-lg font-sans font-bold leading-tight text-gray-900">Responsable: {projects.user_name}</h2>
                <NavLink
                    className='w-[100%] mt-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 text-center mr-2 mb-2'
                    href={route('requirements_index', projects.id)}
                >
                    REQUERIMIENTOS
                </NavLink>
                <NavLink
                    className='w-[100%] text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 text-center mr-2 mb-2'
                    href={route('actors_index', projects.id)}
                >
                    ACTORES
                </NavLink>
                <NavLink
                    className='w-[100%] mb-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 text-center mr-2 mb-2'
                    href={route('entities_index', projects.id)}
                >
                    ENTIDADES
                </NavLink>
                <NavLink
                    className='w-[100%] text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 text-center mr-2 mb-2'
                    href={route('processes_index', projects.id)}
                >
                    PROCESOS
                </NavLink>
            </div>
        </Authenticated>
    )
}

export default Show