import React, {useState, memo} from "react";
import {Form, ListGroup} from "react-bootstrap";
import {ArrowRight, CheckLg, Pencil, Trash} from 'react-bootstrap-icons';

const Event = ({item, updateEvent, deleteEvent}) => {
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(item.title)

  return (
    <ListGroup.Item className="list-group-item d-flex justify-content-between align-items-center">
      {edit
        ? <>
          <Form.Control
            value={title}
            onChange={event => setTitle(event.target.value)}
            type="text"
            className={'mr-3'}
            placeholder="I need to..."
          />
          <CheckLg
            onClick={() => {
              title.length > 0 && updateEvent(item.id, 'title', title)
              setEdit(false)
            }}
            className="right ml-auto"
          />
          <ArrowRight onClick={() => {
            setEdit(false)
            setTitle(item.title)
          }} className={'ml-3'}/>
        </>
        : <>
          <Form.Check
            type="checkbox"
            onChange={() => updateEvent(item.id, 'done', !item.done)}
            checked={item.isComplete}
            label={item.title}
          />
          <Pencil className="right ml-auto" onClick={() => setEdit(!edit)}/>
          <Trash onClick={() => deleteEvent(item.id)} className={'ml-3'}/>
        </>}
    </ListGroup.Item>
  )

}

export default memo(Event)
