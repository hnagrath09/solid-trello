package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
	models "github.com/hnagrath09/solid-trello/db-api/db_models"
	spec "github.com/hnagrath09/solid-trello/oapi-specs"
	"github.com/labstack/echo/v4"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
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

	// fetch token from utility function
	t, err := generateTokenAndSetClaims(&User)
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

func (s *Server) Login(ctx echo.Context) error {
	var reqBody spec.LoginDto

	if err := ctx.Bind(&reqBody); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	User, err := models.Users(qm.Where("email = ?", reqBody.Email)).One(ctx.Request().Context(), s.Db)
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	if User.Password != reqBody.Password {
		return ctx.JSON(http.StatusBadRequest, fmt.Errorf("entered password is incorrect"))
	}

	// fetch token from utility function
	t, err := generateTokenAndSetClaims(User)
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

	return ctx.JSON(http.StatusOK, response)
}

// utility function to generate token and set claims
func generateTokenAndSetClaims(u *models.User) (string, error) {
	// Set custom claims
	claims := &jwtCustomClaims{
		Id:    u.ID,
		Email: u.Email,
		Name:  u.Name,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", err
	}

	return t, nil
}
