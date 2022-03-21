import { BackArrowIcon } from '../lib'
import { useRouter } from 'next/router'

const BackBtn = () => {
  const router = useRouter()

  return (
    <button
      className="flex items-center w-full max-w-lg p-3 m-3 mx-auto move-up z-[1] relative"
      onClick={() => router.back()}
    >
      <BackArrowIcon /> Go Back
    </button>
  )
}

export default BackBtn
