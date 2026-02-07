import React from "react";
import externalIcon from "../../assets/external.png";
import { Link, useNavigate } from "react-router-dom";
import clockIcon from "../../assets/clock.png";
import profilePic from "../../assets/profile.jpg";
import profilePic2 from "../../assets/profile2.jpg";
import { CircularProgress, IconButton, Skeleton } from "@mui/material";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import EditProjectForm from "./editProjectForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../redux/admin/projectSlice";

const ProjectCard = ( { project } ) =>
{
  const navigate = useNavigate();

  const getDaysLeft = ( endDate ) =>
  {
    if ( !endDate ) return null;

    const today = new Date();
    const dueDate = new Date( endDate );

    today.setHours( 0, 0, 0, 0 );
    dueDate.setHours( 0, 0, 0, 0 );

    const diffTime = dueDate.getTime() - today.getTime();

    const diffDays = Math.floor( diffTime / ( 1000 * 60 * 60 * 24 ) ) + 1;

    return diffDays;
  };

  const daysLeft = getDaysLeft( project?.endDate );

  // Edit Project

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

  const [ selectedProject, setSelectedProject ] = React.useState( null );

  // Delete Project
  const dispatch = useDispatch();
  const { deletedProjectId } = useSelector( ( state ) => state.adminProject );

  const handleDeleteProject = ( id ) =>
  {
    dispatch( deleteProject( id ) );
  };

  const { user } = useSelector( ( state ) => state.user );

  return (
    <>
      <div>
        <div
          onClick={ () =>
          {
            toggleDrawer( false )();
            navigate( "/projects/123/kanban" );
          } }
          className="bg-white group relative cursor-pointer rounded-xl shadow px-6 py-5"
        >
          { user?.role === "ADMIN" && <div
            className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-50"
            onClick={ ( e ) => e.stopPropagation() }
          >
            <IconButton
              size="small"
              onClick={ ( e ) =>
              {
                setSelectedProject( project );
                e.stopPropagation();
                toggleDrawer( true )( e );
                console.log( "clinkded" );
              } }
            >
              <img className="w-4.5" src={ editIcon } alt="Edit" />
            </IconButton>

            <IconButton
              disabled={ deletedProjectId === project.id }
              size="small"
              onClick={ () => handleDeleteProject( project.id ) }
            >
              { deletedProjectId === project.id ? (
                <CircularProgress size={ 14 } color="black" />
              ) : (
                <img className="w-4" src={ deleteIcon } alt="Delete" />
              ) }
            </IconButton>
          </div> }
          <img className="w-16" src={ project?.logo } alt="" />

          <h3 className="font-medium opacity-80 text-[14px] mt-2.5">
            { project?.name }
          </h3>

          <Link
            to={ project?.url }
            onClick={ ( e ) => e.stopPropagation() }
            className="text-[#747373] z-50 font-medium -mt-1 text-[12px] flex gap-1 items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-2.5" src={ externalIcon } alt="" />
            <span>{ project?.url }</span>
          </Link>

          <p className="text-[13.5px] font-medium mt-4">
            { project?.description.split( " " ).slice( 0, 10 ).join( " " ) }
            { project?.description.split( " " ).length > 10 && "..." }
          </p>

          <div className="mt-5">
            <p className="text-[13px] text-right font-medium">
              { project?.progress }%
            </p>
            <div className="h-1 w-full bg-[#D4D9D4]">
              <div
                style={ {
                  width: project?.progress + "%",
                  backgroundColor:
                    project?.progress > 50
                      ? "#18A322"
                      : project?.progress === 50
                        ? "#157FD7"
                        : "#FA2626",
                } }
                className={ ` h-1 ` }
              ></div>
            </div>
          </div>

          <div className=" mt-6 flex justify-between items-center">
            <div className="bg-[#ebebeb] rounded-md flex gap-2 items-center py-1.5 px-3 text-[#605D5D] text-[11px]">
              <img className="w-3" src={ clockIcon } alt="" />
              <span className="font-medium">
                { daysLeft > 1 && `${ daysLeft } days left` }
                { daysLeft === 1 && "Last day" }
                { daysLeft <= 0 && "Overdue" }
              </span>
            </div>

            <div className="flex">
              <img
                className="w-7.5 h-7.5 -mr-4 z-50 relative border-white border rounded-full object-cover"
                src={ profilePic }
                alt=""
              />
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={ profilePic2 }
                alt=""
              />
            </div>
          </div>
        </div>
        <EditProjectForm
          selectedProject={ selectedProject }
          toggleDrawer={ toggleDrawer }
          open={ open }
        />
      </div>
    </>
  );
};

export default ProjectCard;

export const ProjectCardSkeleton = () =>
{
  return (
    <div className="bg-white rounded-xl shadow px-6 py-5">
      <Skeleton variant="rectangular" width={ 55 } height={ 55 } />

      <Skeleton height={ 18 } width="60%" sx={ { mt: 2 } } />

      <Skeleton height={ 14 } width="80%" />

      <Skeleton height={ 14 } width="100%" sx={ { mt: 2 } } />
      <Skeleton height={ 14 } width="90%" />
      <Skeleton height={ 14 } width="70%" />

      <Skeleton height={ 12 } width="100%" sx={ { mt: 3 } } />

      <div className="flex justify-between items-center mt-6">
        <Skeleton height={ 24 } width={ 100 } />
        <Skeleton variant="circular" width={ 32 } height={ 32 } />
      </div>
    </div>
  );
};
