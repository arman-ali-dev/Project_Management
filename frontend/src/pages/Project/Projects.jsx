import searchIcon from "../../assets/search.png";
import React, { useEffect, useState } from "react";
import plusIcon from "../../assets/plus.png";
import filterIcon from "../../assets/filter.png";
import ProjectCard, { ProjectCardSkeleton } from "./ProjectCard";
import AddProjectForm from "./AddProjectForm";
import { Divider, IconButton, Menu, MenuItem, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "../../redux/admin/projectSlice";

const Projects = () =>
{
    const dispatch = useDispatch();

    // Filter
    const [ status, setStatus ] = useState( null );
    const [ priority, setPriority ] = useState( null );

    // Search
    const [ search, setSearch ] = useState( "" );

    useEffect( () =>
    {
        const token = localStorage.getItem( "jwt" );

        if ( !token )
        {
            window.location.href = "/login";
            return;
        }

        if ( search.trim() === "" )
        {
            dispatch( fetchProjects( { status, priority } ) );
        } else
        {
            dispatch( searchProjects( search ) );
        }

    }, [ dispatch, status, priority, search ] );

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

    const [ filterAnchorEl, setFilterAnchorEl ] = React.useState( null );
    const openFilterDropDown = Boolean( filterAnchorEl );
    const handleClick = ( event ) =>
    {
        setFilterAnchorEl( event.currentTarget );
    };
    const handleCloseFilterDropDown = () =>
    {
        setFilterAnchorEl( null );
    };

    const { projects, loading } = useSelector( ( state ) => state.adminProject );

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
                            value={ search }
                            onChange={ ( e ) => setSearch( e.target.value ) }
                            className="placeholder:text-[#000000] border-0 mt-1 outline-0 text-[13px] placeholder:text-[13px] opacity-80"
                            type="text"
                            placeholder="Search a project..."
                        />
                    </div>

                    <div className="flex gap-2">
                        <div>
                            <IconButton
                                onClick={ handleClick }
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
                                <img src={ filterIcon } alt="" className="w-4" />
                            </IconButton>

                            <Menu
                                anchorEl={ filterAnchorEl }
                                open={ openFilterDropDown }
                                onClose={ handleCloseFilterDropDown }
                                PaperProps={ {
                                    sx: { width: 180, borderRadius: "8px" },
                                } }
                            >
                                <MenuItem
                                    onClick={ () =>
                                    {
                                        setStatus( null );
                                        setPriority( null );
                                        handleCloseFilterDropDown();
                                    } }
                                    sx={ { fontSize: "13px", fontWeight: 700 } }
                                >
                                    All Projects
                                </MenuItem>

                                <Divider />

                                <MenuItem
                                    onClick={ () =>
                                    {
                                        setStatus( "ACTIVE" );
                                        setPriority( null );
                                        handleCloseFilterDropDown();
                                    } }
                                    sx={ { fontSize: "13px", fontWeight: 700 } }
                                >
                                    Active Projects
                                </MenuItem>
                                <MenuItem
                                    onClick={ () =>
                                    {
                                        setStatus( "COMPLETED" );
                                        setPriority( null );

                                        handleCloseFilterDropDown();
                                    } }
                                    sx={ { fontSize: "13px", fontWeight: 700 } }
                                >
                                    Completed Projects
                                </MenuItem>
                                <MenuItem
                                    onClick={ () =>
                                    {
                                        setStatus( "ON_HOLD" );
                                        setPriority( null );

                                        handleCloseFilterDropDown();
                                    } }
                                    sx={ { fontSize: "13px", fontWeight: 700 } }
                                >
                                    On Hold
                                </MenuItem>

                                <Divider />

                                <MenuItem
                                    onClick={ () =>
                                    {
                                        setPriority( "HIGH" );
                                        setStatus( null );
                                        handleCloseFilterDropDown();
                                    } }
                                    sx={ { fontSize: "13px", fontWeight: 700 } }
                                >
                                    High Priority
                                </MenuItem>
                                <MenuItem
                                    onClick={ () =>
                                    {
                                        setPriority( "MEDIUM" );
                                        setStatus( null );
                                        handleCloseFilterDropDown();
                                    } }
                                    sx={ { fontSize: "13px", fontWeight: 700 } }
                                >
                                    Medium Priority
                                </MenuItem>
                                <MenuItem
                                    onClick={ () =>
                                    {
                                        setPriority( "LOW" );
                                        setStatus( null );
                                        handleCloseFilterDropDown();
                                    } }
                                    sx={ { fontSize: "13px", fontWeight: 700 } }
                                >
                                    Low Priority
                                </MenuItem>
                            </Menu>
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
                </div>

                <div className="grid grid-cols-3 gap-5 mt-6">
                    { loading
                        ? Array.from( { length: 3 } ).map( ( _, index ) => (
                            <ProjectCardSkeleton key={ index } />
                        ) )
                        : projects.map( ( project ) => (
                            <ProjectCard project={ project } key={ project.id } />
                        ) ) }
                </div>
            </div>

            <AddProjectForm toggleDrawer={ toggleDrawer } open={ open } />
        </>
    );
};

export default Projects;
