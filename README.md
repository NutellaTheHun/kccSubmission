# Project Overview

You'll find a general overview here, with more granular comments within the project code itself.

This application uses NestJS, TypeORM, and PostGIS as the backend.  
The report is served with React/Vite and Mantine components on the frontend.

---

## Backend Structure (`src/` directory)

- **base**  
  Base controllers and services to serve some entities as CRUD-like resources.  
  Contains infrastructure not very important for project goals.

- **modules**
  - **geometry**  
    Defines the State entity, which holds its geometry used to determine storm landfall.  
    Designed to act as a service to other services (rather than exposing endpoints).  
    Although its services ended up not being used for the project goals.

  - **hurdat-parser**  
    Core area for this project. Contains the functionality for parsing a HURDAT2 dataset and loading the database.  
    Converts Hurdat2 data into entities within the StormData module such as:
    - StormData
    - StormHeader
    - WindRadiiMaxExtentData (WRM)

  - **report**  
    Core area for this proejct.
    Provides services based on data (rather than initializing the database, like geometry and hurdat-parser).  
    This service checks StormData coordinates against State geometry and provides the backend solution to this project.

- **stormData**  
  Core area in terms of database design. Defines the data types based on the shape of the HURDAT2 format with considerations for relational databases.  
  Initially written as CRUD resources with controllers, services, and DTOs (though not used for the project goal).  
  Later modified to better fit the needs of the hurdat-parser service.

   - The database consists of three main tables:

      - **StormData**  
        - Maps from the HURDAT data row (except the WRM columns, since those are optional).  
        - Primary owner of relationships to StormHeader and the WRM entity.

      - **StormHeader**  
        - Maps from the HURDAT header row.  

      - **WindRadiiMaxExtentData (WRM)**  
        - Maps from the data row.  
        - Contains only the X_WindRadiiMaxExtend_Y columns.

---

## Frontend Structure

The frontend is much more minimal due to time constraints.  

Relevant files:
- src/pages/Report.tsx
- src/components/TableSort.tsx

### General Structure

The app is put together as a series of Pages, and each Page is composed of a series Components.  

- **Pages**  
  - Contain hooks and stateful data.  
  - Pass data down to components.

- **Components**  
  - Receive stateful data and functions/values from hooks.  
  - Render the HTML elements that make up the UI.

- In this case the app has only one page.  
- The Report page:
  - Fetches data from the backend with sorting functionality by column.
  - Passes its data and stateful variables to the TableSort component.  

- The **TableSort** component:
  - Renders the given data and stateful variables.  
  - Calls the setter functions for state management.
