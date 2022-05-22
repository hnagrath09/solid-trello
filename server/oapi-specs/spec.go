// Package spec provides primitives to interact the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen DO NOT EDIT.
package spec

import (
	"bytes"
	"compress/gzip"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/labstack/echo/v4"
)

// List defines model for List.
type List struct {
	Id float32 `json:"id"`

	// Order of the list in the board
	ListOrder float32 `json:"listOrder"`
	Tasks     []Task  `json:"tasks"`
	Title     string  `json:"title"`
}

// Task defines model for Task.
type Task struct {
	Id float32 `json:"id"`

	// List id associated with this task
	ListId float32 `json:"listId"`

	// Order of this task in the list
	TaskOrder float32 `json:"taskOrder"`
	Title     string  `json:"title"`
}

// CreateListJSONBody defines parameters for CreateList.
type CreateListJSONBody struct {
	ListOrder int    `json:"listOrder"`
	Title     string `json:"title"`
}

// CreateTaskJSONBody defines parameters for CreateTask.
type CreateTaskJSONBody struct {
	ListId    int    `json:"listId"`
	TaskOrder int    `json:"taskOrder"`
	Title     string `json:"title"`
}

// CreateListJSONRequestBody defines body for CreateList for application/json ContentType.
type CreateListJSONRequestBody CreateListJSONBody

// CreateTaskJSONRequestBody defines body for CreateTask for application/json ContentType.
type CreateTaskJSONRequestBody CreateTaskJSONBody

// RequestEditorFn  is the function signature for the RequestEditor callback function
type RequestEditorFn func(ctx context.Context, req *http.Request) error

// Doer performs HTTP requests.
//
// The standard http.Client implements this interface.
type HttpRequestDoer interface {
	Do(req *http.Request) (*http.Response, error)
}

// Client which conforms to the OpenAPI3 specification for this service.
type Client struct {
	// The endpoint of the server conforming to this interface, with scheme,
	// https://api.deepmap.com for example. This can contain a path relative
	// to the server, such as https://api.deepmap.com/dev-test, and all the
	// paths in the swagger spec will be appended to the server.
	Server string

	// Doer for performing requests, typically a *http.Client with any
	// customized settings, such as certificate chains.
	Client HttpRequestDoer

	// A list of callbacks for modifying requests which are generated before sending over
	// the network.
	RequestEditors []RequestEditorFn
}

// ClientOption allows setting custom parameters during construction
type ClientOption func(*Client) error

// Creates a new Client, with reasonable defaults
func NewClient(server string, opts ...ClientOption) (*Client, error) {
	// create a client with sane default values
	client := Client{
		Server: server,
	}
	// mutate client and add all optional params
	for _, o := range opts {
		if err := o(&client); err != nil {
			return nil, err
		}
	}
	// ensure the server URL always has a trailing slash
	if !strings.HasSuffix(client.Server, "/") {
		client.Server += "/"
	}
	// create httpClient, if not already present
	if client.Client == nil {
		client.Client = http.DefaultClient
	}
	return &client, nil
}

// WithHTTPClient allows overriding the default Doer, which is
// automatically created using http.Client. This is useful for tests.
func WithHTTPClient(doer HttpRequestDoer) ClientOption {
	return func(c *Client) error {
		c.Client = doer
		return nil
	}
}

// WithRequestEditorFn allows setting up a callback function, which will be
// called right before sending the request. This can be used to mutate the request.
func WithRequestEditorFn(fn RequestEditorFn) ClientOption {
	return func(c *Client) error {
		c.RequestEditors = append(c.RequestEditors, fn)
		return nil
	}
}

// The interface specification for the client above.
type ClientInterface interface {
	// CreateList request  with any body
	CreateListWithBody(ctx context.Context, contentType string, body io.Reader, reqEditors ...RequestEditorFn) (*http.Response, error)

	CreateList(ctx context.Context, body CreateListJSONRequestBody, reqEditors ...RequestEditorFn) (*http.Response, error)

	// GetAllLists request
	GetAllLists(ctx context.Context, reqEditors ...RequestEditorFn) (*http.Response, error)

	// CreateTask request  with any body
	CreateTaskWithBody(ctx context.Context, contentType string, body io.Reader, reqEditors ...RequestEditorFn) (*http.Response, error)

	CreateTask(ctx context.Context, body CreateTaskJSONRequestBody, reqEditors ...RequestEditorFn) (*http.Response, error)
}

