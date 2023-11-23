import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Menu fixed="top" size="huge">
      <Menu.Menu position="left">
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/rated">
          Rated
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/auth">
          Sign in/Sign out
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
