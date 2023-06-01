import React from 'react';
const DummyHomePageVideoCard = () => {

  return (
    <div className="flex animate-pulse flex-col">
      {/* <!-- ThumbNail --> */}
      <div className="h-44 rounded-lg bg-zinc-600"></div>
      {/* <!-- Below ThumbNail --> */}
      <div className="flex py-3">
        <div className="h-9 w-10 rounded-full bg-zinc-600"></div>
        <div className="w-full">
          <div className="ml-2 mb-2 h-5 w-5/6 rounded-sm bg-zinc-600"></div>
          <div className="ml-2 h-5 w-2/3 rounded-sm bg-zinc-600"></div>
        </div>
      </div>
    </div>
  )
}

export default DummyHomePageVideoCard;