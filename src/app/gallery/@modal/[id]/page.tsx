// app/gallery/@modal/[id]/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function ModalImage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[300px] text-center">
        <h2>Modal for image {params.id}</h2>
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-500 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
