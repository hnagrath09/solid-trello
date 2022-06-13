package middlewares

import (
	"net/http"

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
			default:
				return false
			}
		},
		SigningKey: []byte("secret"),
	}
	return middleware.JWTWithConfig(config)
}
