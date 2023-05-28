import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { useForm, Head } from '@inertiajs/react'
import React, { useState } from 'react'

const New = ({auth, project}) => {
    const [isChecked, setIsChecked] = useState(false);
    const {data, setData, post, processing, reset, errors} = useForm({
        key: '',
        description: '',
        is_functional: '',
        project_id: project
    })
    const vbool = (e) => {
        if (e) {
            setIsChecked(true);
            setData('is_functional', 1)
        }else{
            setIsChecked(false);
            setData('is_functional', 0)
        }
    }
    const submit = (e) => {
        e.preventDefault()
        post(route('requirements_store'),{onSuccess: ()=> reset()})
    }
    return (
        <Authenticated user={auth}>
            <Head title="Create Requirement" />
            <div className='max-w-2x1 mx-auto p-4 sm:p-6 lg:p-8'>
                <form onSubmit={submit} className='w-full max-w-md mx-auto mt-8'>
                    <label>Clave:</label>
                    <input
                        type="text"
                        value={data.key}
                        autoFocus
                        onChange={(e) => setData('key', e.target.value)}
                        placeholder='Clave del actor'
                        className='shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.key} className='mt-3' />
                    <label>Descripción:</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder='Descripción'
                        className='h-[120px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <InputError message={errors.description} className='mb-3' />
                    <input
                        type="checkbox"
                        onChange={() => vbool(!isChecked)}
                        className='rounded-md shadow-sm border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    /> Requerimiento funcional
                    <br />
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