# Turbo

Turbo collects and monitors web performance metrics

![](https://user-images.githubusercontent.com/3949335/117425538-c4c22380-af1a-11eb-97e8-6d9d8845585e.png)

## Requirements

-   Node 14 (or higher)
-   MySQL 8 (or higher)

## Getting Started

Install dependencies:

```bash
npm i
```

Add, and update environment variables

```bash
cp .env.example .env
```

Run database migrations:

```bash
npx knex migrate:latest
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

[MIT](./LICENSE)
