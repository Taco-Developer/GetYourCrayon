import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-after-noon h-screen w-screen">
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <Image src="/images/loopy.jpg" alt="no_img" width={500} height={500} />
        <div>나는 행복합니다</div>
        <div>203 화이팅</div>
      </div>
    </main>
  );
}
