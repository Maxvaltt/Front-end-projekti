import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function TrainingCalendar() {
    const [events, setEvents] = useState([]);

    const getTrainings = () => {
        const trainingURL = 'https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings';

        fetch(trainingURL)
            .then(response => response.json())
            .then(responseData => {
                const formattedEvents = responseData
                    .filter(training => training.customer)
                    .map(training => ({
                        id: training.id,
                        title: training.activity,
                        customer_firstname: training.customer.firstname,
                        customer_lastname: training.customer.lastname,
                        start: new Date(training.date),
                        end: new Date(moment(training.date).add(training.duration, 'minutes')),
                    }));

                setEvents(formattedEvents);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        getTrainings();
    }, []);

    const EventComponent = ({ event }) => (
        <div>
            {event.title}

            {event.customer_firstname && event.customer_lastname && (
                <div>{`${event.customer_firstname} ${event.customer_lastname}`}</div>
            )}

            <br />
        </div>
    );

    return (
        <>
            <h1>calendar</h1>
            <div style={{ height: 1000, padding: 20 }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    components={{
                        event: EventComponent,
                    }}
                />
            </div>
        </>
    );
}
