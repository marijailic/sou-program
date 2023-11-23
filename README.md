# Šou program

Ovaj repozitorij dio je radionice Software Engineering i sadrži full stack aplikaciju s odvojenim mapama:

- **Frontend** - Vue.js
- **Backend** - Express.js

## Preduvjeti

Prije nego počneš, provjeri imaš li sljedeće alate instalirane na svom računalu:

- **Git:** [Preuzmi i instaliraj Git](https://git-scm.com/downloads)
- **GitHub Desktop:** (izborno, ali korisno) [Preuzmi GitHub Desktop](https://desktop.github.com/)
- **Node.js i npm:** [Preuzmi i instaliraj Node.js](https://nodejs.org/)
- **VSCode:** [Preuzmi i instaliraj VSCode](https://code.visualstudio.com/Download)
- **PostgreSQL:** [Preuzmi i instaliraj PostgreSQL](https://www.postgresql.org/download/)
- **pgAdmin:** [Preuzmi i instaliraj pgAdmin](https://www.pgadmin.org/download/)

Isto tako, provjeri rade li ti tek instalirani alati. Odi u terminal i napiši:

```bash
node --version
npm --version
git --version
```

### Postavljanje pgAdmin-a

Prije nego nastaviš, konfiguriraj pgAdmin za povezivanje s lokalno hostiranom bazom podataka:

- Otvori pgAdmin i registriraj novi server ako ga nemaš.
- Poveži se na server koji radi na tvom lokalnom hostu.
- Kreiraj novu bazu za sou program aplikaciju

## Početak

### 1. Kloniraj repo

```bash
git clone https://github.com/sou-program/sou-program.git
cd sou-program
```

### 2. Postavi backend

#### a. Instaliraj npm pakete u backendu

```bash
cd backend
npm install
```

#### b. Postavi varijable okruženja za backend

- Napravi datoteku `.env` u mapi `backend` i dodaj vrijednosti na ključeve koji su navedeni u `.env.example` datoteci.
- Također ispuni DB podatke da se poklapaju podacima tvog servera tako da se možeš spojiti na njega tj. svoju bazu podataka.

### 3. Pripremanje baze podataka

#### b. Pokreni migracije

U mapi `backend` pokreni migracije i seedove za postavljanje tablica baze podataka i popunjavanje podataka potrebnih za korištenje aplikacije:

```bash
npm run migrate:fresh
npm run seed
```

### 4. Postavljanje frontenda (Vue.js)

#### a. Instaliraj npm pakete u frontendu

```bash
cd frontend
npm install
```

#### b. Postavi varijable okruženja za frontend

Napravi datoteku `.env` u mapi `frontend` i dodaj vrijednosti na ključeve koji su navedeni u `.env.example` datoteci.

### 5. Pokreni aplikaciju

#### a. Pokreni Backend

U mapi `backend` pokreni Express.js server:

```bash
npm run serve
```

Backend bi trebao biti pokrenut na `http://localhost:3000`.

#### b. Pokreni Frontend

U mapi `frontend` pokreni Vue.js development server:

```bash
npm run serve
```

Frontend bi trebao biti pokrenut na `http://localhost:8080`.

### 6. Otvori aplikaciju u svom browseru

Posjeti <http://localhost:8080/login> u svom browseru da se prijaviš s korisničkim imenom admin i lozinkom admin i vidiš aplikaciju na djelu.

## Dodatne informacije

- Provjeri radi li PostgreSQL servis prije pokretanja pozadine.
- Dobra proširenja (extensions) za VSCode je Prettier, ESLint, GitLens i Vetur.
