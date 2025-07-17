#!/bin/bash
#
# This script initializes the MySQL database and user for local development.
# WARNING: This script uses a default password.
# You should change the password in this script and in your .env file for a real project.
#

DB_NAME="devx_survey"
DB_USER="survey_user"
DB_PASS="devxsurvey"
MYSQL_ROOT_USER="root"
MYSQL_ROOT_PASS=""

set -e

echo "--- MySQL Database Initializer ---"

# Check if mysql is available
if ! [ -x "$(command -v mysql)" ]; then
  echo 'Error: mysql is not installed. Please install MySQL.' >&2
  exit 1
fi

# Create database if it doesn't exist
echo "Checking for database: $DB_NAME"
if ! mysql -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASS -e "USE $DB_NAME;" 2> /dev/null; then
  echo "Creating database '$DB_NAME'..."
  mysql -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASS -e "CREATE DATABASE $DB_NAME;"
else
  echo "Database '$DB_NAME' already exists."
fi

# Create user if it doesn't exist
echo "Checking for user: $DB_USER"
USER_EXISTS=$(mysql -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASS -sse "SELECT EXISTS(SELECT 1 FROM mysql.user WHERE user = '$DB_USER');")
if [ "$USER_EXISTS" = 1 ]; then
  echo "User '$DB_USER' already exists."
else
  echo "Creating user '$DB_USER'..."
  mysql -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASS -e "CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
fi

# Grant privileges
echo "Granting all privileges on '$DB_NAME' to '$DB_USER'..."
mysql -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASS -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost'; FLUSH PRIVILEGES;"

echo "----------------------------"
echo "✅ MySQL database setup complete."
echo "Username: $DB_USER"
echo "Password: $DB_PASS (Update your .env file!)"
echo "Database: $DB_NAME"
echo "----------------------------"
