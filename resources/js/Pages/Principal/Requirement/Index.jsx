import NavLink from '@/Components/NavLink'
import Requirement from './Requirement'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Index = ({auth, requirements, project}) => {
    return (
        <Authenticated user={auth}>
            <Head title="Requirements" />
            <div className='max-w-2x1 mx-auto p-4 sm:p-6 lg:p-8'>
                <NavLink
                    className='mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 text-center mr-2 mb-2'
                    href={route('requirements_new', project)}
                >
                    NUEVO REQUERIMIENTO
                </NavLink>
                <h2 className="my-5 text-2xl font-sans font-bold leading-tight text-gray-900">Requerimientos funcionales:</h2>
                <table className="w-full border-collapse:collapse border-gray-200 my-6">
                    <thead className='bg-gradient-to-br from-purple-600 to-blue-500'>
                        <tr>
                            <th className="text-white px-4 py-2 text-gray-700 text-sm font-medium">
                                Clave
                            </th>
                            <th className="text-white px-4 py-2 text-gray-700 text-sm font-medium">
                                Descripción
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {requirements.map( requirement =>
                            requirement.is_functional==1 &&
                            <Requirement key={requirement.id} requirement={requirement}/>
                        )}
                    </tbody>
                </table>
                <h2 className="my-5 text-2xl font-sans font-bold leading-tight text-gray-900">Requerimientos no funcionales:</h2>
                <table className="w-full border-collapse:collapse border-gray-200 my-6">
                    <thead className='bg-gradient-to-br from-purple-600 to-blue-500'>
                        <tr>
                            <th className="text-white px-4 py-2 text-gray-700 text-sm font-medium">
                                Clave
                            </th>
                            <th className="text-white px-4 py-2 text-gray-700 text-sm font-medium">
                                Descripción
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {requirements.map( requirement =>
                            requirement.is_functional==0 &&
                            <Requirement key={requirement.id} requirement={requirement}/>
                        )}
                    </tbody>
                </table>
            </div>
        </Authenticated>
    )
}

export default Index