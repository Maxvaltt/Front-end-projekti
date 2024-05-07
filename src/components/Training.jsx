import React, { useState, useEffect } from "react";
import TrainingGrid from "./trainingGrid";
import AddTraining from "./addTraining";
import dayjs from "dayjs";
import { Snackbar } from "@mui/material";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [message, setMessage] = useState("");
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  const customersURL = "https://customerrestservice-personaltraining.rahtiapp.fi/getcustomers";
  const trainingURL = `https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings`;
  const add_trainingURL = `https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings`;

  useEffect(() => {
    getTrainings();
  }, []);

  useEffect(() => {
    fetch(customersURL)
      .then((response) => response.json())
      .then((responseData) => {
        setCustomers(responseData);
      })
      .catch((error) => console.error(error));
  }, []);

  const getTrainings = () => {
    fetch(trainingURL)
      .then((response) => response.json())
      .then((responseData) => {
        const transformedTrainings = responseData.map((training) => ({
          ...training,
          date: dayjs(training.date).format("dd.MM.yyyy HH:mm"),
        }));
        setTrainings(transformedTrainings);
      })
      .catch((error) => console.error(error));
  };

  const addTraining = (training) => {
    fetch(add_trainingURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(training),
    })
        .then(response => {
            if (response.ok) {
                setMessage('The training was saved successfully!');
                setOpen(true);
                getCustomers();
            } else {
                window.alert('Something went wrong with saving.');
            }
        })
        .catch(err => console.error(err));
};

  const deleteTraining = (params) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      fetch(
        `https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${params.data.id}`,
        { method: "DELETE" }
      )
        .then((response) => {
          if (response.ok) {
            setMessage("Training was deleted successfully");
            setOpen(true);
            getTrainings();
          } else {
            alert("Something went wrong!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <h1>Trainings</h1>
      
      <TrainingGrid trainings={trainings} deleteTraining={deleteTraining} />

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={message}
      ></Snackbar>
    </>
  );
}
