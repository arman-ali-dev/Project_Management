import { Button, IconButton } from "@mui/material";
import React from "react";
import mailIcon from "../../assets/mail.png";
import lockIcon from "../../assets/lock.png";
import viewIcon from "../../assets/view.png";

const Signin = () =>
{
    return (
        <>
            <div className="flex justify-center">
                <form className="w-100 pt-30">
                    <div className="text-center">
                        <h3 className="text-[#272626] text-[18px] font-semibold">
                            Sign In Your Account
                        </h3>
                        <p className="text-[#727272] text-[14px] ">
                            Please enter your details to get started
                        </p>
                    </div>

                    <div className="mt-8">
                        <label className="text-[13px] font-medium text-[#363636]">Email Address*</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="name@gmail.com"
                                className="border-[#B7B7B7] outline-0 w-full mt-0.5 border text-[14px]  pr-4 pl-8.5 py-2 rounded-md"
                            />

                            <img
                                src={ mailIcon }
                                className="w-4 h-4 opacity-50 absolute top-1/2 -translate-y-1/2 left-3"
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="mt-3">
                        <label className="text-[13px] font-medium  text-[#363636]">Password*</label>
                        <div className="relative">
                            <input
                                placeholder="• • • • • • •"
                                type="text"
                                className="border-[#B7B7B7] placeholder:text-[18px] pr-4 pl-8.5 w-full outline-0  mt-0.5 border text-[14px]  px-4 py-2 rounded-md"
                            />

                            <img
                                src={ lockIcon }
                                className="w-4 h-4 opacity-50 absolute top-1/2 -translate-y-1/2 left-3"
                                alt=""
                            />

                            <div className="absolute top-1/2 -translate-y-1/2 right-3">
                                <IconButton>
                                    <img
                                        src={ viewIcon }
                                        className="w-4.5 h-4.5 opacity-50 "
                                        alt=""
                                    />
                                </IconButton>
                            </div>
                        </div>
                    </div>

                    <div className="mt-7">
                        <Button
                            fullWidth
                            sx={ {
                                textTransform: "capitalize",
                                backgroundColor: "#000",
                                border: "1px solid #000",
                                color: "#fff",
                                paddingX: "30px",
                                fontSize: "13px",
                                borderRadius: "4px",
                            } }
                        >
                            <span>Sign In</span>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signin;
