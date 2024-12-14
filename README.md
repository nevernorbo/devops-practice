# Miiyagi edzéskövető

#### Devops 2024 beadandó

---

#### Futtatás

-   `git clone https://github.com/nevernorbo/devops-beadando-2024-lev.git`
-   `cd devops-beadando-2024-lev`
-   `alias terraform='sudo docker run -it --rm -v "$PWD":/workspace -v /var/run/docker.sock:/var/run/docker.sock -w /workspace hashicorp/terraform:light'`
-   `terraform init`
-   `terraform plan`
-   `terraform apply` (és "yes")
-   http://miiyagi.dojo
    (ehhez kell a következő sor az /etc/host fileba a következő két sor:
    `172.30.0.2 api.miiyagi.dojo`
    `172.30.0.20 miiyagi.dojo`)

---

#### Címek és portok:

```
Web app:        172.30.0.3:5173
API:            172.30.0.2:8080
Prometheus:     172.30.0.25:9090
Grafana:        172.30.0.26:3000
```

---

#### Az alkalmazásról

Egy egyszerű web alkalmazás standard CRUD funkcionalitással edzéstervek követéséhez (vagy akár teendőkhöz, jegyzeteléshez).

A bal oldalon lévő naptárból, napot választva lekérdezhetjük a mentett bejegyzéseinket.
Hozzáadhatunk új bejegyzést az "Add exercise" gomb segítségével.
Valamint szerkeszthetjük és törölhetjük a lista elemeket a szerkesztés és szemetes ikonokra kattintva.

---

#### Felhasznált technológiák

Frontend: Redux toolkit  
Backend: Go REST API a "GORM" nevű ORM-el és SQLite driverrel  
Database: SQLite  

---

#### Felhasznált devops eszközök

-   Docker
-   Git
-   [Github actions](https://github.com/nevernorbo/devops-beadando-2024-lev/actions)
    -   CodeQL statikus kódelemző
    -   Go projekt buildelése és az ahhoz tartozó tesztek futtatása
-   Terraform
-   Prometheus
-   Grafana
-   nginx
-   Bind9
