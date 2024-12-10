FROM golang:1.23.4-alpine3.21

WORKDIR /docker-go

# Installing dependencies
COPY go.mod go.sum ./
RUN go mod download

# Install gcc along with other build tools
RUN apk add build-base

COPY . .

EXPOSE 8080

CMD ["/bin/sh", "-c", "export CGO_ENABLED=1;go run main.go"]


