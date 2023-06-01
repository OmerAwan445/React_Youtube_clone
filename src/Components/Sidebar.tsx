import React from 'react';
import { sideBarMainList, sideBarSubList, sideBarExploreList, sidebarFooterList1, sideBarList, subscriptionLinks } from '../utils/sidebarIcons';

const Sidebar = () => {
  return (
    <div style={{ height: "92.5vh" }} className='sidebar w-1/6 overflow-hidden hover:overflow-y-auto fixed left-0 bottom-0'>
      <ul className='border-b border-zinc-600 mx-2 py-1'>
        {sideBarMainList.map((item: sideBarList) => (
          <li key={item.name} className={`rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-zinc-800 ${item.name === "Home" ? "bg-zinc-800" : ""}`}  >
            <item.icon className='text-xl' />
            <span className='truncate'>{item.name}</span>
          </li>
        ))}
      </ul>
      <ul className='border-b border-zinc-600 mx-2 py-1 mb-2'>
        {sideBarSubList.map((item: sideBarList) => (
          <li key={item.name} className="rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-zinc-800 " >
            <item.icon className='text-xl' />
            <span className='truncate'>{item.name}</span>
          </li>
        ))}
      </ul>
      <ul className='border-b border-zinc-600 mx-2 py-1 mb-2'>
        {subscriptionLinks.map((item: sideBarList) => (
          <li key={item.name} className="rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-zinc-800 " >
            <item.icon className='text-xl' />
            <span className='truncate'>{item.name}</span>
          </li>
        ))}
      </ul>
      <ul className='border-b border-zinc-600 mx-2 py-1'>
        {sideBarExploreList.map((item: sideBarList) => (
          <li key={item.name} className="rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-zinc-800 " >
            <item.icon className='text-2xl' />
            <span className='truncate'>{item.name}</span>
          </li>
        ))}
      </ul>

      <ul className='flex flex-wrap p-2 pr-3'>
        {sidebarFooterList1.map((item) => {
          return (
            <li key={item} className='p-0.5 text-sm cursor-pointer text-zinc-600 hover:text-zinc-300'>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;



