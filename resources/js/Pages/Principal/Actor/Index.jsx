import NavLink from '@/Components/NavLink'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import Actor from './Actor'

const Index = ({auth, actors, project}) => {
    return (
        <Authenticated user={auth}>
            <Head title="Actors" />
            <div className='max-w-2x1 mx-auto p-4 sm:p-6 lg:p-8'>
                <NavLink
                    className='mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 text-center mr-2 mb-2'
                    href={route('actors_new', project)}
                >
                    NUEVO ACTOR
                </NavLink>
                {actors.map( actor =>
                    <Actor key={actor.id} actor={actor}/>
                )}
            </div>
        </Authenticated>
    )
}

export default Index