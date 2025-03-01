import ChapterSelect from "@/components/ChapterSelect"
import chapterData from '@/utils/api_response.json'; // chapter JSON data


export default function ChapterPage() {
  return(
    <main>
        <h1>Chapters</h1>
        <ChapterSelect chapters={chapterData.chapter_list}/>
    </main>
  )
}