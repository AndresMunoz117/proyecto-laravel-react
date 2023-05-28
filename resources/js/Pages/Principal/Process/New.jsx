import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { useForm, Head } from '@inertiajs/react'
import React from 'react'

const New = ({auth, project, actors}) => {
    const {data, setData, post, processing, reset, errors} = useForm({
        template_name: '',
        name: '',
        description: '',
        entry: '',
        image: '',
        actors: [],
        project_id: project
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
        post(route('processes_store'),{onSuccess: ()=> reset()})
    }
    return (
        <Authenticated user={auth}>
            <Head title="Create process" />
            <div className='max-w-2x1 mx-auto p-4 sm:p-6 lg:p-8'>
                <form onSubmit={submit} className='w-full max-w-md mx-auto mt-8' encType='multipart/form-data'>
                    <label>Clave:</label>
                    <input
                        type="text"
                        value={data.template_name}
                        autoFocus
                        onChange={(e) => setData('template_name', e.target.value)}
                        placeholder='Clave de plantilla'
                        className='shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.template_name} className='mt-3' />
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
                    <label>Actividades del proceso:</label>
                    <textarea
                        value={data.entry}
                        onChange={(e) => setData('entry', e.target.value)}
                        placeholder='Pasos a seguir'
                        className='h-[120px] mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.entry} className='mb-3' />
                    <label>Interfaz de usuario:</label>
                    <input
                        type="file"
                        accept='Image/*'
                        onChange={(e) => setData('image', e.target.files[0])}
                        className='mb-3 w-full py-2'
                    />
                    <InputError message={errors.image} className='mb-3' />
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
                                : clean(e)
                            }}
                            className='rounded-md border-gray-300 text-gray-600 focus:border-blue-500 focus:ring-blue-500'
                        />
                        <label>  [{actor.key}] {actor.name}</label>
                        </div>)
                    })}
                    <InputError message={errors.actors} className='mb-3' />
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