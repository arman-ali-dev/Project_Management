import React from "react";
import StatsCardsSection from "./StatsCardsSection";
import FilesUploadedCard from "./FilesUploadedCard";
import TaskStatusCard from "./TaskStatusCard";
import TaskTable from "./TaskTable";


const Dashboard = () =>
{
    return (
        <>
            <div className=" mt-4 mx-8 relative">

                <StatsCardsSection />

                <div className="grid grid-cols-6 gap-4 items-stretch mt-4">
                    <div className="col-span-4 h-full">
                        <FilesUploadedCard />
                    </div>

                    <div className="col-span-2 h-full">
                        <TaskStatusCard />
                    </div>
                </div>

                <TaskTable />
            </div>
        </>
    );
};

export default Dashboard;
