import React from "react";
import profilePic from "../../assets/profile.jpg";

const UserTable = () =>
{
    return (
        <div className="overflow-x-auto mt-5">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-[13px] font-semibold border-b border-gray-300">
                        <th className="pb-4 pr-4">Name</th>
                        <th className="pb-4 px-4">User Id</th>
                        <th className="pb-4 px-4">Email</th>
                        <th className="pb-4 px-4">Password Hash</th>
                        <th className="pb-4 px-4">Role</th>
                        <th className="pb-4 px-4">Status</th>
                        <th className="pb-4 pl-4">Designation</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                    <tr className="group hover:bg-gray-50 transition-colors">
                        <td className="py-3 flex items-center gap-3">
                            <img
                                src={ profilePic }
                                alt={ "Armaan Ali" }
                                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                            />
                            <span className="text-[14px] font-medium text-gray-800">
                                Armaan Ali
                            </span>
                        </td>

                        <td className="py-4 px-4 text-[13px] text-gray-600">1</td>

                        <td className="py-4 px-4 text-[13px] text-gray-600">
                            arman.ali.ahit@gmail.com
                        </td>

                        <td className="py-4 px-4 text-[13px] text-gray-600">
                            8f7sd89yv786...
                        </td>

                        <td className="py-4 px-4 text-[13px] text-gray-600">Member</td>

                        <td className="py-4 px-4 text-[13px] text-gray-600">
                            <span className="text-[#F55600] py-1 bg-[rgba(245,86,0,.2)] text-[11px] px-2 rounded-md">
                                Invited
                            </span>
                        </td>

                        <td className="py-4 px-4 text-[13px] text-gray-600">
                            Software Developer
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
