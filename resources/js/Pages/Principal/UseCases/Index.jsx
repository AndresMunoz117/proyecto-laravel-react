import NavLink from '@/Components/NavLink'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import UseCase from './UseCase'

const Index = ({auth, use_cases, infoActor, actorID, infoEntity, entityID, infoReq, reqID, actors, entities, requirements, project}) => {
    return (
        <Authenticated user={auth}>
            <Head title="Use Cases" />
            <div className='max-w-2x1 mx-auto p-4 sm:p-6 lg:p-8'>
                <NavLink
                    className='mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 text-center mr-2 mb-2'
                    href={route('use_cases_new', project)}
                >
                    NUEVO CASO DE USO
                </NavLink>
                {use_cases.map( use_case =>
                    <UseCase
                        key={use_case.id}
                        use_case={use_case}
                        infoActor={infoActor}
                        actorID={actorID[use_case.id].actors}
                        actors={actors}
                        infoEntity={infoEntity}
                        entityID={entityID[use_case.id].entities}
                        entities={entities}
                        infoReq={infoReq}
                        reqID={reqID[use_case.id].requirements}
                        requirements={requirements}
                    />
                )}
            </div>
        </Authenticated>
    )
}

export default Index