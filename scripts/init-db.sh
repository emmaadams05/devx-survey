#!/bin/bash
#
# This script initializes the PostgreSQL database and user for local development.
# WARNING: This script uses a default password.
# You should change the password in this script and in your .env file for a real project.
#
set -e

DB_NAME="devx_survey"
DB_USER="survey_user"
# ==> IMPORTANT: If you change this password, update your .env file!
DB_PASS="devxsurvey"

echo "--- Database Initializer ---"

# Check if psql is available
if ! [ -x "$(command -v psql)" ]; then
  echo 'Error: psql is not installed. Please install PostgreSQL.' >&2
  exit 1
fi

# Use the default 'postgres' database to run the setup commands
export PGDATABASE=postgres

echo "Checking for database: $DB_NAME"
if psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo "Database '$DB_NAME' already exists."
else
    echo "Creating database '$DB_NAME'..."
    createdb $DB_NAME
fi

echo "Checking for user: $DB_USER"
if psql -tAc "SELECT 1 FROM pg_catalog.pg_user WHERE usename = '$DB_USER'" | grep -q 1; then
    echo "User '$DB_USER' already exists."
else
    echo "Creating user '$DB_USER'..."
    psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS' CREATEDB;"
fi

echo "Granting all privileges on database '$DB_NAME' to '$DB_USER'."
psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

echo "----------------------------"
echo "✅ Database setup complete."
echo "Username: $DB_USER"
echo "Password: $DB_PASS (Remember to set this in your .env file!)"
echo "----------------------------" 