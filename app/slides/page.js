import SlideShow from '../../components/SlideShow';
import slideData from '../../utils/slideData.json'; // slide JSON data

export default function SlidesPage() {
    return (
        <main>
            <h1>Slide Presentation</h1>
            <SlideShow slides={slideData} />
        </main>
    );
}
