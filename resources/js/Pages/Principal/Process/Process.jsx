import Dropdown from '@/Components/Dropdown'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'

const Process = ({process, info, actors, actorID}) => {
    const [editing, setEditing] = useState(false)
    const {data, setData, post, processing, reset, errors} = useForm({
        template_name: process.template_name,
        name: process.name,
        description: process.description,
        entry: process.entry,
        image: process.image,
        actors: [],
        project_id: process.project_id
    })
    const clean = (e) => {
        for (let i=0; i<data.actors.length; i++) {
            if(data.actors[i]===e.target.value){
                data.actors.splice(i, 1);
            }
        }
    }
    const submit = (e) => {
        e.preventDefault()
        post(route('processes_update', process.id),{onSuccess: ()=> setEditing(false)})
    }
    return (
    <table className="w-full border-collapse border-separate border-1 border-black border-gray-200 my-6 ">
            {editing
                ? <div>
                    <form onSubmit={submit} encType='multipart/form-data'>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Clave de plantilla
                        </td>
                        <td className="w-full bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <input
                                type="text"
                                value={data.template_name}
                                onChange={(e) => setData('template_name', e.target.value)}
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
                            Actores
                        </td>
                        <td className="flex bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <div style={{width: '50%'}} className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                                <label>Actores actuales:</label>
                                {actors.map( actor => {
                                    return(
                                    <div key={actor.id}>
                                        {actorID.includes(actor.id)
                                        ? <label className='text-green-500'>  [{actor.key}] {actor.name}</label>
                                        : <label className='text-red-500'>  [{actor.key}] {actor.name}</label>
                                    }
                                    </div>)
                                })}
                            </div>
                            <div style={{width: '50%'}} className="w-50 bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                                <label>Nuevos actores: (obligatorio)</label>
                                {actors.map( actor => {
                                    return(
                                    <div key={actor.id}>
                                        <input
                                            type="checkbox"
                                            value={actor.id}
                                            onChange={(e) =>{
                                                !data.actors.includes(e.target.value)
                                                ? setData('actors', [...data.actors, e.target.value])
                                                : clean(e)
                                            }}
                                            className='rounded-md border-gray-300 text-gray-600 focus:border-blue-500 focus:ring-blue-500'
                                        />
                                        <label>  [{actor.key}] {actor.name}</label>
                                    </div>)
                                })}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Descripción
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: 'calc(100%)'}}>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                                />
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Flujo de actividades
                        </td>
                        <td className="w-full bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: 'calc(100%)'}}>
                                <textarea
                                    value={data.entry}
                                    onChange={(e) => setData('entry', e.target.value)}
                                    className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                                />
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
                            <label>(obligatorio) Nueva interfaz de usuario: </label>
                            <input
                                type="file"
                                accept='Image/*'
                                onChange={(e) => setData('image', e.target.files[0])}
                                className='mb-3 w-full py-2'
                            />
                        </td>
                    </tr>
                        <InputError message={errors.message} className='mt-2'></InputError>
                        <div className="flex justify-end">
                            <PrimaryButton className='mt-4 mr-4'>Guardar</PrimaryButton>
                            <button
                                className='inline-flex items-center mt-4 px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest active:bg-gray-300 transition ease-in-out duration-150'
                                onClick={()=>setEditing(false) && reset()}
                            >
                                Cancelar
                            </button>
                        </div>
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
                            {info.map( info =>
                                info.process == process.id &&
                                <div key={info.key}>
                                    <p>[{info.key}] {info.name}</p>
                                </div>
                            )}
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