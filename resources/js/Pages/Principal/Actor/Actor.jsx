import Dropdown from '@/Components/Dropdown'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'

const Actor = ({actor}) => {
    const [editing, setEditing] = useState(false)
    const {data, setData, post, processing, reset, errors} = useForm({
        key: actor.key,
        name: actor.name,
        description: actor.description,
        characteristics: actor.characteristics,
        relations: actor.relations,
        responsability: actor.responsability,
        entry_activities: actor.entry_activities,
        exit_activities: actor.exit_activities,
        project_id: actor.project_id
    })
    const submit = (e) => {
        e.preventDefault()
        post(route('actors_update', actor.id),{onSuccess: ()=> setEditing(false)})
    }
    return (
        <table className="w-full border-collapse border-separate border-1 border-black border-gray-200 my-6 ">
            {editing
                ? <div>
                    <form onSubmit={submit}>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Clave
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <input
                                type="text"
                                value={data.key}
                                autoFocus
                                onChange={(e) => setData('key', e.target.value)}
                                className='block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Nombre
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className='block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Descripción
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Características
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <textarea
                                value={data.characteristics}
                                onChange={(e) => setData('characteristics', e.target.value)}
                                className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Relaciones
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <textarea
                                value={data.relations}
                                onChange={(e) => setData('relations', e.target.value)}
                                className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Responsabilidades
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <textarea
                                value={data.responsability}
                                onChange={(e) => setData('responsability', e.target.value)}
                                className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Actividades de entrada
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <textarea
                                value={data.entry_activities}
                                onChange={(e) => setData('entry_activities', e.target.value)}
                                className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Actividades de salida
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <textarea
                                value={data.exit_activities}
                                onChange={(e) => setData('exit_activities', e.target.value)}
                                className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className='w-full'>
                            <div className="flex justify-end">
                                <InputError message={errors.message} className='mt-2'></InputError>
                                <PrimaryButton className='mt-4 mr-4'>Guardar</PrimaryButton>
                                <button
                                    className='inline-flex items-center mt-4 px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest active:bg-gray-300 transition ease-in-out duration-150'
                                    onClick={()=>setEditing(false) && reset()}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </td>
                    </tr>
                    </form>
                </div>
                : (
                    <>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Clave
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            {actor.key}
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Nombre
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            {actor.name}
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Descripción
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                                {actor.description}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Características
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                                {actor.characteristics}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Relaciones
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                                {actor.relations}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Responsabilidades
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                                {actor.responsability}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Actividades de entrada
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                                {actor.entry_activities}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Actividades de salida
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                                {actor.exit_activities}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className='w-full text-right'>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <button
                                        className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-200 focus:bg-gray-100 transition duration-150 ease-in-out'
                                        onClick={() => setEditing(true)}
                                    >
                                        Editar
                                    </button>
                                    <Dropdown.Link
                                        as='button'
                                        className='text-white bg-red-400 hover:bg-red-500 focus:bg-red-500'
                                        href={route('actors_destroy', actor.id)}
                                        method='delete'
                                    >
                                        Eliminar
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </td>
                    </tr>
                    </>
                )
            }
        </table>
    )
}

export default Actor