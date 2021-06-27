import clsx from "clsx";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    IconButton,
} from "@material-ui/core";
import { Menu, ChevronLeft, ChevronRight, LocalHospital, LocalPharmacy, Healing, Home, Notes, Note } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../services/index";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    menuTypography: {
        cursor: "pointer",
        marginRight: theme.spacing(4),
    },
}));

const Navigation = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const pages = [
        {
            name: "Home",
            link: "/",
            icon: <Home />,
        },
        {
            name: "Medical Offices",
            link: "/medical-offices",
            icon: <LocalHospital />,
        },
        {
            name: "Pharmacies",
            link: "/pharmacies",
            icon: <LocalPharmacy />,
        },
        {
            name: "Medicines",
            link: "/medicines",
            icon: <Healing />,
        },
    ];

    const rolePages = [
        {
            name: "My Medical Offices",
            link: "/my-medical-offices",
            icon: <LocalHospital />,
            role: "doctor",
        },
        {
            name: "My Appointments",
            link: "/my-appointments",
            icon: <Notes />,
            role: "patient",
        },
        {
            name: "My Recipes",
            link: "/my-recipes",
            icon: <Note />,
            role: "patient",
        },
        {
            name: "My Pharmacies",
            link: "/my-pharmacies",
            icon: <LocalPharmacy />,
            role: "pharmacy_owner",
        },
    ];

    let authLinks;
    if (auth.isLoggedIn) {
        authLinks = (
            <Typography
                variant="h6"
                noWrap
                onClick={() => {
                    dispatch(logoutUser());
                    history.push("/logout");
                }}
                style={{ marginLeft: "auto" }}
                className={classes.menuTypography}
            >
                Logout
            </Typography>
        );
    } else {
        authLinks = (
            <>
                <Typography
                    variant="h6"
                    noWrap
                    onClick={() => {
                        history.push("/register");
                    }}
                    style={{ marginLeft: "auto" }}
                    className={classes.menuTypography}
                >
                    Register
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    onClick={() => {
                        history.push("/login");
                    }}
                    className={classes.menuTypography}
                >
                    Login
                </Typography>
            </>
        );
    }

    return (
        <>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: props.open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, props.open && classes.hide)}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => {
                            history.push("/");
                        }}
                        className={classes.menuTypography}
                    >
                        Medical Offices
                    </Typography>
                    {authLinks}
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={props.handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </div>

                <Divider />

                <List>
                    {pages.map((page) => (
                        <ListItem
                            button
                            onClick={() => {
                                history.push(page.link);
                            }}
                            key={page.name}
                        >
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <ListItemText primary={page.name} />
                        </ListItem>
                    ))}
                </List>

                <Divider />

                {auth.isLoggedIn && (
                    <>
                        <List>
                            {rolePages.map((page) => {
                                if (auth.role === page.role) {
                                    return (
                                        <ListItem
                                            button
                                            onClick={() => {
                                                history.push(page.link);
                                            }}
                                            key={page.name}
                                        >
                                            <ListItemIcon>{page.icon}</ListItemIcon>
                                            <ListItemText primary={page.name} />
                                        </ListItem>
                                    );
                                } else {
                                    return undefined;
                                }
                            })}
                        </List>

                        <Divider />
                    </>
                )}
            </Drawer>
        </>
    );
};

export default Navigation;
