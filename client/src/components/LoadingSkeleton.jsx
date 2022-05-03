import React from 'react';

const LoadingSkeleton = () => {
  const Message = ({ dir }) => {
    return (
      <div dir={dir} className="flex gap-2 w-full">
        <div className="avatar">
          <div className="bg-gradient-to-r w-10 h-10 animate-load bg-600 from-zinc-800 via-zinc-700 to-zinc-800  rounded-full mr-2"></div>
        </div>

        <div className="space-y-1 max-w-md w-full">
          <p className="bg-gradient-to-r text-md text-primary animate-load bg-600 from-zinc-800 via-zinc-700 to-zinc-800 mb-2 h-5 w-24 rounded"></p>
          <div className="max-w-fit">
            <div className="bg-gradient-to-r animate-load bg-600 from-zinc-800 via-zinc-700 to-zinc-800 w-80 max-w-xs h-24 px-3 py-2 rounded-md "></div>
            <p
              dir="ltr"
              className=" bg-gradient-to-r rounded animate-load bg-600 from-zinc-800 via-zinc-700 to-zinc-800 w-14 h-5 mt-2 text-right"
            ></p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full mt-8 grid grid-cols-1  lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-2 order-2 lg:order-1">
        <div className="flex relative flex-col gap-4  w-full h-[35rem] rounded-md p-4">
          <div className="mb-16 p-3  rounded bg-zinc-900 mr-2 space-y-4 h-full ">
            <div className="bg-gradient-to-r text-md text-primary animate-load bg-600 from-zinc-800 via-zinc-700 to-zinc-800 mb-2 h-5 w-24 rounded"></div>
            <div className="bg-gradient-to-r text-md text-primary animate-load bg-600 from-zinc-800 via-zinc-700 to-zinc-800 mb-2 h-14 w-full rounded"></div>
            <div className="bg-gradient-to-r text-md text-primary animate-load bg-600 from-zinc-800 via-zinc-700 to-zinc-800 mb-2 h-14 w-full rounded"></div>
            <div className="bg-gradient-to-r text-md text-primary animate-load bg-600 from-zinc-800 via-zinc-700 to-zinc-800 mb-2 h-14 w-full rounded"></div>
            <div className="bg-gradient-to-r text-md text-primary animate-load bg-600 from-zinc-800 via-zinc-700 to-zinc-800 mb-2 h-14 w-4/5 rounded"></div>
            <div className="bg-gradient-to-r text-md text-primary animate-load bg-600 from-zinc-800 via-zinc-700 to-zinc-800 mb-2 h-14 w-1/3 rounded"></div>
          </div>
        </div>
      </div>
      <div className=" col-span-1 lg:col-span-4 order-1 lg:order-2">
        <div className="flex relative flex-col gap-4  w-full h-[35rem] rounded-md p-4">
          <div className="mb-16 p-3  rounded bg-zinc-900 space-y-4 ">
            <Message dir={'ltr'} />
            <Message dir={'ltr'} />
            <Message dir={'rtl'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
