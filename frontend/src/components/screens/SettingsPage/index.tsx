'use client'
import { useMutation, useQuery } from "@tanstack/react-query";
import { CameraIcon, MailIcon, SquareAsteriskIcon, User, User2Icon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";


import { IUser } from "@/types/user.types";
import { fetcher } from "@/utils/fetcher";
import { Button, Field, Loader, UploadAsset } from "@/components/ui";

import classes from './index.module.scss'
import { IAssets } from "@/types/assets.types";

export default function SettingsPage() {
  const [isAssetsLoading, setIsAssetsLoading] = useState(false)
  const [isChangeState, setChangeState] = useState(false)
  const [uploadAsset, setUploadAsset] = useState<IAssets | null>(null)
  const { register, handleSubmit } = useForm();

  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => fetcher<IUser>(
      `users/me?populate[avatar]=*`,
      { method: 'GET', isAuth: true }),
  })

  const { mutate } = useMutation({
    mutationKey: ['me'],
    mutationFn: (formState: any) => {
      const body: IUser = { ...formState };

      if (uploadAsset) {
        body.avatar = [uploadAsset]
      }

      return fetcher('users/' + data?.id, {
        method: 'PUT',
        isAuth: true,
        body
      })
    },
    onSuccess: () => {
      toast.success('Данные успешно обновлены')
      setChangeState(false)
    }
  })

  return <div className={classes.settingsBlock}>
    <h1>Settings</h1>
    {
        isLoading ? <Loader /> : 
        <form onSubmit={handleSubmit(mutate)}>
          <div className={classes.mainInfo}>
            <div className={classes.mainInfo_avatar}>
              <div>
                {uploadAsset || data?.avatar.length ?
                  <Image
                    src={`${process.env.BACK_URL}${uploadAsset?.url || data?.avatar[0].url}`}
                    alt={data?.username || ''}
                    width='100'
                    height='100'
                  />
                : <User />}
                {isAssetsLoading && <Loader className={classes.mainInfo_avatar__loader} />}
                <UploadAsset show={isChangeState && !isAssetsLoading} setUploadAssets={(value) => setUploadAsset(value[0])} setIsLoading={setIsAssetsLoading}><CameraIcon/></UploadAsset>
              </div>
            </div>
            <div>
              <div>Username</div>
              <Field
                type="text"
                placeholder="Enter name"
                defaultValue={data?.username}
                Icon={UserIcon}
                disabled={!isChangeState}
                {...register("username", { required: true } )}
              />
            </div>
          </div>

          <div className={classes.additionalInfo}>
            {[
              {label: 'Email', name: 'email', Icon: MailIcon, required: true},
              {label: 'Position', name: 'position', Icon: User2Icon},
              {label: 'Password', name: 'password', Icon: SquareAsteriskIcon },
            ].map((field, key) => (
              <div key={key}>
                <div>{field.label}</div>
                <Field
                  type={field.name}
                  placeholder={`Enter ${field.name}`}
                  defaultValue={data ? data[field.name as keyof Omit<IUser, 'avatar' | 'friends'>] : ''}
                  Icon={field.Icon}
                  disabled={!isChangeState}
                  {...register(field.name, { required: field.required } )}
                />
              </div>
            ))}
          </div>

          <div className={classes.settings}></div>

          {isChangeState ?
            <Button type='submit' >Сохранить</Button> :
            <Button type='button' onClick={(e) => {
              e.preventDefault()
              setChangeState(true)
            }}>Изменить</Button>}
        </form>
    }
  </div>
}
  