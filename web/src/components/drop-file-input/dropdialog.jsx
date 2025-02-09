import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Avatar from '@mui/material/Avatar';
// import DialogTitle from '@mui/material/DialogTitle';
import upload from '../../assets/upload.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DropFileInput from './DropFileInput';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
// import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import LoaderDialog from '../loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const ResponsiveDialog = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [fileList, setFileList] = React.useState([])
  const [isLoading,setIsLoading] = React.useState(false)


  const location = useLocation();
  console.log();

  const onFileChange = (files) => {
    console.log(files);
    setFileList(files);
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    console.log("in handle close");
    const userId = Cookies.get("ID")
    var fielData = new FormData();
    console.log(fileList);
    fielData.append('Name',fileList[0]['name']);
    fielData.append("type",'File');
    fielData.append('Parent_Folder',location.state.Current_Folder);
    fielData.append("User_id",userId);
    // fielData.append('Files',fileList[0]);
    fileList.forEach(file=>fielData.append('Files',file));
    setIsLoading(true)
    
    
    axios.post("http://localhost:8000/file/",fielData,{
      headers: {
          'Content-Type': 'multipart/form-data',
      }})
    .then( async (response) => {
      console.log(response);
      console.log(fielData);
      if(response.status !== 201){
        return;
      };
      setIsLoading(false)
      toast.success('File Uploaded Sucessfully', {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
        });
      window.location.reload(); 
    })
    .catch( (err) =>{ 
      setIsLoading(false)
      toast.error('Uploading Error', {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
        });
      console.log(err);
    })
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };



  return (
    <Box>
        <ListItemButton
            sx={{
              minHeight: 48,
              
            }}
            onClick={handleClickOpen}
          >
            <ListItemIcon>
              <Avatar alt="up" src={upload} sx={{width: 40, height: 40, marginLeft:'0%'}}  variant="square"/>
              {/* <DriveFolderUploadIcon color='primary' style={{fontSize:30}}  /> */}
            </ListItemIcon>
            <ListItemText primary="Upload" />
        </ListItemButton>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
        
      <Dialog
        fullWidth={true}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >

        <DialogContent>
          <DialogContentText>
                <DropFileInput onFileChange={(files) => onFileChange(files)}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
                Cancel
          </Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <LoaderDialog Loading = {isLoading}/>
    </Box>
  );
}

export default ResponsiveDialog;