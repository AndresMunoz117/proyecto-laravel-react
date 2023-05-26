import Dropdown from '@/Components/Dropdown'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'

const Requirement = ({requirement}) => {
    const [editing, setEditing] = useState(false)
    const {data, setData, post, processing, reset, errors} = useForm({
        key: requirement.key,
        description: requirement.description,
        is_functional: requirement.is_functional,
        project_id: requirement.project_id
    })
    const submit = (e) => {
        e.preventDefault()
        post(route('requirements_update', requirement.id),{onSuccess: ()=> setEditing(false)})
    }
    return (
        <tr className="border-b dark:border-neutral-500">
            {editing
                ? <td colSpan="4" className='pb-3'>
                    <form onSubmit={submit}>
                        <input
                            type="text"
                            value={data.key}
                            autoFocus
                            onChange={(e) => setData('key', e.target.value)}
                            className='mt-4 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                        />
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className='mt-2 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                        />
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
                </td>
                : (
                    <>
                    <td className="whitespace-nowrap px-4 py-2">
                        {requirement.key}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                        <pre style={{overflow: 'hidden', maxWidth: '500px'}}>
                            {requirement.description}
                        </pre>
                    </td>
                    <td></td>
                    <td>
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
                                href={route('requirements_destroy', requirement.id)}
                                method='delete'
                            >
                                Eliminar
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
            </td>
                    </>
                )
            }
        </tr>
    )
}

export default Requirement