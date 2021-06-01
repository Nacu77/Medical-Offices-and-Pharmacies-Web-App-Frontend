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

const MedicineStock = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card} raised>
            <CardMedia className={classes.cardMedia} image={props.medicine.imageUrl} />
            <CardContent>
                <Typography>{props.medicine.name}</Typography>
                <br />
                <Typography>Price: {props.price}$</Typography>
                <Typography>Amount: {props.amount}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="primary">
                    Buy
                </Button>
            </CardActions>
        </Card>
    );
};

export default MedicineStock;
