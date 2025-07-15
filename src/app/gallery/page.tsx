// app/gallery/page.tsx
'use client';

import Link from 'next/link';

const images = [
  { id: '1', src: '/img1.jpg' },
  { id: '2', src: '/img2.jpg' },
];

export default function GalleryPage() {
  return (
    <div>
      <h1>Gallery</h1>
      <div className="grid grid-cols-2 gap-4">
        {images.map((img) => (
          <Link key={img.id} href={`/gallery/${img.id}`}>
            <img src={img.src} alt={`Image ${img.id}`} />
          </Link>
        ))}
      </div>
    </div>
  );
}
