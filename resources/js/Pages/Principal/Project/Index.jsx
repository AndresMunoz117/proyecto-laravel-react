import NavLink from '@/Components/NavLink'
import Project from '@/Pages/Principal/Project/Project'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Index = ({auth, projects}) => {
    return (
        <Authenticated user={auth}>
            <Head title="Projects" />
            <div className='max-w-2x1 mx-auto p-4 sm:p-6 lg:p-8'>
                <NavLink
                    className='mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 text-center mr-2 mb-2'
                    href={route('new_project')}
                >
                    NUEVO PROYECTO
                </NavLink>
                <table className="w-full border-collapse:collapse border-gray-200 my-6">
                    <thead className='bg-gradient-to-br from-purple-600 to-blue-500'>
                        <tr>
                            <th className="text-white px-4 py-2 text-gray-700 text-sm font-medium">
                                Proyecto
                            </th>
                            <th className="text-white px-4 py-2 text-gray-700 text-sm font-medium">
                                Responsable
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map( project =>
                            <Project key={project.id} project={project}/>
                        )}
                    </tbody>
                </table>
            </div>
        </Authenticated>
    )
}

export default Index