import React from "react";

const StatsCard = ( { icon, iconBg, statusIcon, label, num } ) =>
{
    return (
        <>
            <div className="rounded-2xl shadow px-6 py-5 bg-white">
                <div
                    style={ { backgroundColor: iconBg } }
                    className="bg-[#8127FF] rounded-full h-11 w-11 flex justify-center items-center"
                >
                    <img src={ icon } className="w-5.5 h-5.5" alt="" />
                </div>

                <p className="opacity-75 text-[14px] font-medium mt-3">{ label }</p>

                <div className="mt-2 flex justify-between items-center">
                    <p className="opacity-85 text-[27px] font-semibold">{ num }</p>

                    <span className="bg-[rgba(1,255,18,.2)] flex gap-1 items-center py-0.5 px-3 rounded-full text-[#1C8F24] text-[11px] font-medium">
                        <img src={ statusIcon } className="w-3 h-3" alt="" />
                        32.54%
                    </span>
                </div>
            </div>
        </>
    );
};

export default StatsCard;
