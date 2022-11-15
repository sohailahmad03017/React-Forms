import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import TuneIcon from '@mui/icons-material/Tune';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Grid } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RegistrationForm from '../FormScreens/StudentRegistration';
import QuizForm from '../FormScreens/QuizForm';
import ResultUpdate from '../FormScreens/ResultUpdate';
import CourseForm from '../FormScreens/CourseForm';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import UpdateIcon from '@mui/icons-material/Update';
import HomeIcon from '@mui/icons-material/Home';
import RegisteredStudent from '../FormScreens/RegisteredStudent';
import WcIcon from '@mui/icons-material/Wc';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddData from '../FormScreens/AddData';
import TrainerRegistration from '../FormScreens/TrainerRegistration';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOutUser } from '../config/firebaseMethods';
import FormControl from '../FormScreens/FormControl';


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
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
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

export default function SDrawer() {

    const navigate = useNavigate();

    const logOutUser = () => {
        signOutUser().then((success) => {
            navigate('/login')
        })
    }

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ background: 'cornflowerblue' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashborad
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open} >

                <DrawerHeader sx={{ background: '#808080' }}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ color: 'white' }} />}
                    </IconButton>
                </DrawerHeader>

                {/* <Divider /> */}

                <List sx={{ background: '#808080', color: 'white', height: '100vh' }}>

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('courseForm')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <MenuBookIcon />

                            </ListItemIcon>

                            <ListItemText primary="Add Course" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('quizForm')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <PsychologyAltIcon />

                            </ListItemIcon>

                            <ListItemText primary="Add Quiz" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('resultUpdate')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <UpdateIcon />

                            </ListItemIcon>

                            <ListItemText primary="Result Update" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('addData')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <AddBoxIcon />

                            </ListItemIcon>

                            <ListItemText primary="Add Data" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('registeredStudents')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <WcIcon />

                            </ListItemIcon>

                            <ListItemText primary="Registered Students" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>

                    

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('trainerRegistration')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <SupervisedUserCircleIcon />

                            </ListItemIcon>

                            <ListItemText primary="Trainer Registration" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('formControl')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <TuneIcon />

                            </ListItemIcon>

                            <ListItemText primary="Form Controls" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={logOutUser}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <LogoutIcon />

                            </ListItemIcon>

                            <ListItemText primary="Log Out" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>



                </List>

                {/* <List sx={{ background: 'cornflowerblue', color: 'white', height: '90vh' }}>
                    {['Inbox', 'Starred', 'Send email', 'Drafts', 'Starred', 'Send email', 'Drafts',].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}


            </Drawer>

            <Box variant='div' component="main" sx={{ flexGrow: 1, p: 3, width: '100%', paddingTop: '50px' }}>
                <Routes>
                    <Route path='addData' element={<AddData />}></Route>
                    <Route path='courseForm' element={<CourseForm />}></Route>
                    <Route path='quizForm' element={<QuizForm />}></Route>
                    <Route path='resultUpdate' element={<ResultUpdate />}></Route>
                    <Route path='formControl' element={<FormControl />}></Route>
                    <Route path='trainerRegistration' element={<TrainerRegistration />} />
                    <Route path='registeredStudents' element={<RegisteredStudent />} />
                </Routes>
            </Box>
        </Box>
    );
}
