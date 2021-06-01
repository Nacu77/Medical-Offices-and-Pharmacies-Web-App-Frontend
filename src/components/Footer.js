import Copyright from "./Copyright";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(6),
        marginTop: theme.spacing(3),
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Copyright />
        </footer>
    );
};

export default Footer;
