import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useTasks} from "../../Providers/TasksProvider";

export const EventForm = () => {
  const {createTask} = useTasks();
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('#563d7c')

  const onCreate = async () => {
    await createTask({title: title, tag: color})
    setTitle('')
    setColor('#563d7c')
  }

  return (
    <div>
      <Form.Group>
        <Form.Label>Task Name</Form.Label>
        <Form.Control
          value={title}
          onChange={event => setTitle(event.target.value)}
          type="text"
          placeholder="I need to..."
        />
        <Form.Label className={'mt-3'}>Choose tag color</Form.Label>
        <Form.Control
          value={color}
          type="color"
          id="exampleColorInput"
          defaultValue="#563d7c"
          title="Choose your color"
          onChange={event => setColor(event.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        disabled={title.trim().length === 0}
        onClick={onCreate}
        className={'mt-3'}
      >
        Create Event
      </Button>
    </div>
  )
}
