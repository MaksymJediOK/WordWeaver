import React from 'react'
import { useForm } from 'react-hook-form'

type WordInputType= {
  input: string
}

const WordInput = () => {
  const {register, handleSubmit} = useForm<WordInputType>({
    defaultValues: {
      input: ''
    },
  })

  const onSubmit = (data : WordInputType) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ml-4">
      <input {...register("input", { required: true })} />
      <button type='submit'> Press me</button>
    </form>
  )
}

export default WordInput
