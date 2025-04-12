import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import {
  AppShell,
  Burger,
  Button,
  Group,
  MantineProvider,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import classes from "./App.module.scss";
import { TaskModalProvider } from "./context/TaskModalContext";
import { ModuleBoard } from "./modules/ModuleBoard";
import { ModuleBoards } from "./modules/ModuleBoards";
import { ModuleIssues } from "./modules/ModuleIssues";

const App = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Router>
      <MantineProvider>
        <Notifications />
        <TaskModalProvider>
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: "sm",
              collapsed: { desktop: true, mobile: !opened },
            }}
            padding="md"
          >
            <AppShell.Header>
              <Group h="100%" px="md">
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                />
                <Group justify="space-between" style={{ flex: 1 }}>
                  <Group gap={0} visibleFrom="sm">
                    <Link to="/issues" className={classes.link}>
                      <UnstyledButton className={classes.control}>
                        Все задачи
                      </UnstyledButton>
                    </Link>
                    <Link to="/boards" className={classes.link}>
                      <UnstyledButton className={classes.control}>
                        Проекты
                      </UnstyledButton>
                    </Link>
                  </Group>
                  <Group ml="xl" gap={0} visibleFrom="sm">
                    <Button variant="filled" size="md" radius="md">
                      Создать задачу
                    </Button>
                  </Group>
                </Group>
              </Group>
            </AppShell.Header>
            <AppShell.Navbar py="md" px={2}>
              <Link to="/issues" className={classes.link}>
                <UnstyledButton className={classes.control}>
                  Все задачи
                </UnstyledButton>
              </Link>
              <Link to="/boards" className={classes.link}>
                <UnstyledButton className={classes.control}>
                  Проекты
                </UnstyledButton>
              </Link>
              <Button variant="filled" size="md" radius="md">
                Создать задачу
              </Button>
            </AppShell.Navbar>
            <AppShell.Main>
              <Routes>
                <Route path="/boards" element={<ModuleBoards />} />
                <Route path="/board/:id" element={<ModuleBoard />} />
                <Route path="/issues" element={<ModuleIssues />} />
              </Routes>
            </AppShell.Main>
          </AppShell>
        </TaskModalProvider>
      </MantineProvider>
    </Router>
  );
};

export default App;
