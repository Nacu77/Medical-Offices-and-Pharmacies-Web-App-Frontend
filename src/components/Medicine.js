import { Card, CardContent, Typography, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
    },
    cardMedia: {
        paddingTop: "56.25%",
    },
});

const Medicine = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card} raised>
            <CardMedia className={classes.cardMedia} image={props.imageUrl} />
            <CardContent>
                <Typography align="center">{props.name}</Typography>
            </CardContent>
        </Card>
    );
};

export default Medicine;
