# .ENV example:

DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_USER="root"
DB_PASSWORD="Password123!"
DB_NAME="specmash"

# docker commands for db

docker run --name=mariadb -e MYSQL_ROOT_PASSWORD=password123 --env MARIADB_USER=kolobashek --env MARIADB_PASSWORD=password123 -e MYSQL_DATABASE=specmash -p 3306:3306 -d mariadb
docker run --name phpmyadmin -d --link mariadb:db -p 8080:80 phpmyadmin