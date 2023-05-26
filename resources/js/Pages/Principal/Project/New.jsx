import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { useForm, Head } from '@inertiajs/react'
import React from 'react'

const New = ({auth}) => {
    const {data, setData, post, processing, reset, errors} = useForm({
        project_name: '',
        user_name: ''
    })
    const submit = (e) => {
        e.preventDefault()
        post(route('projects.store'),{onSuccess: ()=> reset()})
    }
    return (
        <Authenticated user={auth}>
            <Head title="Create Project" />
            <div className='max-w-2x1 mx-auto p-4 sm:p-6 lg:p-8'>
                <form onSubmit={submit} className='w-full max-w-md mx-auto mt-8'>
                    <textarea
                        value={data.project_name}
                        onChange={(e) => setData('project_name', e.target.value)}
                        placeholder='Nombre del proyecto'
                        autoFocus
                        className='h-[120px] mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.project_name} className='mb-3' />
                    <input
                        type="text"
                        value={data.user_name}
                        onChange={(e) => setData('user_name', e.target.value)}
                        placeholder='Responsable'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.user_name} className='mt-3' />
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