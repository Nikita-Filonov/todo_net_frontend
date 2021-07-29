import React, {memo} from "react";
import {Form, ListGroup} from "react-bootstrap";
import {Pencil, Trash} from 'react-bootstrap-icons';
import {useTasks} from "../../Providers/TasksProvider";

const Event = ({item}) => {
  const {deleteTask, updateTask} = useTasks();

  return (
    <ListGroup.Item className="list-group-item d-flex justify-content-between align-items-center">
      <Form.Check
        type="checkbox"
        onChange={() => updateTask(item.id, [{path: 'isComplete', value: !item.isComplete}])}
        checked={item.isComplete}
        label={item.title}
      />
      <div style={{width: 20, height: 20, borderRadius: 20, backgroundColor: item.tag, marginLeft: 20}}/>
      <div className={'flex-grow-1'}/>
      <Pencil className="mx-3"/>
      <Trash onClick={async () => await deleteTask(item.id)} className={'ml-3'}/>
    </ListGroup.Item>
  )

}

export default memo(Event)
