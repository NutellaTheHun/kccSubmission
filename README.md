You'll find a general overview here, with more granular comments within the project code itself.

This application uses Nestjs, TypeORM, and PostGIS as a backend. The report is served with React/Vite and mantine components as the frontend.

Backend Structure in src directory: - base: base controllers and services to serve some entities as CRUD like resources. More boiler plate alongside the project goals. - modules: - geometry: defines the State entity which holds it's geometry which is used to determine storm landfall. Designed to act as a service to other services (rather than exposing endpoints), however the intended services did not end up being used for this specific project goal.

        - hurdat-parser: Core area for this project. contains the functionality of parsing a HURDAT2 dataset and loading the database.
        The parser converts Hurdat2 data into entities within the StormData module such as StormData, StormHeader, and WindRadiiMaxExtentData (WRM).

        - report: Core area for this project. An exposed service endpoint that consumes from the database rather than initialize it like the geometry and hurdat-parser services. This service is where StormData coordinates is checked against State geometry.

        - stormData: Core area in terms of database design. Defines the data types based on the shape of the HURDAT2 format with        considerations for relational databases. It was intially written as CRUD resources and has a set of controllers, services, and dtos, although not used for this project goal. The crud structure became modified to better fit the needs of the hurdat-parser service.

        The database consists of a StormHeader, StormData, and WindRadiiMaxExtentData table.
            - The StormData entity maps form the HURDAT data row except all of the WRM columns as this data is effectively optional.
            StormData is the primary owner of the relationships to StormHeader and the WRM entity.
            - The StormHeader entity maps from the HURDAT header row, and is referenced by StormData.
            - WRM entity maps from the data row, but only contains the X_WindRadiiMaxExtend_Y columns.

Frontend Structure is much more minimal, i'd like to do more but I must be considerate of the timeline for this submission.
Relevant files: - src/pages/Report.tsx - src/components/TableSort.tsx

I generally structure an App as a series of Pages, and Pages are a series of Components (Although Pages are still React Components).

Pages contain hooks and stateful data, and pass data down to the components

Components, who recieve stateful data and functions/values from hooks, render the HTML elements that make the UI.

In this case, my App has only a Report page, and the Report page displays the TableSort component.

The Report page fetches from the backend, and passes its data and stateful variables to the TableSort component.

The TableSort component simply renders the given data and stateful variables, and calls the stateful setter functions.
