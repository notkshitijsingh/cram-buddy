import Image from 'next/image';
import bookwormImage from '/public/assets/bookworm.png';
import PdfUploader from '../components/PdfUploader';

export default function Home() {
  return (
    <main>
      <div className='header'>
        <Image 
          src={bookwormImage}
          alt='Cram Buddy'
          width={40} height={40}/>
        <span className='header-text'>Cram Buddy</span>
      </div>
      <div className='row-body'>
        <div className='homepage'>
          <span className='big-bold'>Less</span>
          <span className='small-sub'>time preparing,</span>
          <span className='big-bold'>More</span>
          <span className='small-sub'>time learning.</span>
        </div>
        <PdfUploader />
      </div>
    </main>
  );
}
