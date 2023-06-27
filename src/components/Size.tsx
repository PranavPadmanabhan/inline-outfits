import { type } from 'os'

type props = {
    size : string;
    isActive?:boolean;
    onClick?:() => void
}


function Size({size,isActive,onClick}:props) {
  return (
    <div onClick={onClick} className='h-[100%] w-[25%] flex items-center  justify-between cursor-pointer'>
        <div className={`h-[35px] w-[35px] rounded-full ${isActive?'border-[2px] border-[#0d0f8b] text-[#0d0f8b]':'border-[1px] border-[#D9D9D9] text-black'} flex items-center justify-center text-[10px] `}>
            {size}
        </div>
    </div>
  )
}

export default Size