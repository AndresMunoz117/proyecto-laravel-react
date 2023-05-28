import Dropdown from '@/Components/Dropdown'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'

const UseCase = ({use_case, infoActor, actorID, actors, infoEntity, entityID, entities, infoReq, reqID, requirements}) => {
    const [editing, setEditing] = useState(false)
    const {data, setData, post, processing, reset, errors} = useForm({
        key: use_case.key,
        name: use_case.name,
        description: use_case.description,
        precondition: use_case.precondition,
        sequence: use_case.sequence,
        postcondition: use_case.postcondition,
        exceptions: use_case.exceptions,
        image: use_case.image,
        actors: [],
        entities: [],
        requirements: [],
        project_id: use_case.project_id
    })
    const cleanActor = (e) => {
        for (let i=0; i<data.actors.length; i++) {
            if(data.actors[i]===e.target.value){
                data.actors.splice(i, 1);
            }
        }
    }
    const cleanEntity = (e) => {
        for (let i=0; i<data.entities.length; i++) {
            if(data.entities[i]===e.target.value){
                data.entities.splice(i, 1);
            }
        }
    }
    const cleanReq = (e) => {
        for (let i=0; i<data.requirements.length; i++) {
            if(data.requirements[i]===e.target.value){
                data.requirements.splice(i, 1);
            }
        }
    }
    const submit = (e) => {
        e.preventDefault()
        post(route('use_cases_update', use_case.id),{onSuccess: ()=> setEditing(false)})
    }
    return (
        <table className="w-full border-collapse border-separate border-1 border-black border-gray-200 my-6 ">
            {editing
                ? <div>
                    <form onSubmit={submit} encType='multipart/form-data'>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Clave
                        </td>
                        <td className="w-full bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <input
                                type="text"
                                value={data.key}
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
                                                : cleanActor(e)
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
                            Entidades
                        </td>
                        <td className="flex bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <div style={{width: '50%'}} className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                                <label>Entidades actuales:</label>
                                {entities.map( entity => {
                                    return(
                                    <div key={entity.id}>
                                        {entityID.includes(entity.id)
                                        ? <label className='text-green-500'>  [{entity.key}] {entity.name}</label>
                                        : <label className='text-red-500'>  [{entity.key}] {entity.name}</label>
                                    }
                                    </div>)
                                })}
                            </div>
                            <div style={{width: '50%'}} className="w-50 bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                                <label>Nuevas entidades: (obligatorio)</label>
                                {entities.map( entity => {
                                    return(
                                    <div key={entity.id}>
                                        <input
                                            type="checkbox"
                                            value={entity.id}
                                            onChange={(e) =>{
                                                !data.entities.includes(e.target.value)
                                                ? setData('entities', [...data.entities, e.target.value])
                                                : cleanEntity(e)
                                            }}
                                            className='rounded-md border-gray-300 text-gray-600 focus:border-blue-500 focus:ring-blue-500'
                                        />
                                        <label>  [{entity.key}] {entity.name}</label>
                                    </div>)
                                })}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Precondición
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: 'calc(100%)'}}>
                                <textarea
                                    value={data.precondition}
                                    onChange={(e) => setData('precondition', e.target.value)}
                                    className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                                />
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Sequencia normal
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: 'calc(100%)'}}>
                                <textarea
                                    value={data.sequence}
                                    onChange={(e) => setData('sequence', e.target.value)}
                                    className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                                />
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Postcondición
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: 'calc(100%)'}}>
                                <textarea
                                    value={data.postcondition}
                                    onChange={(e) => setData('postcondition', e.target.value)}
                                    className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                                />
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Excepciones
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: 'calc(100%)'}}>
                                <textarea
                                    value={data.exceptions}
                                    onChange={(e) => setData('exceptions', e.target.value)}
                                    className='block w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                                />
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Requerimientos
                        </td>
                        <td className="flex bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <div style={{width: '50%'}} className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                                <label>Entidades actuales:</label>
                                {requirements.map( requirement => {
                                    return(
                                    <div key={requirement.id}>
                                        {reqID.includes(requirement.id)
                                        ? <label className='text-green-500'>  [{requirement.key}] {requirement.description}</label>
                                        : <label className='text-red-500'>  [{requirement.key}] {requirement.description}</label>
                                    }
                                    </div>)
                                })}
                            </div>
                            <div style={{width: '50%'}} className="w-50 bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                                <label>Nuevas entidades: (obligatorio)</label>
                                {requirements.map( requirement => {
                                    return(
                                    <div key={requirement.id}>
                                        <input
                                            type="checkbox"
                                            value={requirement.id}
                                            onChange={(e) =>{
                                                !data.requirements.includes(e.target.value)
                                                ? setData('requirements', [...data.requirements, e.target.value])
                                                : cleanReq(e)
                                            }}
                                            className='rounded-md border-gray-300 text-gray-600 focus:border-blue-500 focus:ring-blue-500'
                                        />
                                        <label>  [{requirement.key}] {requirement.description}</label>
                                    </div>)
                                })}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Diagrama de caso de uso
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed" >
                            <img className='mx-auto max-w-full h-auto object-cover' src={use_case.image} alt="" />
                            <label>(obligatorio) Nuevo diagrama de caso de uso: </label>
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
                            Clave
                        </td>
                        <td className="w-full bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            {use_case.key}
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Nombre
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            {use_case.name}
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Descripción
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                                {use_case.description}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Actores
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            {infoActor.map( infoActor =>
                                infoActor.use_case == use_case.id &&
                                <div key={infoActor.key}>
                                    <p>[{infoActor.key}] {infoActor.name}</p>
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Entidades
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            {infoEntity.map( infoEntity =>
                                infoEntity.use_case == use_case.id &&
                                <div key={infoEntity.key}>
                                    <p>[{infoEntity.key}] {infoEntity.name}</p>
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Precondición
                        </td>
                        <td className="w-full bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                                {use_case.precondition}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Sequencia normal
                        </td>
                        <td className="w-full bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                                {use_case.sequence}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Postcondición
                        </td>
                        <td className="w-full bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                                {use_case.postcondition}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Excepciones
                        </td>
                        <td className="w-full bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            <pre style={{overflow: 'hidden', maxWidth: '800px'}}>
                                {use_case.exceptions}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Requerimientos
                        </td>
                        <td className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed">
                            {infoReq.map( infoReq =>
                                infoReq.use_case == use_case.id &&
                                <div key={infoReq.key}>
                                    <p>[{infoReq.key}] {infoReq.description}</p>
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 text-gray-700 text-sm font-medium">
                            Diagrama de caso de uso
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="bg-gray-200 whitespace-nowrap px-4 py-2 border dark:border-neutral-500 border-dashed" >
                            <img className='mx-auto max-w-full h-auto object-cover' src={use_case.image} alt="" />
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
                                        href={route('use_cases_destroy', use_case.id)}
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

export default UseCase