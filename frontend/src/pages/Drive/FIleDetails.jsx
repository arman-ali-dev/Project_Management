import React from "react";
import docIcon from "../../assets/doc.png";
import viewIcon from "../../assets/view.png";
import editIcon from "../../assets/edit.png";
import shareIcon from "../../assets/share.png";

const FileDetails = () =>
{
    return (
        <div className="bg-white shadow mt-4 rounded-lg px-5 py-4">
            <h3 className="text-[14px] font-semibold border-b pb-2 border-[rgba(0,0,0,.3)]">
                File Details
            </h3>

            <div className="w-full mt-4 ">
                <div className="bg-[rgba(150,150,150,.1)] py-6 w-full border rounded-[18px] flex justify-center items-center border-[rgba(200,200,200,.5)]">
                    <div className="text-center">
                        <img
                            src={ docIcon }
                            alt="Document Icon"
                            className="w-13 h-13 mx-auto"
                        />

                        <p className="text-[#09c015e6] text-[12px] mt-1.5  font-medium">
                            Editor
                        </p>

                        <h3 className="text-[13px] -mt-0.5 font-medium">filename.txt</h3>

                        <p className="text-[13px]">Modified: 2026/4/12</p>
                    </div>
                </div>
            </div>

            <h3 className="text-[14px] mt-5 font-semibold border-b pb-2 border-[rgba(0,0,0,.3)]">
                File Overview
            </h3>

            <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-[13px]  text-[#212121] font-medium">
                    <div className="flex items-center gap-1.5">
                        <img
                            src={ viewIcon }
                            alt="View Icon"
                            className="w-4.5 mt-0.5 h-4.5 inline "
                        />
                        <p>Views</p>
                    </div>

                    <p>198</p>
                </div>

                <div className="flex justify-between text-[13px]  text-[#212121] font-medium">
                    <div className="flex items-center gap-1.5">
                        <img
                            src={ editIcon }
                            alt="Edit Icon"
                            className="w-4.5 mt-0.5 h-4.5 inline "
                        />
                        <p>Edits</p>
                    </div>

                    <p>92</p>
                </div>

                <div className="flex justify-between text-[13px]  text-[#212121] font-medium">
                    <div className="flex items-center gap-1.5">
                        <img
                            src={ shareIcon }
                            alt="Share Icon"
                            className="w-4.5 mt-0.5 h-4.5 inline "
                        />
                        <p>Shares</p>
                    </div>

                    <p>87</p>
                </div>
            </div>
        </div>
    );
};

export default FileDetails;