func (c *Client) CreateListWithBody(ctx context.Context, contentType string, body io.Reader, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewCreateListRequestWithBody(c.Server, contentType, body)
	if err != nil {
		return nil, err
	}
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

func (c *Client) CreateList(ctx context.Context, body CreateListJSONRequestBody, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewCreateListRequest(c.Server, body)
	if err != nil {
		return nil, err
	}
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

func (c *Client) GetAllLists(ctx context.Context, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewGetAllListsRequest(c.Server)
	if err != nil {
		return nil, err
	}
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

func (c *Client) CreateTaskWithBody(ctx context.Context, contentType string, body io.Reader, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewCreateTaskRequestWithBody(c.Server, contentType, body)
	if err != nil {
		return nil, err
	}
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

func (c *Client) CreateTask(ctx context.Context, body CreateTaskJSONRequestBody, reqEditors ...RequestEditorFn) (*http.Response, error) {
	req, err := NewCreateTaskRequest(c.Server, body)
	if err != nil {
		return nil, err
	}
	if err := c.applyEditors(ctx, req, reqEditors); err != nil {
		return nil, err
	}
	return c.Client.Do(req)
}

// NewCreateListRequest calls the generic CreateList builder with application/json body
func NewCreateListRequest(server string, body CreateListJSONRequestBody) (*http.Request, error) {
	var bodyReader io.Reader
	buf, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}
	bodyReader = bytes.NewReader(buf)
	return NewCreateListRequestWithBody(server, "application/json", bodyReader)
}

// NewCreateListRequestWithBody generates requests for CreateList with any type of body
func NewCreateListRequestWithBody(server string, contentType string, body io.Reader) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}

	basePath := fmt.Sprintf("/list")
	if basePath[0] == '/' {
		basePath = basePath[1:]
	}

	queryUrl, err = queryUrl.Parse(basePath)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", queryUrl.String(), body)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Content-Type", contentType)

	return req, nil
}

// NewGetAllListsRequest generates requests for GetAllLists
func NewGetAllListsRequest(server string) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}

	basePath := fmt.Sprintf("/lists")
	if basePath[0] == '/' {
		basePath = basePath[1:]
	}

	queryUrl, err = queryUrl.Parse(basePath)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("GET", queryUrl.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

// NewCreateTaskRequest calls the generic CreateTask builder with application/json body
func NewCreateTaskRequest(server string, body CreateTaskJSONRequestBody) (*http.Request, error) {
	var bodyReader io.Reader
	buf, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}
	bodyReader = bytes.NewReader(buf)
	return NewCreateTaskRequestWithBody(server, "application/json", bodyReader)
}

// NewCreateTaskRequestWithBody generates requests for CreateTask with any type of body
func NewCreateTaskRequestWithBody(server string, contentType string, body io.Reader) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}

	basePath := fmt.Sprintf("/task")
	if basePath[0] == '/' {
		basePath = basePath[1:]
	}

	queryUrl, err = queryUrl.Parse(basePath)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", queryUrl.String(), body)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Content-Type", contentType)

	return req, nil
}

func (c *Client) applyEditors(ctx context.Context, req *http.Request, additionalEditors []RequestEditorFn) error {
	req = req.WithContext(ctx)
	for _, r := range c.RequestEditors {
		if err := r(ctx, req); err != nil {
			return err
		}
	}
	for _, r := range additionalEditors {
		if err := r(ctx, req); err != nil {
			return err
		}
	}
	return nil
}

// ClientWithResponses builds on ClientInterface to offer response payloads
type ClientWithResponses struct {
	ClientInterface
}

// NewClientWithResponses creates a new ClientWithResponses, which wraps
// Client with return type handling
func NewClientWithResponses(server string, opts ...ClientOption) (*ClientWithResponses, error) {
	client, err := NewClient(server, opts...)
	if err != nil {
		return nil, err
	}
	return &ClientWithResponses{client}, nil
}

// WithBaseURL overrides the baseURL.
func WithBaseURL(baseURL string) ClientOption {
	return func(c *Client) error {
		newBaseURL, err := url.Parse(baseURL)
		if err != nil {
			return err
		}
		c.Server = newBaseURL.String()
		return nil
	}
}

