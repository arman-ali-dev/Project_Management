import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import profilePic from "../../assets/profile.jpg";
import editIcon from "../../assets/edit2.png";

const Profile = () =>
{
    return (
        <div className=" mt-4 mx-8 relative">
            <div className="bg-white h-[85vh] shadow rounded-lg px-10 py-10">
                <div className="flex gap-4 items-center ">
                    <div className="relative ">
                        <Avatar
                            src={ profilePic }
                            alt="User Profile"
                            sx={ {
                                width: 110,
                                height: 110,
                                cursor: "pointer",
                                objectFit: "cover",
                            } }
                        />

                        <div className="absolute -bottom-0.5 right-3">
                            <IconButton
                                sx={ {
                                    backgroundColor: "#000",
                                    "&:hover": {
                                        backgroundColor: "#000",
                                    },
                                } }
                            >
                                <img className="w-3 h-3" src={ editIcon } alt="" />
                            </IconButton>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[17px] font-medium">Armaan Ali</h3>
                        <p className="font-medium text-[#222222] text-[14px]">
                            Software Developer
                        </p>
                    </div>
                </div>

                <form className="mt-10">
                    <div className="flex gap-5 ">
                        <div className="flex-1">
                            <label className="text-[13px] font-medium">Full Name</label>
                            <input
                                type="text"
                                value="Armaan Ali"
                                className="bg-[#EFEFEF] outline-0 mt-0.5 w-full text-[14px] py-2 px-4 rounded-lg"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="text-[13px] font-medium">Email</label>
                            <input
                                type="text"
                                value="arman.ali.ahit@gmail.com"
                                className="bg-[#EFEFEF] w-full text-[14px] py-2 px-4 mt-0.5 outline-0  rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <label className="text-[13px] font-medium">Designation</label>
                        <input
                            type="text"
                            value="Software Developer"
                            className="bg-[#EFEFEF] outline-0 mt-0.5 w-full text-[14px] py-2 px-4 rounded-lg"
                        />
                    </div>

                    <div className="flex gap-2 mt-16 justify-end">
                        <Button
                            sx={ {
                                textTransform: "capitalize",
                                border: "1px solid #BCBCBC",
                                color: "#000",
                                paddingX: "30px",
                                fontSize: "13px",
                                borderRadius: "8px",
                            } }
                        >
                            <span className="font-medium">Discard Changes</span>
                        </Button>

                        <Button
                            sx={ {
                                textTransform: "capitalize",
                                backgroundColor: "#000",
                                border: "1px solid #000",
                                color: "#fff",
                                paddingX: "30px",
                                fontSize: "13px",
                                borderRadius: "8px",
                            } }
                        >
                            <span>Save Changes</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
