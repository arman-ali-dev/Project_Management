import React from "react";

const TaskTable = () =>
{
    const tasks = [
        {
            title: "Catalog",
            assignedDate: "5/14/2026",
            status: "In Progress",
            dueDate: "5/14/2026",
            priority: "High",
            progress: 50,
            assignees: [
                "https://i.pravatar.cc/150?u=1",
                "https://i.pravatar.cc/150?u=2",
            ],
        },
        {
            title: "Develop",
            assignedDate: "5/14/2026",
            status: "Done",
            dueDate: "5/14/2026",
            priority: "Low",
            progress: 0,
            assignees: [
                "https://i.pravatar.cc/150?u=3",
                "https://i.pravatar.cc/150?u=4",
            ],
        },
    ];

    return (
        <div className="rounded-2xl shadow px-6 py-5 mt-4 bg-white">
            <h2 className="text-[17px] font-semibold mb-6">Tasks</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[13px] font-semibold border-b border-gray-300">
                            <th className="pb-4 pr-4">Title</th>
                            <th className="pb-4 px-4">Assigned Date</th>
                            <th className="pb-4 px-4">Status</th>
                            <th className="pb-4 px-4">Due Date</th>
                            <th className="pb-4 px-4">Priority</th>
                            <th className="pb-4 px-4">Assigned To</th>
                            <th className="pb-4 pl-4">Progress</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-50">
                        { tasks.map( ( task, index ) => (
                            <tr
                                key={ index }
                                className="group hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-4 pr-4 text-[13px] font-medium text-gray-700">
                                    { task.title }
                                </td>

                                <td className="py-4 px-4 text-[13px] text-gray-600">
                                    { task.assignedDate }
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
                                        { task.assignees.map( ( url, i ) => (
                                            <img
                                                key={ i }
                                                src={ url }
                                                alt="user"
                                                className="w-7 h-7 rounded-full border-2 border-white object-cover"
                                            />
                                        ) ) }
                                    </div>
                                </td>

                                <td className="py-0 pl-4 min-w-35">
                                    <div className="flex items-center gap-2">
                                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                                            <div
                                                className={ `h-full rounded-full ${ task.progress > 0 ? "bg-green-500" : "bg-transparent" }` }
                                                style={ { width: `${ task.progress }%` } }
                                            ></div>
                                        </div>
                                        <span className="text-[11px] font-bold text-gray-800">
                                            { task.progress }%
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskTable;
