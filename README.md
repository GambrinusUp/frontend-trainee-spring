# Мини-версия системы управления проектами (Project Management Systems)
## Функционал:
- **Просмотр всех задач:** отображение всех созданных задач
- **Просмотр досок**:  отображение всех досок
- **Просмотр доски:** отображение доски с просмотром задач и краткой информации по ним
- **Детальный просмотр задачи:** модальное окно с возможностью просмотра/редактирования детальной информации о задаче
-  **Создание задачи:** возможность  создать тикет и прикрепить его к нужной доске
-  **Редактирование задачи со страницы всех задач:** возможность со страницы всех задач посмотреть/отредактировать детальную информацию о задаче
-  **Редактирование задачи со страницы доски:** возможность на странице доски посмотреть/отредактировать детальную информацию о задаче
-  Возможность со страницы всех задач перейти на страницу доски с открытием детальной информации о выбранной задаче
- **Header:** Есть header при помощи которого можно всегда перейти на страницы:
	- Список всех задач
	- Список досок
	- Кнопка создания задачи

Также присутствует покрытие тестами утилитарных функций:

Для запуска необходимо в корневой папке (с установленными зависимостями) выполнить команду:
```
npm run test
```

## Инструкция по запуску:
1. Склонируйте репозиторий
```
git clone https://github.com/GambrinusUp/frontend-trainee-spring.git
```
2. Перейдите в репозиторий
```
cd frontend-trainee-spring
```
3. Запустите контейнер:
```
docker-compose up --build
```

Клиент будет запущен по этому адресу:
```
http://localhost:8081/issues
```

## Используемые технологии:
- React
- TypeScript (использован для строгой типизации и уменьшения возможных ошибок, связанных с типами данных)
- Redux Toolkit (для единого хранилища всего приложения и устранения props drilling)
- Vite (для быстрой и удобной сборки приложения) 
- Mantine (для быстрого создания удобного и красивого интерфейса, а также для использования форм и других полезных компонентов) 
- Lucide-icons (для иконок)
- React-router-dom (для маршрутизации)
- Eslint (для выявления ошибок)
- Prettier (для форматирования кода)
- Axios (для выполнения запросов)
- Jest (для тестирования участков кода)
- dnd kit (для реализация смены статуса задачи на доске посредством Drag-and-drop)

  ## Структура React приложения:
- src/
  - api/ - axiosInstance
  - components/ - для общих компонентов (например, Header)
  - constants/ - константы (например, apiURL)
  - context/ - контекст (например, модальное окно с формой)
  - hooks/ - общие хуки (например, useNotification)
  - modules/ - модули (например, ModuleIssues)
  - store/
    - IssuesStore/
      - api
        - index - для экспорта
        - IssuesStore.api - запросы к серверу
        - IssuesStore.api.const - константы для маршрутов
      - IssuesStore.actions - асинхронные действия
      - IssuesStore.const - константы
      - IssuesStore.types - типы данных
      - IssuesStore.reducer - редьюсер
      - index - экспорты
    - ...
    - index - корневой store, объединяющий все reducer
    - types - общие типы (например, LoadingState)
  - test/ - тесты
  - utils/ - вспомогательные функции

В модуле могут быть:
  - components/ - компоненты, связанные с этим модулем
  - Module - сам модуль
  - Module.const - константы
  - Module.types - типы данных
  - Module.hooks - хуки
  - Module.utils - вспомогательные функции
  - index - экспорты
