
const images = [
  {
    id: 1,
    src: "/slider/1.webp",
    alt: "عکس ۱",
    link: "",
  },
  {
    id: 2,
    src: "/slider/2.webp",
    alt: "عکس ۲",
    link: "",
  },
  {
    id: 3,
    src: "/slider/3.webp",
    alt: "عکس ۳",
    link: "",
  },
  {
    id: 4,
    src: "/slider/4.webp",
    alt: "عکس ۴",
    link: "",
  },
];
import HomeSlider from "@/components/HomeSlider";

function HomeHeroSection() {
  return (
    <header className="flex flex-col md:flex-row gap-4 w-full h-full py-4 lg:max-h-[500px] overflow-hidden">
      <HomeSlider images={images} />

      {/* <div className="flex flex-col space-y-4 w-full h-full md:w-1/3">
        <Link href="/some-page">
          <Image
            src="/dep.jpg"
            alt="تصویر بزرگ اول"
            width={200}
            height={200}
            priority
            className="object-cover w-full h-full rounded-2xl"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </Link>

        <Link href="/some-page">
          <Image
            src="/dep2.webp"
            alt="تصویر بزرگ دوم"
            width={200}
            height={200}
            priority
            className="object-cover w-full h-full rounded-2xl"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </Link>
      </div> */}
    </header>
  );
}

export default HomeHeroSection;
