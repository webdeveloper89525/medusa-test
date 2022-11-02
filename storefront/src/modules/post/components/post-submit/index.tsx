import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { medusaClient, MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Spinner from "@modules/common/icons/spinner"
import axios from "axios";
import { useMutation } from 'react-query';

type FormValues = {
  name: string
}

type CreatePostProps = {
  onCreated: () => void
}

const createPostOne = async (data: FormValues) => {
  const { data: response } = await axios.post(`${MEDUSA_BACKEND_URL}/store/post`, data);
  return response.data;
};

const CreatePost: React.FC<CreatePostProps> = ({onCreated}) => {
  const [error, setError] = useState<string | undefined>(undefined)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const resetForm = () => {
    reset({
      name: ""
    })
  }
  const handleCancel = () => {
    resetForm()
  }

  const { mutate, isLoading } = useMutation(createPostOne, {
    onSuccess: data => {
      resetForm()
      console.log(data);
      reset({
        name: ""
      })
      onCreated()
      setError(undefined)
    },
    onError: () => {
      setError("Failed to add post, please try again.")
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    }
  });

  const submit = handleSubmit(async (data: FormValues) => {
    setError(undefined)

    const payload = {
      name: data.name,
    }

    // calling 
    mutate(payload)
  })

  return (
    <div className="flex flex-col w-full gap-y-4 px-8 py-4">
      <span className="text-base-semi">Create Post</span>
      <div className="grid grid-cols-1 gap-y-2">
        <Input
          label="Post name"
          {...register("name", {
            required: "Post name is required",
          })}
          required
          errors={errors}
          autoComplete="post-name"
          />
      </div>
      {error && (
        <div className="text-rose-500 text-small-regular py-2">{error}</div>
      )}

      <div className="grid grid-cols-1 gap-y-2">
        <div className="flex flex-row gap-x-3">
          <Button
            className="!bg-gray-200 !text-gray-900 !border-gray-200 min-h-0"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button className="min-h-0" onClick={submit} disabled={isLoading}>
            Save
            {isLoading && <Spinner />}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
