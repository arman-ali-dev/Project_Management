import React from "react";

const DateAndTask = () =>
{
    return (
        <>
            <div className="border-[rgba(200,200,200,0.8)] w-[16%] border  rounded-lg px-5 py-4">
                <h2 className="text-[20px] font-semibold text-[#969696]">26</h2>

                <p className="text-[15px] mt-3 font-semibold text-[#969696]">
                    0 tasks
                </p>
            </div>

            <div className="border-[rgba(200,200,200,0.8)] w-[16%] border bg-[rgba(217,217,217,0.1)]  rounded-lg px-5 py-4">
                <h2 className="text-[20px] font-semibold text-black">26</h2>

                <p className="text-[15px] mt-3 font-semibold text-[#2D69FF]">
                    1 tasks
                </p>
            </div>

        </>
    )
}

export default DateAndTask;