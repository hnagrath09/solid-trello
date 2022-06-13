package handlers

import (
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
	models "github.com/hnagrath09/solid-trello/db-api/db_models"
	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/labstack/echo/v4"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

type jwtCustomClaims struct {
	Id    string `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
	jwt.StandardClaims
}

func (s *Server) CreateUser(ctx echo.Context) error {
	var reqBody spec.CreateUserDto

	if err := ctx.Bind(&reqBody); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	User := models.User{
		Name:     reqBody.Name,
		Email:    reqBody.Email,
		Password: reqBody.Password,
	}

	if err := User.Insert(ctx.Request().Context(), s.Db, boil.Infer()); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	// Set custom claims
	claims := &jwtCustomClaims{
		Id:    User.ID,
		Email: User.Email,
		Name:  User.Name,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return err
	}

	response := spec.CreateUserRes{
		Token: t,
		User: spec.User{
			Id:    User.ID,
			Email: User.Email,
			Name:  User.Name,
		},
	}

	return ctx.JSON(http.StatusCreated, response)
}
