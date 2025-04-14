import { AppShell, UnstyledButton, Button } from "@mantine/core";
import { Link, useMatch } from "react-router-dom";

import classes from "~/App.module.scss";
import { useTaskModal } from "~/context/TaskModalContext";

// Компонент Navbar (для узких экранов) для навигации, а также создания задач
export const Navbar = () => {
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
    <AppShell.Navbar py="md" px={2}>
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
      <Button variant="filled" size="md" radius="md" onClick={handleOpenModal}>
        Создать задачу
      </Button>
    </AppShell.Navbar>
  );
};
