import * as React from 'react';
import { styled, alpha,useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Avatar from '@mui/material/Avatar';

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import List from '@mui/material/List';
import code from '../assets/code.png';
import news from '../assets/news.png';
import home from '../assets/home.png';
import resume from '../assets/resume-50.png';
import legal from '../assets/policy-document-50.png'
import book from '../assets/book-50.png'
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ResponsiveDialog from './drop-file-input/dropdialog';
import { useHistory, useLocation } from 'react-router';
import { Button } from '@mui/material';
import Cookies from 'js-cookie' 


const drawerWidth = 240; 

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 10px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 10px)`,
    },
  });

const DrawerHeader = styled('div')(({ theme }) => ({
    // backgroundColor:'#1976d2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
  

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(4),
    width: '50%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




export const Header = ({searchQuerry,setSerachQuerry}) => {

  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [removeCookie] = useCookies(['Id']);
  

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleSearchChange = (e) => {
    setSerachQuerry(e.target.value);
  };


  const onLogout = () => {
    Cookies.remove("ID")
    history.push('/')
  }
  
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <Button {...other} variant='contained' size="medium" startIcon={<AccountCircleIcon/>} onClick={onLogout}/>;
  })(({ theme, expand }) => ({
    marginLeft: 'auto',
    boxShadow:'none',
    '&:hover': {
      backgroundColor: 'white',
      color:'Black',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  }));

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    switch(index){
      case 1:
        history.push({pathname:'/homepage',state:{'Current_Folder':'root','cat':'None'}});
        break;
      case 2:
        history.push({pathname:'/homepage',state:{'Current_Folder':location.state.Current_Folder,'cat':'Book'}});
        break;
      case 3:
        history.push({pathname:'/homepage',state:{'Current_Folder':location.state.Current_Folder,'cat':'Resume'}});
        break;
      case 4:
        history.push({pathname:'/homepage',state:{'Current_Folder':location.state.Current_Folder,'cat':'Legal'}});
        break;
      case 5:
        history.push({pathname:'/homepage',state:{'Current_Folder':location.state.Current_Folder,'cat':'News'}});
        break;
      case 6:
        history.push({pathname:'/homepage',state:{'Current_Folder':location.state.Current_Folder,'cat':'Code'}});
        break;
      default:
        break;

    }
    
  };



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
            
          
            <Typography
              variant="h6"
              noWrap
              component="h6"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              
              Document Classifier
              
            </Typography>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase onChange={handleSearchChange}
              value={searchQuerry}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <ExpandMore >
            Sign Out
          </ExpandMore>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
      <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List >
          <ResponsiveDialog/> 
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
            <Avatar alt="LD" src={home} sx={{width: 40, height: 40, marginLeft:'0%'}} variant="square" />
              {/* <HomeIcon color="primary" style={{fontSize:iconsize}}/> */}
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <Avatar alt="book" src={book} sx={{width: 40, height: 40, marginLeft:'0%'}} variant="square" />
              {/* <AutoStoriesIcon color="primary" style={{fontSize:iconsize}}/> */}
            </ListItemIcon>
            <ListItemText primary="Book and Publication" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <Avatar alt="Re" src={resume} sx={{width: 40, height: 40, marginLeft:'0%'}} variant="square"/>
              {/* <Folder color="primary" style={{fontSize:iconsize}}/> */}
            </ListItemIcon>
            <ListItemText  primary="Resume" />
          </ListItemButton>


          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
                <Avatar alt="LD" src={legal} sx={{width: 40, height: 40, marginLeft:'0%'}} variant="square" />
            </ListItemIcon>
            <ListItemText  primary="Legal Documents" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 5}
            onClick={(event) => handleListItemClick(event, 5)}
          >
            <ListItemIcon>
                <Avatar alt="LD" src={news} sx={{width: 40, height: 40, marginLeft:'0%'}} variant="square" />
            </ListItemIcon>
            <ListItemText  primary="News" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 6}
            onClick={(event) => handleListItemClick(event, 6)}
          >
            <ListItemIcon>
              <Avatar alt="rp" src={code} sx={{width: 40, height: 40, marginLeft:'0%'}} variant="square" /> 
              {/* <Folder color="primary" style={{fontSize:iconsize}}/> */}
            </ListItemIcon>
            <ListItemText primary="Code" />
          </ListItemButton>

        </List>
        <Divider />
        
      </Drawer>
    </Box>
  );
}

export default Header;