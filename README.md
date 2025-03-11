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
├── package.json
├── README.md
```
