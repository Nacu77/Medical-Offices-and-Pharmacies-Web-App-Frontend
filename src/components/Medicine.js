import { Card, CardContent, CardActions, Typography, Button, CardMedia } from "@material-ui/core";
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
                <Typography>{props.name}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="primary">
                    Find In Pharmacies
                </Button>
            </CardActions>
        </Card>
    );
};

export default Medicine;
