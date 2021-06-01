import { Typography, Link } from "@material-ui/core";

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://www.linkedin.com/in/florin-ionut-nacu-4770281b2/">
                Nacu Florin Ionut
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

export default Copyright;
