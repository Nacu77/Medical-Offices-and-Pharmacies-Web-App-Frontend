import { Card, CardContent, CardActions, Typography, Button, CardMedia, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
    const auth = useSelector((state) => state.auth);
    const history = useHistory();

    return (
        <Card className={classes.card} raised>
            <CardMedia className={classes.cardMedia} image={props.medicine.imageUrl} />
            <CardContent>
                <Typography align="center">{props.medicine.name}</Typography>
                <br />
                <Typography align="center">Price: {props.price}$</Typography>
                <Typography align="center">Amount: {props.amount}</Typography>
            </CardContent>
            <CardActions>
                <Grid container justify="center" spacing={2}>
                    {auth.role === "patient" && (
                        <Grid item>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    history.push(`/medicine-stock/buy/${props.id}`);
                                }}
                            >
                                Buy
                            </Button>
                        </Grid>
                    )}
                    {auth.role === "pharmacy_owner" && (
                        <>
                            <Grid item>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        props.handleDelete(props.id);
                                    }}
                                >
                                    Delete
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        history.push(`/medicine-stock/edit/${props.id}`);
                                    }}
                                >
                                    Modify
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </CardActions>
        </Card>
    );
};

export default MedicineStock;
