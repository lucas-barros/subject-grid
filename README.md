# Subject Grid

## Overview

This project involves creating a full-stack web application to display subject data in a grid format. The application includes a backend REST API built with Node.js, Express, and PostgreSQL, and a frontend built with React and Radix UI. The primary objective is to showcase subject data with features such as filtering, sorting, and pagination.

## Usage

### Start

Create an .env file at the root directory. You may copy the .env.sample file as is or update it with desired values.

`cp .env.sample .env`

To facilitate infrastructure provision, this project uses docker. 

Use the command below to start the project.

`docker compose up --build`

Then access `http://localhost:8080/` to view the client application.

### Development Mode

During development, you can use the following command to run in watch mode:

`docker compose up --build --watch`

