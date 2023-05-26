import NavLink from '@/Components/NavLink'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React, { useState } from 'react'
import Process from './Process'

const Index = ({auth, actors, processes, actors_processes, project}) => {
    const [apValue,setApValue] = useState([])
    const dataP = (process) => {
        actors_processes.map( actor_process =>
            process == actor_process.process_id &&
            setApValue([...apValue, actor_process.actor_id])
        )
    }
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
                    dataP(process.id)
                        // actors_processes.map(actor_process => {
                        //     actor_process.process_id == process.id &&
                        //     setApValue([...apValue, actor_process.actor_id])
                        // })
                        // actors.map(actor => {
                        //     actor.id == process.id &&
                        //     setApValue([...apValue, actor_process.actor_id])
                        // })
                    
                    //<Process key={process.id} process={process} actors={actors} actors_processes={actors_processes} />
                )}
            </div>
        </Authenticated>
    )
}

export default Index