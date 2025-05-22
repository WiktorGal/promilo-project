## Instalacja

1. **Sklonuj repozytorium**

```bash
git clone https://github.com/xFeeNee/promilo-project.git
```

2. **Zainstaluj zależności**

```bash
npm install
```

3. **Uruchom projekt**

```bash
npm run dev
```

## Wymagana instalacja poniższych bibliotek:

- Node.js (v16+) — Instalacja: `sudo apt install nodejs` (Linux) lub [instalator na Windows](https://nodejs.org/)
- NPM — Instalacja: `sudo apt install npm` (Linux) lub w zestawie z Node.js na Windows
- Yarn (opcjonalnie) — Instalacja: `npm install --global yarn`
- Firebase - Instalacja: `npm install firebase`

## Struktura Projektu

```
/
├── /node_modules
├── /src
│   ├── /components
│   ├── /pages
│   ├── /assets
│   │   ├── /images
│   │   ├── /styles
│   ├── /utils
│   ├── /services
│   ├── App.js
│   ├── index.js
│   ├── config.js
│   ├── routes.js
│   ├── /database
│   │   ├── db.js
│   │   ├── /models
│   │   ├── /schemas
├── /public
│   ├── index.html
├── .gitignore
├── .env
├── package.json
├── README.md
```

## OBSŁUGA BAZY DANYCH FIREBASE

## w pliku /src/App.js

`import DatabaseSeeder from "./firebase/DatabaseSeeder";`
`import DuplicateRemover from "./components/DuplicateRemover";`

## `<DuplicateRemover />` - służy do usuwania z bazy danych powielonych alkoholi z listy

## `<DatabaseSeeder />` - dodaje do listy alkohole z pliku seedDatabase.js

## Żeby te powyższe funkcje działały trzeba mieć API z firebase
