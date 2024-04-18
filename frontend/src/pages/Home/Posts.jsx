import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Avatar, Card, Image } from "antd";
const { Meta } = Card;

const Posts = () => {
  return (
    <Card
      title={
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
          }
          title="Tohidujjaman Hoque"
        />
      }
    >
      <div className="flex flex-col gap-y-3">
        <div>
          Ant Design Charts Ant Design Pro Ant Design Pro Components Ant Design
          Mobile Ant Design Mini Ant Design Landing-Landing Templates
          Scaffolds-Scaffold Market Umi-React Application Framework
          dumi-Component doc generator qiankun-Micro-Frontends Framework
          ahooks-React Hooks Library Ant Motion-Motion Solution China Mirror 🇨🇳
          Community Awesome Ant Design Medium Twitter yuqueAnt Design in YuQue
          Ant Design in Zhihu Experience Cloud Blog seeconfSEE Conf-Experience
          Tech Conference Help GitHub Change Log FAQ Bug Report Issues
          Discussions StackOverflow SegmentFault Ant XTechMore Products
          yuqueYuQue-Document Collaboration Platform AntVAntV-Data Visualization
          EggEgg-Enterprise Node.js Framework kitchenKitchen-Sketch Toolkit
          GalaceanGalacean-Interactive Graphics Solution xtechAnt Financial
          Experience Tech Theme Editor
        </div>
        <Image
          // width={"full"}
          // height={400}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <div className="w-full flex justify-around py-1 mt-4">
          <div className="text-xl">
            <AiFillLike className="text-primary" />
          </div>
          <div className="text-xl">
            <AiFillLike />
          </div>
          <div className="text-xl">
            <AiFillLike />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Posts;
