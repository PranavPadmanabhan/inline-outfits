import Header from '@/components/Header'
import { useStorageUpload } from '@thirdweb-dev/react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'

const AdminPage = () => {

    const [file, setFile] = useState<any[]>([])

    const { mutateAsync: upload, isLoading, isSuccess } = useStorageUpload();

    const uploadFile = async () => {
        if (file.length > 0) {
          const uploadedData = await upload({
            data: file,
            options: {
              uploadWithGatewayUrl: true,
              uploadWithoutDirectory: false,
            },
          });
        } else {
          alert("Select one file");
        }
      };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-start'>
        <Header />
        <input type="file" name="" id="" multiple onChange={e => {
            if(!e.target.files) return
            setFile(Object.values(e.target.files))
        }} />

        <button onClick={uploadFile} className="w-[160px] h-[40px] bg-black text-white mt-3 rounded-md ">Upload</button>
    </div>
  )
}

export default dynamic(() => Promise.resolve(AdminPage),{ssr:false})