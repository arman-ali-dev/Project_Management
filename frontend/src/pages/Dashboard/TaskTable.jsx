import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/admin/taskSlice";
import userAvatar from "../../assets/userAvatar.png";
import { Tooltip, Skeleton, Pagination } from "@mui/material";

const TaskTable = () =>
{
    const dispatch = useDispatch();

    useEffect( () =>
    {
        const token = localStorage.getItem( "jwt" );
        if ( !token ) return;

        dispatch( fetchTasks() );
    }, [ dispatch ] );

    const { tasks, loading } = useSelector( ( state ) => state.adminTask );

    // Pagination

    const [ page, setPage ] = useState( 1 );
    const rowsPerPage = 7;

    const startIndex = ( page - 1 ) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedTasks = tasks?.slice( startIndex, endIndex );
    const totalPages = Math.ceil( tasks?.length / rowsPerPage ) || 1;


    return (
        <div className="rounded-2xl shadow px-6 py-5 mt-4 bg-white">
            <h2 className="text-[17px] font-semibold mb-6">Tasks</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[13px] font-semibold border-b border-gray-300">
                            <th className="pb-4 pr-4">Title</th>
                            <th className="pb-4 px-4">Estimated Time</th>
                            <th className="pb-4 px-4">Assigned Date</th>
                            <th className="pb-4 px-4">Status</th>
                            <th className="pb-4 px-4">Due Date</th>
                            <th className="pb-4 px-4">Priority</th>
                            <th className="pb-4 pl-4">Assigned To</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-50">
                        { loading ? Array.from( { length: 5 } ).map( ( _, i ) => (
                            <TableSkeletonRow key={ i } />
                        ) ) : paginatedTasks?.map( ( task, index ) => (
                            <tr
                                key={ index }
                                className="group hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-4 pr-4 text-[13px] font-medium text-gray-700">
                                    { task.title }
                                </td>

                                <td className="py-4 px-4 text-[13px] font-medium text-gray-700">
                                    { task.estimatedTime } Hours
                                </td>

                                <td className="py-4 px-4 text-[13px] text-gray-600">
                                    { task.createdAt.split( "T" )[ 0 ] }
                                </td>

                                <td className="py-4 px-4">
                                    <span
                                        className={ `px-3 py-1 text-[12px] font-semibold rounded ${ task.status === "In Progress"
                                            ? "bg-[rgba(245,86,0,.2)] text-[#F55600]"
                                            : "bg-[rgba(24,163,34,.2)] text-[#18A322]"
                                            }` }
                                    >
                                        { task.status }
                                    </span>
                                </td>

                                <td className="py-4 px-4 text-[13px] text-gray-600">
                                    { task.dueDate }
                                </td>

                                <td className="py-4 px-4">
                                    <span
                                        className={ `px-3 py-1 text-[12px] font-semibold rounded ${ task.priority === "High"
                                            ? "bg-[rgba(129,39,255,.2)] text-[#8127FF]"
                                            : "bg-[rgba(21,127,215,.2)] text-[#157FD7]"
                                            }` }
                                    >
                                        { task.priority }
                                    </span>
                                </td>



                                <td className="py-4 px-4">
                                    <div className="flex items-center -space-x-2">
                                        <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-400 text-lg font-light cursor-pointer hover:bg-gray-200 transition-colors">
                                            +
                                        </div>
                                        { task?.assignedTo?.map( ( u, i ) => (
                                            <Tooltip key={ i } title={ u.fullName }>
                                                { " " }
                                                <img
                                                    src={ u.profileImage || userAvatar }
                                                    alt="user"
                                                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                                                />
                                            </Tooltip>
                                        ) ) }
                                    </div>
                                </td>


                            </tr>
                        ) ) }
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-10 mb-2">
                <Pagination
                    count={ totalPages }
                    page={ page }
                    onChange={ ( event, value ) => setPage( value ) }
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
    );
};

const TableSkeletonRow = () => (
    <tr>
        <td className="py-4 pr-4">
            <Skeleton variant="text" width="80%" height={ 20 } />
        </td>

        <td className="py-4 px-4">
            <Skeleton variant="text" width="60%" height={ 20 } />
        </td>

        <td className="py-4 px-4">
            <Skeleton variant="text" width="70%" height={ 20 } />
        </td>

        <td className="py-4 px-4">
            <Skeleton variant="rounded" width={ 90 } height={ 26 } />
        </td>

        <td className="py-4 px-4">
            <Skeleton variant="text" width="70%" height={ 20 } />
        </td>

        <td className="py-4 px-4">
            <Skeleton variant="rounded" width={ 70 } height={ 26 } />
        </td>

        <td className="py-4 px-4">
            <div className="flex gap-2">
                <Skeleton className="-mr-5" variant="circular" width={ 28 } height={ 28 } />
                <Skeleton variant="circular" width={ 28 } height={ 28 } />
            </div>
        </td>
    </tr>
);

export default TaskTable;
