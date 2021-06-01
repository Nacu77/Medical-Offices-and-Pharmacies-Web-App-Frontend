import { Card, CardContent, CardHeader, Typography, Grid } from "@material-ui/core";

const Schedule = (props) => {
    return (
        <Grid container justify="center">
            <Grid item>
                <Card style={{ textAlign: "center" }} raised>
                    <CardHeader title="Schedule" />
                    <CardContent>
                        <Typography>
                            Monday: {props.mondayStart} - {props.mondayEnd}
                        </Typography>
                        <Typography>
                            Tuesday: {props.tuesdayStart} - {props.tuesdayEnd}
                        </Typography>
                        <Typography>
                            Wednesday: {props.wednesdayStart} - {props.wednesdayEnd}
                        </Typography>
                        <Typography>
                            Thursday: {props.thursdayStart} - {props.thursdayEnd}
                        </Typography>
                        <Typography>
                            Friday: {props.fridayStart} - {props.fridayEnd}
                        </Typography>
                        <Typography>
                            Saturday: {props.saturdayStart} - {props.saturdayEnd}
                        </Typography>
                        <Typography>
                            Sunday: {props.sundayStart} - {props.sundayEnd}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Schedule;
