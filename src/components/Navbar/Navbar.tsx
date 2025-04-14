import { AppShell, UnstyledButton, Button } from "@mantine/core";
import { Link } from "react-router-dom";

import classes from "~/App.module.scss";

export const Navbar = () => {
  return (
    <AppShell.Navbar py="md" px={2}>
      <Link to="/issues" className={classes.link}>
        <UnstyledButton className={classes.control}>Все задачи</UnstyledButton>
      </Link>
      <Link to="/boards" className={classes.link}>
        <UnstyledButton className={classes.control}>Проекты</UnstyledButton>
      </Link>
      <Button variant="filled" size="md" radius="md">
        Создать задачу
      </Button>
    </AppShell.Navbar>
  );
};
