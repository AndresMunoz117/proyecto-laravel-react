import Dropdown from '@/Components/Dropdown'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

const Process = ({process, actors, actors_processes}) => {
  const [value,setValue] = useState([]);
  useEffect(() => {
    actors_processes.map( actor => {
      actor.process_id == process.id &&
      setValue([...value, actor.actor_id])
    })
  },[])
  const [editing, setEditing] = useState(false)
    const {data, setData, post, processing, reset, errors} = useForm({
        template_name: process.template_name,
        name: process.name,
        description: process.description,
        entry: process.entry,
        image: process.image,
        actors: actors,
        project_id: process.project_id
    })
    const submit = (e) => {
        e.preventDefault()
        post(route('processes_update', process.id),{onSuccess: ()=> setEditing(false)})
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
                          Clave de plantilla
                      </td>
                      <td className="w-full bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                          {process.template_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                          Nombre
                      </td>
                      <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                          {process.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                          Actores
                      </td>
                      <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                        {console.log(value)}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                          Descripción
                      </td>
                      <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                          <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                              {process.description}
                          </pre>
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                        Flujo de actividades
                      </td>
                      <td className="w-full bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                        <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                            {process.entry}
                        </pre>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                          Interfaz de usuario
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed" >
                        <img className='mx-auto max-w-full h-auto object-cover' src={process.image} alt="" />
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
                                        href={route('processes_destroy', process.id)}
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

export default Process