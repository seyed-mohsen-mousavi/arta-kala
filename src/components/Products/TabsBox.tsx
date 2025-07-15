"use client";
import { Tabs, Tab } from "@heroui/react";
import { FaFileAlt } from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";
import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import Image from "next/image";
import type { DOMNode, Element } from "html-react-parser";
import { LiaCommentSolid } from "react-icons/lia";
import { useUser } from "@/context/UserContext";
import { useAuthModal } from "@/context/AuthModalProvider";

export default function TabsBox({ description_2 }: { description_2: string }) {
  const sanitizedHtml = sanitizeHtml(description_2, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "class", "style"],
      a: ["href", "name", "target", "class"],
    },
    transformTags: {
      a: (tagName, attribs) => {
        return {
          tagName: "a",
          attribs: {
            ...attribs,
            class:
              (attribs.class || "") +
              " text-cyan-400 spoiler-link relative no-underline",
          },
        };
      },
    },
  });

  const transform = (node: DOMNode) => {
    if (node.type === "tag" && node.name === "img") {
      const { src, alt, width, height } = (node as Element).attribs;

      if (!src) return null;

      const fullSrc = src.startsWith("http")
        ? src
        : `https://mpttools.co${src}`;

      const widthNum = width ? parseInt(width) : 600;
      const heightNum = height ? parseInt(height) : 400;

      return (
        <Image
          src={fullSrc}
          alt={alt || ""}
          width={widthNum}
          height={heightNum}
          className="max-w-[500px] max-h-80 object-contain mx-auto"
        />
      );
    }
  };

  return (
    <div className="flex w-full flex-col ">
      <Tabs
        disableAnimation
        radius="none"
        aria-label="Options"
        variant="light"
        className="w-full p-0 "
        classNames={{
          base: "bg-[#f8f8f8] !border-b !border-[#dfdfdf] ",
          tabList: "p-0 m-0 !-mb-1",
          tab: "h-full w-full px-6 py-4 text-gray-600 data-[selected=true]:bg-white  data-[selected=true]:text-zinc-500 text-zinc-500",
        }}
      >
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <FaFileAlt className="size-7 !text-zinc-500" />
              <i className="fad fa-comments-alt"></i>

              <span className="text-zinc-500 text-base">توضیات کالا</span>
            </div>
          }
          className="w-full h-full"
        >
          <div className="prose p-5 w-full max-w-full">
            <div>{parse(sanitizedHtml, { replace: transform })}</div>
          </div>
        </Tab>
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <HiChatAlt2 className="size-7 !text-zinc-500" />
              <span className="text-zinc-500 text-base">نقد و نظرات</span>
            </div>
          }
        >
          <div className="p-5">
            <Comments />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

function Comments() {
  const { user } = useUser();
  const { onOpen } = useAuthModal();

  const handleAddComment = () => {
    if (!user) {
      onOpen();
    } else {
      console.log("نمایش فرم ثبت نظر");
    }
  };

  return (
    <div className="w-full h-full divide-y-1 divide-zinc-200">
      <div className="w-full flex flex-col items-start gap-5 pb-5">
        <p className="text-base font-bold">
          شما هم می‌توانید در مورد این کالا نظر بدهید.
        </p>
        <p>
          برای ثبت نظر، لازم است ابتدا وارد حساب کاربری خود شوید. اگر این محصول
          را قبلا از ابزارمارکت خریده باشید، نظر شما به عنوان مالک محصول ثبت
          خواهد شد.
        </p>
        <button
          onClick={handleAddComment}
          className="bg-primary hover:bg-[#3d464d] text-black hover:text-white px-4 py-3 rounded-xs flex items-center gap-3 transition-colors ease-in-out"
        >
          <LiaCommentSolid className="size-6" />
          افزودن نظر جدید
        </button>
      </div>

      <div className="w-full pt-5">
        <p className="text-black font-semibold text-sm mb-2">
          نظرات کاربران به این محصول | 0 نظر
        </p>
      </div>
    </div>
  );
}
