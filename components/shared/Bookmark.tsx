import Image from "next/image"

const Bookmark = ({isBookmarked}:{isBookmarked:boolean}) => {
  return (
    <button className="h-[32px] w-[32px] rounded-full bg-d-blue/40 absolute top-4 right-5 flex-center hover:bg-transparent">
    <Image
      src={`${isBookmarked ? '/assets/icon-bookmark-full.svg' : '/assets/icon-bookmark-empty.svg'}`}
      alt={'bookmark icon'}
      className=" dark:invert-0 "
      width={12}
      height={12}
    />
  </button>
  )
}

export default Bookmark