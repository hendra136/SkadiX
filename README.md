# Sea Level Rise Prediction for International Ports

## Overview
This project provides a web-based tool for analyzing and visualizing the impact of sea level rise on international ports. It includes a landing page with information about the tool and a dashboard for interactive visualization.

## Project Structure
The project is structured as a React application, but due to execution policy restrictions that prevent running npm commands, a simplified HTML version has been created for direct browser viewing.

### Files
- `index.html` - A standalone HTML file that can be opened directly in a browser without needing a development server
- `public/` - Contains static assets like images and icons
- `src/` - Contains the React application source code (not used in the simplified HTML version)

## How to Run

### Option 1: Open the HTML file directly
1. Navigate to the project directory
2. Double-click on `index.html` to open it in your default web browser

### Option 2: If you want to run the React application (requires execution policy changes)
1. Open PowerShell as Administrator
2. Run the following command to change the execution policy:
   ```
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Navigate to the project directory
4. Run `npm install` to install dependencies
5. Run `npm start` to start the development server
6. Open your browser and navigate to `http://localhost:3000`

## Features
- Interactive map visualization of sea level rise impact
- Multiple climate scenarios and prediction years (2050, 2100)
- Customizable visualization layers
- Case studies of port adaptation strategies

## Technical Details
The simplified HTML version includes:
- Responsive design with CSS Grid and Flexbox
- Styled components for UI elements
- Mock data for ports, scenarios, and risk levels

The React application (if you can run it) includes:
- React with TypeScript
- Styled Components for styling
- React Router for navigation
- Leaflet for interactive maps
- Context API for state management

## Note
This project was created as part of a hackathon and demonstrates a prototype for sea level rise prediction visualization.