// ClientWithResponsesInterface is the interface specification for the client with responses above.
type ClientWithResponsesInterface interface {
	// CreateList request  with any body
	CreateListWithBodyWithResponse(ctx context.Context, contentType string, body io.Reader) (*CreateListResponse, error)

	CreateListWithResponse(ctx context.Context, body CreateListJSONRequestBody) (*CreateListResponse, error)

	// GetAllLists request
	GetAllListsWithResponse(ctx context.Context) (*GetAllListsResponse, error)

	// CreateTask request  with any body
	CreateTaskWithBodyWithResponse(ctx context.Context, contentType string, body io.Reader) (*CreateTaskResponse, error)

	CreateTaskWithResponse(ctx context.Context, body CreateTaskJSONRequestBody) (*CreateTaskResponse, error)
}

type CreateListResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON201      *List
}

// Status returns HTTPResponse.Status
func (r CreateListResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r CreateListResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type GetAllListsResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON200      *[]List
}

// Status returns HTTPResponse.Status
func (r GetAllListsResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r GetAllListsResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type CreateTaskResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON201      *Task
}

// Status returns HTTPResponse.Status
func (r CreateTaskResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r CreateTaskResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

// CreateListWithBodyWithResponse request with arbitrary body returning *CreateListResponse
func (c *ClientWithResponses) CreateListWithBodyWithResponse(ctx context.Context, contentType string, body io.Reader) (*CreateListResponse, error) {
	rsp, err := c.CreateListWithBody(ctx, contentType, body)
	if err != nil {
		return nil, err
	}
	return ParseCreateListResponse(rsp)
}

func (c *ClientWithResponses) CreateListWithResponse(ctx context.Context, body CreateListJSONRequestBody) (*CreateListResponse, error) {
	rsp, err := c.CreateList(ctx, body)
	if err != nil {
		return nil, err
	}
	return ParseCreateListResponse(rsp)
}

// GetAllListsWithResponse request returning *GetAllListsResponse
func (c *ClientWithResponses) GetAllListsWithResponse(ctx context.Context) (*GetAllListsResponse, error) {
	rsp, err := c.GetAllLists(ctx)
	if err != nil {
		return nil, err
	}
	return ParseGetAllListsResponse(rsp)
}

// CreateTaskWithBodyWithResponse request with arbitrary body returning *CreateTaskResponse
func (c *ClientWithResponses) CreateTaskWithBodyWithResponse(ctx context.Context, contentType string, body io.Reader) (*CreateTaskResponse, error) {
	rsp, err := c.CreateTaskWithBody(ctx, contentType, body)
	if err != nil {
		return nil, err
	}
	return ParseCreateTaskResponse(rsp)
}

func (c *ClientWithResponses) CreateTaskWithResponse(ctx context.Context, body CreateTaskJSONRequestBody) (*CreateTaskResponse, error) {
	rsp, err := c.CreateTask(ctx, body)
	if err != nil {
		return nil, err
	}
	return ParseCreateTaskResponse(rsp)
}

// ParseCreateListResponse parses an HTTP response from a CreateListWithResponse call
func ParseCreateListResponse(rsp *http.Response) (*CreateListResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &CreateListResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 201:
		var dest List
		if err := json.Unmarshal(bodyBytes, &dest); err != nil {
			return nil, err
		}
		response.JSON201 = &dest

	}

	return response, nil
}

// ParseGetAllListsResponse parses an HTTP response from a GetAllListsWithResponse call
func ParseGetAllListsResponse(rsp *http.Response) (*GetAllListsResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &GetAllListsResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 200:
		var dest []List
		if err := json.Unmarshal(bodyBytes, &dest); err != nil {
			return nil, err
		}
		response.JSON200 = &dest

	}

	return response, nil
}

// ParseCreateTaskResponse parses an HTTP response from a CreateTaskWithResponse call
func ParseCreateTaskResponse(rsp *http.Response) (*CreateTaskResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &CreateTaskResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 201:
		var dest Task
		if err := json.Unmarshal(bodyBytes, &dest); err != nil {
			return nil, err
		}
		response.JSON201 = &dest

	}

	return response, nil
}

// ServerInterface represents all server handlers.
type ServerInterface interface {

	// (POST /list)
	CreateList(ctx echo.Context) error

	// (GET /lists)
	GetAllLists(ctx echo.Context) error

	// (POST /task)
	CreateTask(ctx echo.Context) error
}

// ServerInterfaceWrapper converts echo contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler ServerInterface
}

