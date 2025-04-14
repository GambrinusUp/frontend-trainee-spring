import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { AppShell, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
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
            <Header opened={opened} toggle={toggle} />
            <Navbar />
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
