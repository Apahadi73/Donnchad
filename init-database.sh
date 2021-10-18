#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER donnchad;
    CREATE DATABASE donnchadDB;
    GRANT ALL PRIVILEGES ON DATABASE donnchadDB TO donnchad;
    CREATE DATABASE donnchadDB;
    GRANT ALL PRIVILEGES ON DATABASE donnchadDB TO donnchad;
EOSQL

