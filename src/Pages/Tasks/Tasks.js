import React, {memo, useCallback, useMemo, useState} from "react";
import {Alert, Col, Container, Dropdown, DropdownButton, Form, ListGroup, Row} from 'react-bootstrap';
import Event from "../../Components/Items/Event";
import {EventForm} from "../../Components/Blocks/EventForm";
import {applyFilter} from "../../Utils/Utils";
import {useTasks} from "../../Providers/TasksProvider";

export const eventsData = [
  {
    id: 1,
    title: 'test_1',
    done: false
  },
  {
    id: 2,
    title: 'test_2',
    done: false
  },
  {
    id: 3,
    title: 'test_3',
    done: true
  },
  {
    id: 4,
    title: 'test_4',
    done: false
  },
  {
    id: 5,
    title: 'test_5',
    done: true
  }
]

const Tasks = () => {
  const {tasks} = useTasks();
  const [title, setTitle] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')


  const TasksSearch = useMemo(() =>
      tasks
        .filter(task => applyFilter(filter, task))
        .filter(event => event.title.toLowerCase().includes(search.toLowerCase())),
    [tasks, filter, search]
  )

  return (
    <Container className={'mt-5'}>
      <Row>
        <Col xs={12} md={7}>
          <ListGroup as="ul" className={'mb-5'}>
            <Form.Control
              value={search}
              onChange={event => setSearch(event.target.value)}
              type="text"
              className={'mb-3'}
              placeholder="Search for events"
            />
            <Alert variant={'secondary'}>
              {tasks.length === 0
                ? 'There are no items.'
                : `You have ${tasks.length} things to do`
              }
            </Alert>
            {TasksSearch.map(event => (
              <Event
                key={event.id}
                item={event}
              />
            ))}
          </ListGroup>
        </Col>
        <Col xs={6} md={5}>
          <EventForm
            title={title}
            setTitle={setTitle}
            createEvent={() => {}}
          />
          <DropdownButton title={filter} className={'mt-3'}>
            <Dropdown.Item
              active={filter === 'All'}
              onClick={() => setFilter('All')}>
              All
            </Dropdown.Item>
            <Dropdown.Item
              active={filter === 'Done'}
              onClick={() => setFilter('Done')}>
              Done
            </Dropdown.Item>
            <Dropdown.Item
              active={filter === 'In Progress'}
              onClick={() => setFilter('In Progress')}>
              In Progress
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
    </Container>
  )
}

export default memo(Tasks)
