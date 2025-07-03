import Image from "next/image";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";

function Card({ product }: { product: any }) {
  const discountPercent =
    ((product.originalPrice - product.currentPrice) / product.originalPrice) *
    100;
  return (
    <Link
      href={`/product/${product.name}`}
      key={product.id}
      title={product.name}
      className="bg-white shadow rounded-lg p-5 hover:shadow-lg transition-shadow group/card"
    >
      <div className="relative">
        <Image
          width={500}
          height={500}
          src={product.cover_image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-t-lg"
          loading="lazy"
          draggable="false"
          priority={false}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />
        {product.isAmazing && (
          <span className="absolute top-2 left-2 bg-red-500 px-2 py-1  rounded-sm text-white text-sm">
            {Math.round(discountPercent)}% جشنواره
          </span>
        )}
      </div>
      <h3 className="font-semibold mt-2 mb-10 text-zinc-700 line-clamp-2">
        {product.name}
      </h3>
      <div className="flex w-full justify-between items-center">
        <button className="group-hover/card:bg-red-500 group-hover/card:text-white text-zinc-400 rounded-full p-2.5 mt-1 hover:bg-red-600 flex items-center gap-2 transition-colors duration-300 ease-in-outoverflow-hidden">
          <BsCart3 className="w-5 h-5" />
          <p className="text-xs font-semibold whitespace-nowrap max-w-0 opacity-0 group-hover/card:max-w-[120px] group-hover/card:opacity-100 transition-[max-width,opacity] duration-300 ease-in-outoverflow-hidden">
            افزودن به سبد خرید
          </p>
        </button>

        <div className="flex flex-col items-end">
          <p>
            <span className="rounded-full text-sm bg-red-500 text-white px-2 py-1">
              {Math.round(discountPercent).toLocaleString("fa-IR")}%
            </span>
            <span>
              <span className="line-through text-zinc-500 ml-2">
                {product.currentPrice.toLocaleString("fa-IR")}
              </span>
            </span>
          </p>
          <p className="font-bold mt-2">
            <span className="text-xl">
              {product.originalPrice.toLocaleString("fa-IR")}
            </span>{" "}
            <span className="text-sm">تومان</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
