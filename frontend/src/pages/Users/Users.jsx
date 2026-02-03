import React from "react";
import UserTable from "./UserTable";
import { IconButton, Pagination } from "@mui/material";
import plusIcon from "../../assets/plus.png";
import searchIcon from "../../assets/search.png";
import AddMemberForm from "./AddMemberForm";

const Users = () =>
{
    const [ open, setOpen ] = React.useState( false );

    const toggleDrawer = ( value ) => ( event ) =>
    {
        if (
            event.type === "keydown" &&
            ( event.key === "Tab" || event.key === "Shift" )
        )
        {
            return;
        }
        setOpen( value );
    };

    return (
        <>
            <div className=" mt-4 mx-8 relative">
                <div
                    onClick={ toggleDrawer( false ) }
                    className="bg-white shadow flex justify-between items-center rounded-lg px-5 py-2.5"
                >
                    <div className="flex gap-2 items-center">
                        <div className="bg-[#EFEFEF] h-8 w-8 rounded-lg flex justify-center items-center">
                            <img className="w-3" src={ searchIcon } alt="" />
                        </div>
                        <input
                            className="placeholder:text-[#000000] border-0 mt-1 outline-0 text-[13px] placeholder:text-[13px] opacity-80"
                            type="text"
                            placeholder="Search files and folders..."
                        />
                    </div>

                    <IconButton
                        onClick={ ( e ) =>
                        {
                            e.stopPropagation();
                            toggleDrawer( true )( e );
                        } }
                        sx={ {
                            width: 36,
                            height: 36,
                            backgroundColor: "#EFEFEF",
                            cursor: "pointer",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": {
                                backgroundColor: "#EFEFEF",
                            },
                        } }
                    >
                        <img className="w-3.5" src={ plusIcon } alt="" />
                    </IconButton>
                </div>

                <div className="bg-white shadow mt-4 rounded-lg px-5 py-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-[15px] font-semibold">Users List</h3>
                    </div>

                    <UserTable />

                    <div className="flex justify-center mt-10">
                        <Pagination
                            count={ 4 }
                            shape="rounded"
                            sx={ {
                                "& .MuiPaginationItem-root": {
                                    "&:hover": {
                                        backgroundColor: "#f5f5f5",
                                    },
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "black !important",
                                    color: "white !important",
                                    "&:hover": {
                                        backgroundColor: "#333 !important",
                                    },
                                },
                            } }
                        />
                    </div>
                </div>
            </div>

            <AddMemberForm toggleDrawer={ toggleDrawer } open={ open } />
        </>
    );
};

export default Users;
