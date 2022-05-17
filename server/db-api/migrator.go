package db_api

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func Migrator() {
	db, err := sql.Open("postgres", "postgres://postgres:Test12345@localhost:5432/trello?sslmode=disable")

	if err != nil {
		log.Fatal("Unable to access postgres database")
	}

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	m, err := migrate.NewWithDatabaseInstance(
		"file://./db-api/migrations",
		"postgres", driver)

	if err != nil {
		log.Fatal(err, "Failed in migrate.NewWithDatabaseInstance")
	}
	version, dirty, err := m.Version()
	fmt.Printf("Current migration info: version=%d, dirty=%v, err=%v", version, dirty, err)

	error := m.Up()

	if error != nil && error != migrate.ErrNoChange {
		log.Fatal(err, "Failed in m.Up")
	}
}
