# django-react-postgres-boilerplate

## Prerequisites
Install Docker Desktop

## Installation

You shouldn't have to make any changes to get this up and running, but here's some things to note:

- The default login credentials are admin and admin_password. These can be changed in backend/.env.

- There are 3 .env files provided. Note in particular the .env files in backend/ and postgres/; there, you can adjust the database credentials, debug mode, secret key, allowed hosts, etc. Things should run just fine without any changes, but just know these files are there.

- The included sample helloyou django app can be easily removed by removing 'helloyou' from INSTALLED_APPS in django mainapp/settings.py, removing the associated helloyou path in mainapp/urls.py and deleting the entire helloyou folder. There are no database migrations, so you don't need to worry about that. On the frontend, delete/replace the contents of Home.tsx.

## Running


**_NOTE: If you change your database name/credentials, but have already run the steps below, you may need to delete the associated postgres docker image in order to get things to work._**

For development mode without NGINX server, run the following command:

```sh
docker-compose -f "docker-compose.dev.yml" up -d --build
```
The react frontend should be available at `http://localhost:3000/` and django backend at `http://localhost:8000/` (django admin at `http://localhost:8000/admin/`). This mode supports both react hot reloading and django auto-refresh with changes.

For development with the NGINX server run:
```sh
docker-compose -f "docker-compose.yml" up -d --build
```
The server should be available at `http://127.0.0.1/`. This mode will not hot reload since it's running a production build (npm build).


## Features
### Forgot Password:
- The password reset feature is fully functional. In order to get the password reset url, you will need to open the backend django console. Enter the following in an application like PowerShell:
    ```sh
    $id = $(docker ps -aqf "name=django-react-postgres-boilerplate_backend")
    docker logs --tail 1000 -f $id
    ```
- Upon submitting a valid email, you should get a path like `http://localhost:3000/password_reset?token=abcdefgxyz123`; paste this in your browser to access the password reset form. The password reset form first validates the token; if the token is valid, it presents the password reset interface and allows the user to provide a new password. If the token is invalid, it will redirect the user to the login page.

    Check out the Django docs starting [here](https://docs.djangoproject.com/en/3.1/topics/email/#smtp-backend) in order to update the Email Backend from a console output to an actual SMTP backend.

### Left Navigation Bar:
- The left navigation bar (intially shown on the left with only the Home icon upon login) is auto-generated along with the associated React Router's private routes. These routes can be easily added/modified in routes/Routes.ts.
### Alerts:
- An alert setter at the context level is also included. An example of TriggerAlert is shown in Home.tsx (variants displayed after successful/failed submit). See AlertContext.tsx for typings.

### Customization:
- The boilerplate app name (shown at login, header, and footer) by changing the constant APP_NAME in frontend/src/settings.tsx.
- The default session duration is set to 5 hours in frontend/src/settings.tsx. The user will be logged out after 5 hours.
- The Material UI Theme can be adjusted in frontend\src\Theme.tsx

###

**TODO:**
- [x] Readme (setup and how to remove remnants of dummy stuff)
- [x] Material UI Theme
- [x] Auto Generation of Left Nav based on Routes?
- [x] Fix NGINX Docker Compose
- [x] fix django admin not serving css files on admin page
- [x] error context
- [x] show password errors
- [x] loading icon on login
- [x] ensure a non-existing route redirects to home 
- [x] email support (for password reset)
- [x] forgot password functionality (email)
- [ ] Add support for nested sub-routes off the main left-nav routes
- [ ] Reset session timeout with activity.
- [ ] Context level modal?
- [ ] Swagger API Explorer
- [ ] Backend Testing
- [ ] Frontend Testing (React Testing Library)
- [ ] Auto redirect to login with Failed Request
- [ ] Axios Interface for demo API
- [ ] Update and Pin versions (remove anything unused)
- [ ] Logging (user login/logout)
- [ ] Company Name/App Name
- [ ] Docusaurus help
