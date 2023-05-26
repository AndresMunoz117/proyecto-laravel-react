import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { useForm, Head } from '@inertiajs/react'
import React from 'react'

const New = ({auth, project}) => {
    const {data, setData, post, processing, reset, errors} = useForm({
        key: '',
        name: '',
        description: '',
        characteristics: '',
        relations: '',
        responsability: '',
        entry_activities: '',
        exit_activities: '',
        project_id: project
    })
    const submit = (e) => {
        e.preventDefault()
        post(route('actors_store'),{onSuccess: ()=> reset()})
    }
    return (
        <Authenticated user={auth}>
            <Head title="Create Requirement" />
            <div className='max-w-2x1 mx-auto p-4 sm:p-6 lg:p-8'>
                <form onSubmit={submit} className='w-full max-w-md mx-auto mt-8'>
                    <input
                        type="text"
                        value={data.key}
                        autoFocus
                        onChange={(e) => setData('key', e.target.value)}
                        placeholder='Clave'
                        className='shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.key} className='mt-3' />
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder='Nombre'
                        className='shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.name} className='mt-3' />
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder='Descripción'
                        className='h-[120px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.description} className='mb-3' />
                    <textarea
                        value={data.characteristics}
                        onChange={(e) => setData('characteristics', e.target.value)}
                        placeholder='Características'
                        className='h-[120px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.characteristics} className='mb-3' />
                    <textarea
                        value={data.relations}
                        onChange={(e) => setData('relations', e.target.value)}
                        placeholder='Relaciones'
                        className='h-[120px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.relations} className='mb-3' />
                    <textarea
                        value={data.responsability}
                        onChange={(e) => setData('responsability', e.target.value)}
                        placeholder='Responsabilidades'
                        className='h-[120px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.responsability} className='mb-3' />
                    <textarea
                        value={data.entry_activities}
                        onChange={(e) => setData('entry_activities', e.target.value)}
                        placeholder='Actividades de entrada'
                        className='h-[120px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.entry_activities} className='mb-3' />
                    <textarea
                        value={data.exit_activities}
                        onChange={(e) => setData('exit_activities', e.target.value)}
                        placeholder='Actividades de salida'
                        className='h-[120px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.exit_activities} className='mb-3' />
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