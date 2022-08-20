package middlewares

import (
	"net/http"

	"github.com/hnagrath09/solid-trello/handlers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func AuthMiddleware() echo.MiddlewareFunc {
	config := middleware.JWTConfig{
		// Skipper defines a function to skip middleware.
		Skipper: func(ctx echo.Context) bool {
			// Allow all preflight OPTIONS requests to be unauthenticated,
			// even for authenticated endpoints.
			if ctx.Request().Method == http.MethodOptions {
				return true
			}

			// Skip authenticator function for endpoints that don't require authentication.
			switch ctx.Path() {
			case "/login":
				return true
			case "/signup":
				return true
			case "/me":
				return false
			// @Todo: Change default to false once authentication setup is complete
			default:
				return true
			}
		},
		SigningKey: []byte("secret"),
		// Define custom claims type for JWT payload.
		Claims: &handlers.JwtCustomClaims{},
	}
	return middleware.JWTWithConfig(config)
}
