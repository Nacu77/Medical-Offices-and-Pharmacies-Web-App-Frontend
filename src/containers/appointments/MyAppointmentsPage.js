import { useState, useEffect } from "react";
import { Button, Container, Typography, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import axios from "../../axios";
import Appointments from "../../components/Appointments";

const MyAppointmentsPage = () => {
    const history = useHistory();
    const [appointments, setAppointments] = useState([]);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        axios
            .get(`/appointments/patient/${auth.user.patient.id}`)
            .then((res) => {
                setAppointments(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [auth.user.patient.id]);

    const handleCancel = (id) => {
        axios
            .delete(`/appointments/${id}`)
            .then((res) => {
                const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
                setAppointments(updatedAppointments);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                My Appointments
            </Typography>
            <br />
            <br />

            <Grid container justify="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        history.push("/medical-offices");
                    }}
                >
                    Find medical office and make an appointment
                </Button>
            </Grid>
            <br />
            <br />

            <Appointments appointments={appointments} handleCancel={handleCancel} />
        </Container>
    );
};

export default MyAppointmentsPage;
