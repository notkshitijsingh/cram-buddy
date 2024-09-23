import Image from 'next/image';
import bookwormImage from '/public/assets/bookworm.png';
import PdfUploader from '../components/PdfUploader';

export default function Home() {
  return (
    <main>
      <Image 
        src={bookwormImage}
        alt='Cram Buddy'
        width={150} height={150}/>
      <h1>Welcome to Cram Buddy!</h1>
      <PdfUploader />
    </main>
  );
}
