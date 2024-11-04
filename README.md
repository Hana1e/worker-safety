Worker Safety Monitoring Dashboard
Overview
The Worker Safety Monitoring Dashboard is a web application designed to monitor worker safety and real-time locations. Given the lack of a real-time data source or device for collecting live data, this application relies on static data from a JSON file to simulate worker locations, statuses, and alerts on a map interface.

Table of Contents
 Technologies Used
 Features
 Installation
 Usage
 Static Data Simulation

Technologies Used
  Frontend: React with Next.js, TypeScript
  CSS Framework: Tailwind CSS
  Map Integration: ArcGIS API for JavaScript
  Static Data: JSON file for worker information and status simulation
  
Features
 Authentication:Login form with validation and "forgot password" flow ,"Remember me" functionality
 Dashboard Layout:Responsive layout with a collapsible sidebar and real-time clock
 Map Integration:Displays worker locations using ArcGIS with 2D/3D map views basemaps ,Markers for different worker statuses (Connected, Disconnected, Suspicious, etc.)
 Worker List:Searchable and filterable list of workers ,Real-time status updates simulated from JSON data
 Alert System:Static notifications for alerts ,Details of each alert, including location and alert history

Installation
 Clone the Repository
 git clone https://github.com/Hana1e/worker-safety.git
 cd worker-safety-monitoring-dashboard
 Install Dependencies
 npm install
 Run the Development Server
 npm run dev
 
 Usage
  Authenticate: Log in using the login form, which includes a "forgot password" feature if needed.

  Dashboard Access:

  Map: View worker locations in real time on an ArcGIS map. The map offers both 2D and 3D views and displays markers that indicate each worker's status, such as "Connected," 
   "Disconnected," "Suspicious," or "In Danger." The markers help identify workers in need of immediate assistance.
  Worker List: Browse a searchable and filterable list of workers, organized by their current status.
  Alerts: Receive simulated alerts (from the JSON file), showing the type of alert, location, and timestamp, allowing for quick identification of critical situations.
  Static Data Simulation :Due to the absence of a real-time data collection device or service, the application simulates worker data using a static JSON file (workers.json). This file 
   includes: Worker Details: Such as ID, name, contact info, and location coordinates.
             Status: Indicates the current state of the worker (e.g., Connected, Disconnected, Suspicious, In Danger).
             Alerts: Provides alert information, including type (e.g., Suspicious Movement, Emergency), description, and timestamp.
   Using static data allows the application to simulate real-time worker status and alert tracking functionality, providing a realistic overview of how the application would function 
   with live data.
