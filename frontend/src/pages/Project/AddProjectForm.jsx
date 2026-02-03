import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import plusIcon from "../../assets/plus.png";
import { Select, MenuItem, Button } from "@mui/material";

export default function AddProjectForm ( { toggleDrawer, open } )
{
    const form = () => (
        <Box sx={ { width: 750 } } role="presentation">


            <div className="px-8 py-10">
                <h2 className="font-semibold flex gap-3 items-center">
                    <img src={ plusIcon } className="w-4" alt="" /> Add New Project
                </h2>

                <form className="mt-5 space-y-4">
                    <div className="flex gap-4 ">
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">
                                Project Name
                            </label>
                            <input
                                type="text"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">URL</label>
                            <input
                                type="text"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />
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
                            <label className="text-[#616161]  text-[14px]">
                                Organization Name
                            </label>
                            <input
                                type="text"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Status</label>

                            <Select
                                fullWidth
                                defaultValue=""
                                displayEmpty
                                className="border border-[#BCBCBC] w-full outline-none text-[15px] mt-1 rounded-sm h-10.5 box-border"
                                sx={ {
                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    "& .MuiSelect-select": {
                                        paddingLeft: "16px",
                                        display: "flex",
                                        alignItems: "center",
                                    },
                                } }
                            >
                                <MenuItem value="">Active</MenuItem>
                                <MenuItem value="status2">Status 2</MenuItem>
                                <MenuItem value="status3">Status 3</MenuItem>
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

                    <div className="flex gap-2 mt-10">
                        <Button
                            sx={ {
                                textTransform: "capitalize",
                                border: "1px solid #BCBCBC",
                                color: "#000",
                                paddingX: "20px",
                                fontSize: "14px"
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
                                fontSize: "14px"
                            } }
                        >
                            <span>Add Project</span>
                        </Button>
                    </div>
                </form>
            </div>
        </Box>
    );

    return (
        <div >
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
                <div onClick={ toggleDrawer( false ) } className="bg-white h-14 w-1.5 rounded-lg absolute top-1/2 -translate-y-1/2   -left-5 -translate-x-1/2  z-99999999 cursor-grab">
                </div>
                { form() }
            </Drawer>
        </div>
    );
}
