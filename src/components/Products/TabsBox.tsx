"use client";
import { Tabs, Tab } from "@heroui/react";
import { FaFileAlt } from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";
import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";

export default function TabsBox({ description_2 }: { description_2: any }) {
  console.log(description_2);
  return (
    <div className="flex w-full flex-col ">
      <Tabs
        disableAnimation
        radius="none"
        aria-label="Options"
        variant="light"
        className="w-full p-0 !-mb-1"
        classNames={{
          base: "bg-[#f8f8f8] !border-b !border-[#dfdfdf] ",
          tabList: "p-0 m-0",
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
            {parse(
              sanitizeHtml(description_2, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
                allowedAttributes: {
                  ...sanitizeHtml.defaults.allowedAttributes,
                  img: ["src", "alt", "width", "height", "class", "style"],
                },
              })
            )}
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
            tempora aspernatur perspiciatis nostrum? Voluptates perspiciatis
            vitae commodi laboriosam, consequuntur a sed nulla fugit fugiat
            rerum, modi deleniti nisi temporibus? Eligendi! Lorem, ipsum dolor
            sit amet consectetur adipisicing elit. Eligendi officia rem
            exercitationem natus, nihil harum nobis cumque! Eaque cumque porro
            commodi, laborum perspiciatis quod enim, ipsum iste assumenda
            aspernatur ab!
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
