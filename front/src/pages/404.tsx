import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-start font-[SUIT]">
      <div className="font-[ErrFont] text-9xl">ERROR 404</div>
      <div className="text-4xl">
        존재하지 않거나 잘못된 페이지에 접근하셨습니다.
      </div>
      <Link href={'/'} className="text-2xl underline text-custom-gray">
        메인페이지로 이동하기
      </Link>
    </div>
  );
}
