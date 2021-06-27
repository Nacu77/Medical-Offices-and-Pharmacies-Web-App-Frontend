import { Card, CardActions, CardContent, CardHeader, Typography, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Recipe = (props) => {
    const history = useHistory();

    return (
        <Card style={{ textAlign: "center" }} raised>
            <CardHeader title="Recipe" />

            <CardContent>
                <Typography>description: {props.description}</Typography>
                <br />
                <Typography>Medicines:</Typography>
                <Typography>- {props.medicines.map((medicine) => medicine.name + " - ")}</Typography>
            </CardContent>

            <CardActions>
                <Grid container justify="center" spacing={1}>
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
                                history.push(`/my-recipes/buy/${props.id}`);
                            }}
                        >
                            Buy medicines
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default Recipe;
