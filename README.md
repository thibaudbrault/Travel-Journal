# TravelVault

TravelVault is a web application that allows users to create and document their travels. For each trip, users can enter activities for every day, giving them the ability to save their travels and keep memories in one place.

## Features

- Create a new travel itinerary
- Add activities for each day of the trip
- Save and revisit your travel memories

## Getting Started

### Prerequisites

To run TravelVault locally, you'll need:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [PNPM](https://pnpm.io/)

### Clone the Repository

```bash
git clone https://github.com/thibaudbrault/TravelVault.git
cd travelvault
```

### Install dependencies

```bash
pnpm install
```

### Database setup

1. Create a new PostgreSQL database.
2. Configure your environment variables in a .env file at the root of the project:

```makefile
DATABASE_URL=your_postgresql_url
NEXTAUTH_SECRET=your_nextauth_secret
```

3. Run database migrations to set up the schema:

```bash
pnpm push
```

### Running the Application

To run the app in development mode:

```bash
pnpm dev
```

Your app should now be running on http://localhost:3000.

## Technologies

TravelVault is built using the following technologies:

- **React**
- **NextJS**
- **TypeScript**
- **Drizzle ORM**
- **AuthJS**

Feel free to contribute by submitting issues or pull requests!