// CreateList converts echo context to params.
func (w *ServerInterfaceWrapper) CreateList(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.CreateList(ctx)
	return err
}

// GetAllLists converts echo context to params.
func (w *ServerInterfaceWrapper) GetAllLists(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GetAllLists(ctx)
	return err
}

// CreateTask converts echo context to params.
func (w *ServerInterfaceWrapper) CreateTask(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.CreateTask(ctx)
	return err
}

// This is a simple interface which specifies echo.Route addition functions which
// are present on both echo.Echo and echo.Group, since we want to allow using
// either of them for path registration
type EchoRouter interface {
	CONNECT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	DELETE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	GET(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	HEAD(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	OPTIONS(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PATCH(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	POST(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PUT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	TRACE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
}

// RegisterHandlers adds each server route to the EchoRouter.
func RegisterHandlers(router EchoRouter, si ServerInterface) {
	RegisterHandlersWithBaseURL(router, si, "")
}

// Registers handlers, and prepends BaseURL to the paths, so that the paths
// can be served under a prefix.
func RegisterHandlersWithBaseURL(router EchoRouter, si ServerInterface, baseURL string) {

	wrapper := ServerInterfaceWrapper{
		Handler: si,
	}

	router.POST(baseURL+"/list", wrapper.CreateList)
	router.GET(baseURL+"/lists", wrapper.GetAllLists)
	router.POST(baseURL+"/task", wrapper.CreateTask)

}

// Base64 encoded, gzipped, json marshaled Swagger object
var swaggerSpec = []string{

	"H4sIAAAAAAAC/8RVT28aPxD9Ktb8fkeUhfYS7S3tIUJCaqTmFnFw1gPrxNiuZ2iKEN+9Gns3ECAEqkq9",
	"ZB3/efPemz+soQmLGDx6JqjXQE2LC52XE0ss35hCxMQW86418hd/6UV0CPVoALyKCDX45eIRE2wG4Czx",
	"t2QwyU2D1CQb2QYPNeRtFWaKW1RyT1mf149BJwNHwFjTcwnMuMiL/xPOoIb/qi3zqqNd3Wt6zq8KjE5J",
	"r/L/loXtDnEYe3WXwjwh0TYucbJ+DpvNABL+WNqEBuoHEd1j9Ix2ZU5f34fHJ2xYImYmf+re2BxaN8lu",
	"GaWJQmM1o1EvllvFrSUlnGBwGljufJyWDqzPi7D5EPjQXFGvRpf52gnfJXporCBYPwsSrosL34OzRt0n",
	"dC6om7sxDOAnJirSRlfDq6GwDBG9jhZq+Jy3BhA1tzkrletLPZTvW3e+JtSMSvdmSEK1nEmautNJORJx",
	"SPwlmJXgNMEz+gypY3S2yc+qJxLcvtkOq+RNAx2x3nrG+bveX1LYu96fsvxIKXJQTZYOu5CclphjUAye",
	"ipxPw9FFZpxq8Ozze5QKH6No2TRINFs6t8qSWc9J5IpMgqlsVWVdr2GOR3J+i6y0c6rc2s/5LfKNc5Pu",
	"bE/s8CKxZ421onp/rB268Ib1eTZwP6dOl343YI6V/n05+nulPzZn1P3uMLu4RW6MUSJYdaS3xaw8vqh+",
	"wp/XO1sqrzPsnCbKI/LfNFH5lXyH0odNVNyZ5veESUYt1A9rWCYHNbTMsa4qFxrt2kBcXw+vZdjutasc",
	"q/IaNtPN7wAAAP//vcMs9YcIAAA=",
}

// GetSwagger returns the Swagger specification corresponding to the generated code
// in this file.
func GetSwagger() (*openapi3.Swagger, error) {
	zipped, err := base64.StdEncoding.DecodeString(strings.Join(swaggerSpec, ""))
	if err != nil {
		return nil, fmt.Errorf("error base64 decoding spec: %s", err)
	}
	zr, err := gzip.NewReader(bytes.NewReader(zipped))
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %s", err)
	}
	var buf bytes.Buffer
	_, err = buf.ReadFrom(zr)
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %s", err)
	}

	swagger, err := openapi3.NewSwaggerLoader().LoadSwaggerFromData(buf.Bytes())
	if err != nil {
		return nil, fmt.Errorf("error loading Swagger: %s", err)
	}
	return swagger, nil
}

