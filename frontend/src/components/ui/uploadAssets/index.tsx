'use client'
import { ChangeEventHandler, PropsWithChildren } from "react";
import clsx from "clsx";

import { IAssets } from "@/types/assets.types";

import classes from './index.module.css'

type TUploadAssetProps = {
  show: boolean;
  setUploadAssets: (value: IAssets[]) => void;
  classNames?: string;
  accept?: HTMLInputElement['accept'];
  setIsLoading: (value: boolean) => void;
}

export default function UploadAsset({ show, setUploadAssets, classNames, children, accept, setIsLoading }: PropsWithChildren<TUploadAssetProps>) {
  const addAssetToAvatar: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files && e.target.files?.length) {
      setIsLoading(true);
      const files = [] as File[]
      for (let i = 0; i < e.target.files.length; ++i) {
        files.push(e.target.files[i]);
      }

      const response = await Promise.allSettled<IAssets[]>(files.map(file => {
        const formData = new FormData();
        formData.append('files', file, file.name)
        formData.append('fileInfo', JSON.stringify({ name: file.name, folder: null }))

        return fetch(process.env.API_URL + '/upload', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: formData
        }).then(res => res.json())
      }));

      setUploadAssets(response.reduce((array, value) => {
        if (value.status === 'fulfilled') {
          array.push({...value.value[0], accept })
        }
        return array
      }, [] as IAssets[]))

      setIsLoading(false)
    }
  }

  return show && <label className={clsx(classes.mainInfo_avatar__set, classNames)}>
        {children}
        <input type='file' hidden onChange={addAssetToAvatar} accept={accept} multiple />
    </label>
}
  