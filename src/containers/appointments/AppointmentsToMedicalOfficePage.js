import { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";

import axios from "../../axios";
import Appointments from "../../components/Appointments";

const AppointmentsToMedicalOfficePage = (props) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios
            .get(`/appointments/medical-office/${props.match.params.id}`)
            .then((res) => {
                setAppointments(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.match.params.id]);

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
                Appointments
            </Typography>
            <br />
            <br />

            <Appointments appointments={appointments} handleCancel={handleCancel} forMedicalOffice />
        </Container>
    );
};

export default AppointmentsToMedicalOfficePage;
