import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import plusIcon from "../../assets/plus.png";
import
{
    Select,
    MenuItem,
    Button,
    Snackbar,
    Alert,
    CircularProgress,
    Avatar,
    IconButton,
} from "@mui/material";

import * as Yup from "yup";
import { useFormik } from "formik";
import { updateProject } from "../../redux/admin/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import editIcon from "../../assets/edit2.png";
import editIcon2 from "../../assets/edit.png";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";
import uploadIcon from "../../assets/upload.png";

const projectValidationSchema = Yup.object( {
    name: Yup.string().required( "Project name is required" ),

    url: Yup.string().url( "Enter a valid URL" ).required( "URL is required" ),

    description: Yup.string().required( "Description is required" ),

    organizationName: Yup.string().required( "Organization name is required" ),

    progress: Yup.number()
        .min( 0, "Minimum 0" )
        .max( 100, "Maximum 100" )
        .required( "Progress is required" ),

    priority: Yup.string().required( "Priority is required" ),

    status: Yup.string().required( "Status is required" ),

    startDate: Yup.date()
        .required( "Start date is required" )
        .typeError( "Start date is required" ),

    dueDate: Yup.date()
        .required( "Due date is required" )
        .typeError( "Due date is required" )
        .min( Yup.ref( "startDate" ), "Due date cannot be before start date" ),

    logo: Yup.string().required( "Logo is required" ),
} );

