import NavLink from '@/Components/NavLink'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import Process from './Process'

const Index = ({auth, processes, info, actors, actorID, project}) => {
    return (
        <Authenticated user={auth}>
            <Head title="Processes" />
            <div className='max-w-2x1 mx-auto p-4 sm:p-6 lg:p-8'>
                <NavLink
                    className='mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 text-center mr-2 mb-2'
                    href={route('processes_new', project)}
                >
                    NUEVO PROCESO
                </NavLink>
                {processes.map( process =>
                    <Process key={process.id} process={process} info={info} actors={actors} actorID={actorID[process.id].actors} />
                )}
            </div>
        </Authenticated>
    )
}

export default Index