import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import plusIcon from "../../assets/plus.png";
import { Select, MenuItem, Button } from "@mui/material";
import profilePic from "../../assets/profile.jpg";
import removeIcon from "../../assets/remove.png";
import uploadIcon from "../../assets/upload.png";

export default function CreateNewTaskForm ( { toggleDrawer, open } )
{
    const form = () => (
        <Box sx={ { width: 750 } } className="overflow-y-scroll" role="presentation">
            <div className="px-8 py-10">
                <h2 className="font-semibold ">Create New Task</h2>

                <form className="mt-5 space-y-4">
                    <div className="flex gap-4 ">
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Task Title</label>
                            <input
                                type="text"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Category</label>
                            <Select
                                fullWidth
                                defaultValue=""
                                displayEmpty
                                className="border border-[#BCBCBC] w-full outline-none mt-1 rounded-sm h-10.5 box-border"
                                sx={ {
                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    "& .MuiSelect-select": {
                                        paddingLeft: "16px",
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                        color: "#000",
                                    },
                                } }
                            >
                                <MenuItem value="" sx={ { fontSize: "13px", fontWeight: "600" } }>
                                    Logo Design
                                </MenuItem>
                                <MenuItem value="status2" sx={ { fontSize: "13px" } }>
                                    Role 2
                                </MenuItem>
                                <MenuItem value="status3" sx={ { fontSize: "13px" } }>
                                    Role 3
                                </MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-4 ">
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Description</label>

                            <textarea
                                rows="4"
                                className="border-[#BCBCBC] resize-none w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex gap-4 ">
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Project</label>

                            <Select
                                fullWidth
                                defaultValue=""
                                displayEmpty
                                className="border border-[#BCBCBC] w-full outline-none mt-1 rounded-sm h-10.5 box-border"
                                sx={ {
                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    "& .MuiSelect-select": {
                                        paddingLeft: "16px",
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                        color: "#000",
                                    },
                                } }
                            >
                                <MenuItem value="" sx={ { fontSize: "13px", fontWeight: "600" } }>
                                    Project
                                </MenuItem>
                                <MenuItem value="status2" sx={ { fontSize: "13px" } }>
                                    Role 2
                                </MenuItem>
                                <MenuItem value="status3" sx={ { fontSize: "13px" } }>
                                    Role 3
                                </MenuItem>
                            </Select>
                        </div>

                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Priority</label>

                            <Select
                                fullWidth
                                defaultValue=""
                                displayEmpty
                                className="border border-[#BCBCBC] w-full outline-none mt-1 rounded-sm h-10.5 box-border"
                                sx={ {
                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    "& .MuiSelect-select": {
                                        paddingLeft: "16px",
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                        color: "#000",
                                    },
                                } }
                            >
                                <MenuItem value="" sx={ { fontSize: "13px", fontWeight: "600" } }>
                                    High
                                </MenuItem>
                                <MenuItem value="status2" sx={ { fontSize: "13px" } }>
                                    Role 2
                                </MenuItem>
                                <MenuItem value="status3" sx={ { fontSize: "13px" } }>
                                    Role 3
                                </MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-4 ">
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Start Date</label>
                            <input
                                type="date"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Due Date</label>
                            <input
                                type="date"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[#616161]  text-[14px]">Assigned To</label>

                        <div className="flex gap-4 ">
                            <input
                                type="text"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />

                            <Button
                                sx={ {
                                    textTransform: "capitalize",
                                    backgroundColor: "#000",
                                    border: "1px solid #000",
                                    color: "#fff",
                                    paddingX: "17px",
                                    fontSize: "14px",
                                } }
                            >
                                <span>Add</span>
                            </Button>
                        </div>

                        <div className="flex gap-2.5 mt-4">
                            { [ 1, 1, 1, 1 ].map( ( item, idx ) => (
                                <div className="relative">
                                    <img
                                        className="w-8.5 h-8.5 rounded-full object-cover"
                                        src={ profilePic }
                                        alt=""
                                    />
                                    <img
                                        className="w-3.5 cursor-pointer absolute top-0 -right-0.5"
                                        src={ removeIcon }
                                        alt=""
                                    />
                                </div>
                            ) ) }
                        </div>
                    </div>

                    <div className="mt-5">
                        <label className="text-[#616161]  text-[14px]">
                            Upload Document
                        </label>
                        <label className="text-[#616161]  text-[14px] block">
                            Drag and drop document to upload your support task
                        </label>

                        <div className="border-[#9F9F9F] text-center mt-3 border-dashed border-2 bg-[#F4EFEF] rounded-xl py-5">
                            <img
                                src={ uploadIcon }
                                className="w-14 mx-auto h-14 opacity-50"
                                alt=""
                            />
                            <p className="text-[#252323] font-medium text-[14px]">
                                Choose a file or drag & drop it here.
                            </p>

                            <p className="text-[#707070] text-[13px] mb-3">
                                txt, docx, pdf, jpeg, xlsx, -Up to 50MB
                            </p>

                            <Button
                                sx={ {
                                    textTransform: "capitalize",
                                    border: "1px solid #BCBCBC",
                                    color: "#000",
                                    paddingX: "20px",
                                    fontSize: "12px",
                                    borderRadius: "10px"
                                } }
                            >
                                <span className="font-medium"> Browse Files</span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-10">
                        <Button
                            sx={ {
                                textTransform: "capitalize",
                                border: "1px solid #BCBCBC",
                                color: "#000",
                                paddingX: "20px",
                                fontSize: "14px",
                            } }
                        >
                            <span className="font-medium"> Reset Data</span>
                        </Button>

                        <Button
                            sx={ {
                                textTransform: "capitalize",
                                backgroundColor: "#000",
                                border: "1px solid #000",
                                color: "#fff",
                                paddingX: "20px",
                                fontSize: "14px",
                            } }
                        >
                            <span>Create Task</span>
                        </Button>
                    </div>
                </form>
            </div>
        </Box>
    );

    return (
        <div>
            <Drawer
                onClose={ toggleDrawer( false ) }
                PaperProps={ {
                    sx: {
                        width: 750,
                        borderRadius: "8px 0 0 8px",
                        overflow: "visible",
                    },
                } }
                anchor="right"
                open={ open }
            >
                <div
                    onClick={ toggleDrawer( false ) }
                    className="bg-white h-14 w-1.5 rounded-lg absolute top-1/2 -translate-y-1/2   -left-5 -translate-x-1/2  z-99999999 cursor-grab"
                ></div>
                { form() }
            </Drawer>
        </div>
    );
}
