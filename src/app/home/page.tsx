import { AppImage } from "@/components/ui/AppImage"
import { AppVideo } from "@/components/ui/AppVideo"
import axios from "axios"
import { cookies } from "next/headers"
import { FileType } from "../../../types"

const urlPath = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/videos`

const getAllAssetsData = async (): Promise<FileType[] | null> => {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ')

    const response = await axios.get(urlPath, {
      headers: {
        cookie: cookieHeader,
      },
    })

    const jsonData = response.data

    return jsonData.videos || []
  } catch (error) {
    console.error("Failed to get assets data", error)
    return null
  }
}

const HomePage = async () => {
  const data = await getAllAssetsData()

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {data?.map((item: FileType) => {
        const isVideo = item.fileURL?.endsWith(".mp4") || item.fileURL?.includes("video") || item.category === "video"

        return isVideo ? (
          <AppVideo key={item._id?.toString() || item.title} data={item} />
        ) : (
          <AppImage key={item._id?.toString() || item.title} data={item} />
        )
      })}
    </main>
  )
}

export default HomePage
