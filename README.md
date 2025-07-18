# Miiyagi workout planner
### A project using modern devops tooling
---

#### Usage

-   `git clone https://github.com/nevernorbo/devops-practice.git`
-   `cd devops-practice`
-   `alias terraform='sudo docker run -it --rm -v "$PWD":/workspace -v /var/run/docker.sock:/var/run/docker.sock -w /workspace hashicorp/terraform:light'`
-   `terraform init`
-   `terraform plan`
-   `terraform apply` (and "yes")
-   http://miiyagi.dojo
    (this will need the following two lines in the /etc/host file:
    `172.30.0.2 api.miiyagi.dojo`
    `172.30.0.20 miiyagi.dojo`)

---

#### IP addresses and port numbers:

```
Web app:        172.30.0.3:5173
API:            172.30.0.2:8080
Prometheus:     172.30.0.25:9090
Grafana:        172.30.0.26:3000
```

---

#### About the application

A very simple web application with standard CRUD functionality for tracking workout plans (or even for todos and note-taking).

You can select a day from the calendar on the left to query your saved entries for that day.
You can add new entries using the "Add exercise" button.
You can also edit and delete list items by clicking the edit and trash icons.

---

#### Technologies used

Frontend: Redux toolkit
Backend: REST API built in Golang, using Gin, the "GORM" ORM and the SQLite driver  
Database: SQLite

---

#### Devops tools used

-   Docker
-   Git
-   Github actions (currently unused)
    -   CodeQL static code analysis
    -   Golang build and test tool
-   Terraform
-   Prometheus
-   Grafana
-   nginx
-   Bind9
