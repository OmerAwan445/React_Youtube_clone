import { IconType } from 'react-icons';
import {MdOutlineSubscriptions,MdOutlineVideoLibrary,MdOutlineSportsVolleyball } from 'react-icons/md';
import {BsCameraReels,BsMusicNote} from 'react-icons/bs'
import {RiHistoryLine} from 'react-icons/ri'
import {AiOutlineClockCircle,AiOutlineTrophy} from 'react-icons/ai'
import {CgPlayList,CgHome} from 'react-icons/cg'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { GiFilmStrip } from "react-icons/gi";
export interface sideBarList {
    name: string,
    icon:IconType
  }

 export const subscriptionLinks:sideBarList[] = [
    {
      icon: TbMusic,
      name: "Music",
    },
    {
      icon: MdOutlineSportsVolleyball ,
      name: "Sport",
    },
    {
      icon: TbDeviceGamepad2 ,
      name: "Gaming",
    },
    {
      icon: GiFilmStrip ,
      name: "Films",
    },
  ];

export const sideBarMainList:sideBarList[] = [{
    name:'Home',
    icon:CgHome,
  }
  ,{
    name:"Shorts",
    icon:BsCameraReels
  }
  ,{
    name:"Subscriptions",
    icon:MdOutlineSubscriptions
  }];

 export const sideBarSubList:sideBarList[]=[{
    name:'Library',
    icon:MdOutlineVideoLibrary,
 }
,{
    name:'History',
    icon:RiHistoryLine,
}
,{
    name:'Watch Latar',
    icon:AiOutlineClockCircle,
}
,{
    name:'PlayLists',
    icon:CgPlayList,
}
];
 export const sideBarExploreList:sideBarList[]=[{
    name:'Trending',
    icon:HiFire,
 }
,{
    name:'Music',
    icon:BsMusicNote,
}
,{
    name:'Gaming',
    icon:SiYoutubegaming,
}
,{
    name:'Sports',
    icon:AiOutlineTrophy,
}
];

export const sidebarFooterList1=["About","Press","CopyRight","Contact us","Creator","Advertise","Developer","Term","Piracy","Policy & Safety"];