export default function editProjectForm ( { selectedProject, toggleDrawer, open } )
{
    const dispatch = useDispatch();
    const [ openSnack, setOpenSnack ] = React.useState( false );
    const [ snackMessage, setSnackMessage ] = React.useState( "" );
    const [ snackType, setSnackType ] = React.useState( "success" );

    const logoInputRef = React.useRef( null );
    const [ uploading, setUploading ] = React.useState( false );

    const formik = useFormik( {
        enableReinitialize: true,
        initialValues: {
            name: selectedProject?.name || "",
            url: selectedProject?.url || "",
            description: selectedProject?.description || "",
            organizationName: selectedProject?.organizationName || "",
            progress: selectedProject?.progress || "",
            priority: selectedProject?.priority || "",
            status: selectedProject?.status || "",
            startDate: selectedProject?.startDate
                ? selectedProject.startDate.split( "T" )[ 0 ]
                : "",

            dueDate: selectedProject?.endDate
                ? selectedProject.endDate.split( "T" )[ 0 ]
                : "",
            logo: selectedProject?.logo || "",
        },
        validationSchema: projectValidationSchema,
        onSubmit: ( values, { resetForm } ) =>
        {
            console.log( "Add Project Payload:", values );

            const payload = {
                ...values,
                startDate: `${ values.startDate }T00:00:00`,
                endDate: `${ values.dueDate }T23:59:59`,
                id: selectedProject?.id
            };

            dispatch( updateProject( payload ) )
                .unwrap()
                .then( () =>
                {
                    setSnackType( "success" );
                    setSnackMessage( "Project Updated" );
                    setOpenSnack( true );

                    resetForm();
                    toggleDrawer()( false );
                } )
                .catch( ( err ) =>
                {
                    setSnackType( "error" );
                    setSnackMessage( err || "Something went wrong" );
                    setOpenSnack( true );
                } );
        },
    } );

    const { updateProjectLoading } = useSelector( ( state ) => state.adminProject );

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    const handleLogoChange = async ( e ) =>
    {
        const file = e.target.files[ 0 ];
        if ( !file ) return;

        if ( file.size > MAX_FILE_SIZE )
        {
            setSnackType( "error" );
            setSnackMessage( "Image size must be less than 10 MB" );
            setOpenSnack( true );
            return;
        }

        try
        {
            setUploading( true );
            const logo = await uploadToCloudinary( file );
            formik.setFieldValue( "logo", logo );
        } catch ( err )
        {
            setSnackType( "error" );
            setSnackMessage( err.message || "Image upload failed" );
            setOpenSnack( true );
        } finally
        {
            setUploading( false );
        }
    };

    const form = () => (
        <Box
            sx={ { width: 750 } }
            role="presentation"
            className="h-full overflow-auto"
        >
            <div className="px-8 py-10">
                <h2 className="font-semibold flex gap-3 items-center">
                    <img src={ editIcon2 } className="w-4.5" alt="" /> Edit Project
                </h2>

                <form onSubmit={ formik.handleSubmit } className="mt-5 space-y-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative flex-1 group">
                            <div
                                className={ `
                w-full h-35
                border-2 border-dashed border-[#BCBCBC]
                rounded-xl 
                flex items-center justify-center
                cursor-pointer
                overflow-hidden
                ${ formik.values.logo ? "border-solid" : "" }
            `}
                                onClick={ () => logoInputRef.current.click() }
                            >
                                { formik.values.logo ? (
                                    <img
                                        src={ formik.values.logo }
                                        alt="Project Logo"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-center px-3">
                                        <img src={ uploadIcon } className="w-6 mb-2 opacity-70" />
                                        <p className="text-[12px] text-[#616161] font-medium">
                                            Upload Project Logo
                                        </p>
                                        <span className="text-[11px] text-[#9E9E9E] mt-1">
                                            PNG, JPG up to 2MB
                                        </span>
                                    </div>
                                ) }
                            </div>

                            {/* Loading overlay */ }
                            { uploading && (
                                <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                                    <div className="w-7 h-7 border-[3px] border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) }

                            {/* Change logo button (only when logo exists) */ }
                            { formik.values.logo && (
                                <div className="absolute bottom-2 right-2">
                                    <IconButton
                                        onClick={ ( e ) =>
                                        {
                                            e.stopPropagation();
                                            logoInputRef.current.click();
                                        } }
                                        sx={ {
                                            backgroundColor: "#000",
                                            "&:hover": { backgroundColor: "#000" },
                                            width: 32,
                                            height: 32,
                                        } }
                                    >
                                        <img src={ editIcon } className="w-3 h-3" alt="edit" />
                                    </IconButton>
                                </div>
                            ) }

                            <input
                                ref={ logoInputRef }
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={ handleLogoChange }
                            />
                        </div>

                        {/* Validation error */ }
                        { formik.touched.logo && formik.errors.logo && (
                            <p className="text-red-500 text-[12px] mt-1">
                                { formik.errors.logo }
                            </p>
                        ) }
                    </div>

                    <div className="flex gap-4 ">
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">
                                Project Name
                            </label>
                            <input
                                name="name"
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                value={ formik.values.name }
                                type="text"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />

                            { formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-[12px] ">
                                    { formik.errors.name }
                                </p>
                            ) }
                        </div>
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">URL</label>
                            <input
                                name="url"
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                value={ formik.values.url }
                                type="text"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />

                            { formik.touched.url && formik.errors.url && (
                                <p className="text-red-500 text-[12px] ">{ formik.errors.url }</p>
                            ) }
                        </div>
                    </div>

                    <div className="flex gap-4 ">
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Description</label>

                            <textarea
                                name="description"
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                value={ formik.values.description }
                                rows="4"
                                className="border-[#BCBCBC] resize-none w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            ></textarea>

                            { formik.touched.description && formik.errors.description && (
                                <p className="text-red-500 text-[12px] ">
                                    { formik.errors.description }
                                </p>
                            ) }
                        </div>
                    </div>

                    <div className="flex gap-4 ">
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">
                                Organization Name
                            </label>
                            <input
                                name="organizationName"
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                value={ formik.values.organizationName }
                                type="text"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />

                            { formik.touched.organizationName &&
                                formik.errors.organizationName && (
                                    <p className="text-red-500 text-[12px] ">
                                        { formik.errors.organizationName }
                                    </p>
                                ) }
                        </div>

                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Progress</label>
                            <input
                                name="progress"
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                value={ formik.values.progress }
                                type="text"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />

                            { formik.touched.progress && formik.errors.progress && (
                                <p className="text-red-500 text-[12px] ">
                                    { formik.errors.progress }
                                </p>
                            ) }
                        </div>
                    </div>

                    <div className="flex gap-4 ">
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Priority</label>

                            <Select
                                name="priority"
                                value={ formik.values.priority }
                                onChange={ formik.handleChange }
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
                                <MenuItem value="">Select Priority</MenuItem>
                                <MenuItem value="HIGH">High</MenuItem>
                                <MenuItem value="MEDIUM">Medium</MenuItem>
                                <MenuItem value="LOW">Low</MenuItem>
                            </Select>

                            { formik.touched.priority && formik.errors.priority && (
                                <p className="text-red-500 text-[12px] ">
                                    { formik.errors.priority }
                                </p>
                            ) }
                        </div>
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Status</label>

                            <Select
                                name="status"
                                value={ formik.values.status }
                                onChange={ formik.handleChange }
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
                                <MenuItem value="">Select Status</MenuItem>
                                <MenuItem value="ACTIVE">Active</MenuItem>
                                <MenuItem value="ON_HOLD">On Hold</MenuItem>
                                <MenuItem value="COMPLETED">Completed</MenuItem>
                            </Select>

                            { formik.touched.status && formik.errors.status && (
                                <p className="text-red-500 text-[12px] ">
                                    { formik.errors.status }
                                </p>
                            ) }
                        </div>
                    </div>

                    <div className="flex gap-4 ">
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Start Date</label>
                            <input
                                name="startDate"
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                value={ formik.values.startDate }
                                type="date"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />

                            { formik.touched.startDate && formik.errors.startDate && (
                                <p className="text-red-500 text-[12px]  mt-1">
                                    { formik.errors.startDate }
                                </p>
                            ) }
                        </div>
                        <div className="flex-1">
                            <label className="text-[#616161]  text-[14px]">Due Date</label>
                            <input
                                name="dueDate"
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                value={ formik.values.dueDate }
                                type="date"
                                className="border-[#BCBCBC] w-full outline-0 px-4 py-2 text-[15px] mt-1 border rounded-sm"
                            />

                            { formik.touched.dueDate && formik.errors.dueDate && (
                                <p className="text-red-500 text-[12px]  mt-1">
                                    { formik.errors.dueDate }
                                </p>
                            ) }
                        </div>
                    </div>

                    <div className="flex gap-2 mt-10">
                        <Button
                            onClick={ formik.handleReset }
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
                            type="submit"
                            disabled={ updateProjectLoading }
                            sx={ {
                                textTransform: "capitalize",
                                backgroundColor: "#000",
                                border: "1px solid #000",
                                color: "#fff",
                                paddingX: "20px",
                                fontSize: "14px",
                                minWidth: "109px",
                            } }
                        >
                            { updateProjectLoading && (
                                <CircularProgress size={ 15 } sx={ { color: "#fff" } } />
                            ) }

                            { !updateProjectLoading && <span>Update Project</span> }
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

            <Snackbar
                open={ openSnack }
                autoHideDuration={ 3000 }
                onClose={ () => setOpenSnack( false ) }
                anchorOrigin={ { vertical: "top", horizontal: "right" } }
            >
                <Alert
                    onClose={ () => setOpenSnack( false ) }
                    severity={ snackType }
                    sx={ {
                        width: "100%",
                        fontSize: "13px",
                    } }
                >
                    { snackMessage }
                </Alert>
            </Snackbar>
        </div>
    );
}
