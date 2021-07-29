import React from "react";
import {Button, Navbar} from "react-bootstrap";
import {useAuth} from "../../Providers/AuthProvider";

export const NavigationNavbar = () => {
  const {user, logout} = useAuth();

  return (
    <Navbar bg="dark">
      <Navbar.Brand href="/" className={'mx-4'}>
        <img
          src="/logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <h4 className={'text-white'}>Welcome, {user.username}</h4>
      <Navbar.Collapse className="justify-content-end">
        <Button
          className={'me-4'}
          variant={'outline-light'}
          onClick={logout}
        >
          Log out
        </Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

