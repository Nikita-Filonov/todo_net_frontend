import React from "react";
import {Button, Form} from "react-bootstrap";

export const EventForm = ({title, setTitle, createEvent}) => {
  return (
    <div>
      <Form.Group>
        <Form.Label>Event Name</Form.Label>
        <Form.Control
          value={title}
          onChange={event => setTitle(event.target.value)}
          type="text"
          placeholder="I need to..."
        />
      </Form.Group>
      <Button variant="primary"
              disabled={title.trim().length === 0}
              onClick={createEvent}>
        Create Event
      </Button>
    </div>
  )
}
