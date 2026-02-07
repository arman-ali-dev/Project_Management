import { Divider, IconButton, Menu, MenuItem, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import filterIcon from "../../assets/filter.png";
import meIcon from "../../assets/me.png";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import
{
    fetchMyTasks,
    updateTaskStatus,
    updateTaskStatusLocal,
} from "../../redux/member/taskSlice";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const MyTasks = () =>
{
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

    const dispatch = useDispatch();

    useEffect( () =>
    {
        const token = localStorage.getItem( "jwt" );
        if ( !token ) return;

        dispatch( fetchMyTasks() );
    }, [ dispatch ] );

    const { tasks, loading } = useSelector( ( state ) => state.task );

    const todoTasks = tasks?.filter( ( task ) => task.status === "TODO" );
    const doingTasks = tasks?.filter( ( task ) => task.status === "IN_PROGRESS" );
    const doneTasks = tasks?.filter( ( task ) => task.status === "DONE" );

    // Drag and Drop
    const onDragEnd = ( result ) =>
    {
        const { destination, source, draggableId } = result;

        if ( !destination ) return;

        // same column, same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
        {
            return;
        }

        // droppableId = status
        const newStatus = destination.droppableId;

        dispatch(
            updateTaskStatusLocal( {
                taskId: draggableId,
                status: newStatus,
            } ),
        );

        dispatch(
            updateTaskStatus( {
                taskId: draggableId,
                status: newStatus,
            } ),
        );
    };

    // Skeleton Component for loading state
    const TaskSkeleton = () => (
        <div className="space-y-2">
            { [ 1, 2, 3 ].map( ( item ) => (
                <div key={ item } className="bg-[#EFEFEF] w-full px-5 flex justify-between items-center py-2 rounded-xl">
                    <div className="flex gap-7 items-center">
                        <Skeleton variant="rectangular" width={ 20 } height={ 20 } />
                        <Skeleton variant="text" width={ 120 } height={ 20 } />
                    </div>

                    <Skeleton variant="text" width={ 150 } height={ 20 } />

                    <Skeleton variant="text" width={ 100 } height={ 20 } />

                    <div className="flex">
                        <Skeleton variant="circular" width={ 26 } height={ 26 } sx={ { marginRight: "-14px" } } />
                        <Skeleton variant="circular" width={ 26 } height={ 26 } />
                    </div>

                    <Skeleton variant="rectangular" width={ 80 } height={ 28 } sx={ { borderRadius: "6px" } } />

                    <Skeleton variant="circular" width={ 36 } height={ 36 } />
                </div>
            ) ) }
        </div>
    );

    return (
        <>
            <DragDropContext onDragEnd={ onDragEnd }>
                <div className=" mt-4 mx-8 relative">
                    <div className="bg-white shadow flex justify-between items-center rounded-lg px-5 py-2.5">
                        <div className="flex gap-2.5 items-center">
                            <img className="w-7" src={ meIcon } alt="" />
                            <p className="text-[14px] font-semibold">My Tasks</p>
                        </div>

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
                                <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                    All Projects
                                </MenuItem>

                                <Divider />

                                <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                    Active Projects
                                </MenuItem>
                                <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                    Completed Projects
                                </MenuItem>
                                <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                    On Hold
                                </MenuItem>
                                <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                    Archived
                                </MenuItem>

                                <Divider />

                                <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                    Ending Soon
                                </MenuItem>
                                <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                    Overdue Projects
                                </MenuItem>

                                <Divider />

                                <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                    High Priority
                                </MenuItem>
                                <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                    Medium Priority
                                </MenuItem>
                                <MenuItem sx={ { fontSize: "13px", fontWeight: 700 } }>
                                    Low Priority
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>

                    {/* TO-DO Section */ }
                    <div className="mt-6 shadow rounded-xl bg-white px-5 py-4">
                        <div className="flex gap-3 items-center">
                            <p className="text-[15px] font-semibold">To-Do</p>
                            <p className="text-[13px] font-semibold -mt-2 -ml-2">
                                ({ todoTasks?.length || 0 })
                            </p>
                        </div>

                        <div className="mt-3 space-y-2">
                            { loading ? (
                                <TaskSkeleton />
                            ) : (
                                <Droppable droppableId="TODO">
                                    { ( provided ) => (
                                        <div
                                            ref={ provided.innerRef }
                                            { ...provided.droppableProps }
                                            className="space-y-2"
                                        >
                                            { todoTasks?.map( ( task, index ) => (
                                                <Draggable
                                                    key={ task.id }
                                                    draggableId={ task.id.toString() }
                                                    index={ index }
                                                >
                                                    { ( provided ) => (
                                                        <div
                                                            ref={ provided.innerRef }
                                                            { ...provided.draggableProps }
                                                            { ...provided.dragHandleProps }
                                                        >
                                                            <Task task={ task } />
                                                        </div>
                                                    ) }
                                                </Draggable>
                                            ) ) }
                                            { provided.placeholder }

                                            { todoTasks?.length === 0 && (
                                                <p className="text-[13px] text-gray-400">No tasks</p>
                                            ) }
                                        </div>
                                    ) }
                                </Droppable>
                            ) }
                        </div>
                    </div>

                    {/* DOING Section */ }
                    <div className="mt-4 shadow rounded-xl bg-white px-5 py-4">
                        <div className="flex gap-3 items-center">
                            <p className="text-[15px] font-semibold">Doing</p>
                            <p className="text-[13px] font-semibold -mt-2 -ml-2">
                                ({ doingTasks?.length || 0 })
                            </p>
                        </div>

                        <div className="mt-3 space-y-2">
                            { loading ? (
                                <TaskSkeleton />
                            ) : (
                                <Droppable droppableId="IN_PROGRESS">
                                    { ( provided ) => (
                                        <div
                                            ref={ provided.innerRef }
                                            { ...provided.droppableProps }
                                            className="space-y-2"
                                        >
                                            { doingTasks?.map( ( task, index ) => (
                                                <Draggable
                                                    key={ task.id }
                                                    draggableId={ task.id.toString() }
                                                    index={ index }
                                                >
                                                    { ( provided ) => (
                                                        <div
                                                            ref={ provided.innerRef }
                                                            { ...provided.draggableProps }
                                                            { ...provided.dragHandleProps }
                                                        >
                                                            <Task task={ task } />
                                                        </div>
                                                    ) }
                                                </Draggable>
                                            ) ) }

                                            { provided.placeholder }

                                            { doingTasks?.length === 0 && (
                                                <p className="text-[13px] text-gray-400">No tasks</p>
                                            ) }
                                        </div>
                                    ) }
                                </Droppable>
                            ) }
                        </div>
                    </div>

                    {/* DONE Section */ }
                    <div className="mt-4 shadow rounded-xl bg-white px-5 py-4">
                        <div className="flex gap-3 items-center">
                            <p className="text-[15px] font-semibold">Done</p>
                            <p className="text-[13px] font-semibold -mt-2 -ml-2">
                                ({ doneTasks?.length || 0 })
                            </p>
                        </div>

                        <div className="mt-3 space-y-2">
                            { loading ? (
                                <TaskSkeleton />
                            ) : (
                                <Droppable droppableId="DONE">
                                    { ( provided ) => (
                                        <div
                                            ref={ provided.innerRef }
                                            { ...provided.droppableProps }
                                            className="space-y-2"
                                        >
                                            { doneTasks?.map( ( task, index ) => (
                                                <Draggable
                                                    key={ task.id }
                                                    draggableId={ task.id.toString() }
                                                    index={ index }
                                                >
                                                    { ( provided ) => (
                                                        <div
                                                            ref={ provided.innerRef }
                                                            { ...provided.draggableProps }
                                                            { ...provided.dragHandleProps }
                                                        >
                                                            <Task task={ task } />
                                                        </div>
                                                    ) }
                                                </Draggable>
                                            ) ) }

                                            { provided.placeholder }

                                            { doneTasks?.length === 0 && (
                                                <p className="text-[13px] text-gray-400">No tasks</p>
                                            ) }
                                        </div>
                                    ) }
                                </Droppable>
                            ) }
                        </div>
                    </div>
                </div>
            </DragDropContext>
        </>
    );
};

export default MyTasks;