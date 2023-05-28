import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { useForm, Head } from '@inertiajs/react'
import React from 'react'

const New = ({auth, project, actors, entities, requirements_F, requirements_NF}) => {
    const {data, setData, post, processing, reset, errors} = useForm({
        key: '',
        name: '',
        description: '',
        precondition: '',
        sequence: '',
        postcondition: '',
        exceptions: '',
        image: '',
        actors: [],
        entities: [],
        requirements: [],
        project_id: project
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
        post(route('use_cases_store'),{onSuccess: ()=> reset()})
    }
    return (
        <Authenticated user={auth}>
            <Head title="Create use case" />
            <div className='max-w-2x1 mx-auto p-4 sm:p-6 lg:p-8'>
                <form onSubmit={submit} className='w-full max-w-md mx-auto mt-8' encType='multipart/form-data'>
                    <label>Clave:</label>
                    <input
                        type="text"
                        value={data.key}
                        autoFocus
                        onChange={(e) => setData('key', e.target.value)}
                        placeholder='Clave del caso de uso'
                        className='shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.key} className='mt-3' />
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder='Nombre'
                        className='shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.name} className='mt-3' />
                    <label>Descripción:</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder='Descripción'
                        className='h-[120px] mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.description} className='mb-3' />
                    <label>Actores:</label>
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
                    <InputError message={errors.actors} className='mb-3' />
                    <div className='mt-3'></div>
                    <label>Entidades:</label>
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
                    <InputError message={errors.entities} className='mb-3' />
                    <div className='mt-3'></div>
                    <label>Precondición:</label>
                    <textarea
                        value={data.precondition}
                        onChange={(e) => setData('precondition', e.target.value)}
                        placeholder='Precondición'
                        className='h-[120px] mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.precondition} className='mb-3' />
                    <label>Sequencia normal:</label>
                    <textarea
                        value={data.sequence}
                        onChange={(e) => setData('sequence', e.target.value)}
                        placeholder='Secuencia normal de actividades'
                        className='h-[240px] mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.sequence} className='mb-3' />
                    <label>Postcondición:</label>
                    <textarea
                        value={data.postcondition}
                        onChange={(e) => setData('postcondition', e.target.value)}
                        placeholder='Postcondición'
                        className='h-[120px] mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.postcondition} className='mb-3' />
                    <label>Excepciones:</label>
                    <textarea
                        value={data.exceptions}
                        onChange={(e) => setData('exceptions', e.target.value)}
                        placeholder='Excepciones'
                        className='h-[200px] mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.exceptions} className='mb-3' />
                    <label>Requerimientos funcionales:</label>
                    {requirements_F.map( requirement_F => {
                        return(
                        <div key={requirement_F.id}>
                        <input
                            type="checkbox"
                            value={requirement_F.id}
                            onChange={(e) =>{
                                !data.requirements.includes(e.target.value)
                                ? setData('requirements', [...data.requirements, e.target.value])
                                : cleanReq(e)
                            }}
                            className='rounded-md border-gray-300 text-gray-600 focus:border-blue-500 focus:ring-blue-500'
                        />
                        <label>  [{requirement_F.key}] {requirement_F.description}</label>
                        </div>)
                    })}
                    <InputError message={errors.requirements} className='mb-3' />
                    <div className='mt-3'></div>
                    <label>Requerimientos no funcinonales:</label>
                    {requirements_NF.map( requirement_NF => {
                        return(
                        <div key={requirement_NF.id}>
                        <input
                            type="checkbox"
                            value={requirement_NF.id}
                            onChange={(e) =>{
                                !data.requirements.includes(e.target.value)
                                ? setData('requirements', [...data.requirements, e.target.value])
                                : cleanReq(e)
                            }}
                            className='rounded-md border-gray-300 text-gray-600 focus:border-blue-500 focus:ring-blue-500'
                        />
                        <label>  [{requirement_NF.key}] {requirement_NF.description}</label>
                        </div>)
                    })}
                    <InputError message={errors.requirements} className='mb-3' />
                    <div className='mt-3'></div>
                    <label>Diagrama de casos de uso:</label>
                    <input
                        type="file"
                        accept='Image/*'
                        onChange={(e) => setData('image', e.target.files[0])}
                        className='mb-3 w-full py-2'
                    />
                    <InputError message={errors.image} className='mb-3' />
                    <PrimaryButton
                        className='mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                        disabled={processing}
                    >
                        Crear
                    </PrimaryButton>
                </form>
            </div>
        </Authenticated>
    )
}

export default New