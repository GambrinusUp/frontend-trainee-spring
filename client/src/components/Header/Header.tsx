import { AppShell, Burger, UnstyledButton, Button, Group } from "@mantine/core";
import { Link, useMatch } from "react-router-dom";

import { HeaderProps } from "./Header.types";

import classes from "~/App.module.scss";
import { useTaskModal } from "~/context/TaskModalContext";

// Компонент Header для навигации, а также создания задач
export const Header = ({ opened, toggle }: HeaderProps) => {
  // Проверка соответствия маршрутам
  const isBoardPage = useMatch("/board/:id");
  const isIssuesPage = useMatch("/issues");
  const isBoardsPage = useMatch("/boards");
  const { open, form } = useTaskModal();

  // Функция открытия модального окна, если мы находимся на странице доски, то в форму создания задачи заполняем id доски
  const handleOpenModal = () => {
    form.setValues({
      ...JSON.parse(localStorage.getItem("issueDraft") || "{}"),
    });

    if (isBoardPage) {
      form.setValues({ boardId: isBoardPage.params.id });
    }

    open();
  };

  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="space-between" style={{ flex: 1 }}>
          <Group gap={0} visibleFrom="sm">
            <Link to="/issues" className={classes.link}>
              <UnstyledButton
                className={`${classes.control} ${isIssuesPage ? classes.active : ""}`}
              >
                Все задачи
              </UnstyledButton>
            </Link>
            <Link to="/boards" className={classes.link}>
              <UnstyledButton
                className={`${classes.control} ${isBoardsPage || isBoardPage ? classes.active : ""}`}
              >
                Проекты
              </UnstyledButton>
            </Link>
          </Group>
          <Group ml="xl" gap={0} visibleFrom="sm">
            <Button
              variant="filled"
              size="md"
              radius="md"
              onClick={handleOpenModal}
            >
              Создать задачу
            </Button>
          </Group>
        </Group>
      </Group>
    </AppShell.Header>
  );
};
