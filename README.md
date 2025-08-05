# FoodFastCode Frontend

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Shadcn](https://img.shields.io/badge/shadcn/ui-0A0A0A?style=for-the-badge)

Frontend приложение для FoodFastCode

## 🚀 Установка и запуск

### Предварительные требования
- #### Node.js 22.12.0 ([установка](https://nodejs.org/))
- #### npm 11.3.0

### 1. Клонирование репозитория
```bash
git clone https://github.com/FoodFastCode/foodfastcode-front.git
cd foodfastcode-front
```
### 2. Установка зависимостей
```bash
npm install
```

### 2.2 Установка зависимостей shadcn
На данном этапе `обязательно` нужно удалить файл `components.json`

После выполнения команды `npx shadcn@latest init` создастся новый файл `components.json` который требуется заменить прежним
```bash
npx shadcn@latest init
```

### 3. Запуск приложения
```bash
npm run dev
```
