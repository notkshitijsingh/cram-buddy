import SlideShow from '../../components/SlideShow';
import slideData from '@/utils/api_response.json'; // slide JSON data

export default function SlidesPage() {
    return (
        <main>
            <h1>Slide Presentation</h1>
            <SlideShow slides={slideData.slides} />
        </main>
    );
}
