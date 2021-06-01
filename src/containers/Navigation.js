import { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
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
import { Menu, ChevronLeft, ChevronRight, LocalHospital, LocalPharmacy, Healing, Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;

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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const Navigation = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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

    return (
        <>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => {
                            props.history.push("/");
                        }}
                    >
                        Medical Offices
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </div>

                <Divider />

                <List>
                    {pages.map((page) => (
                        <ListItem
                            button
                            onClick={() => {
                                props.history.push(page.link);
                            }}
                            key={page.name}
                        >
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <ListItemText primary={page.name} />
                        </ListItem>
                    ))}
                </List>

                <Divider />
            </Drawer>
        </>
    );
};

export default withRouter(Navigation);
