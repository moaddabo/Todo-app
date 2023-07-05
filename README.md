# Todo-app

 To run both the frontend and backend projects in separate folders and install the necessary Node.js modules, follow these steps:
 
 1. Open your command line interface (CLI) or terminal.
 
 2. Navigate to the main folder where your project folders are located. You can use the cd command to change directories. For example, if your main folder is located on your desktop, you can use the following command:
   
 
    cd Desktop/main-folder
    
 
 3. Install Node.js modules for the frontend (front-main) project:
    - Change directory to the frontend folder:
     
 
      cd front-main
      
    - Install the required dependencies using npm (Node Package Manager):
     
 
      npm install
      
 
 4. Install Node.js modules for the backend (server-main) project:
    - Change directory to the backend folder:
     
 
      cd ../server-main
      
    - Install the required dependencies using npm:
     
 
      npm install
      
 
 5. Run the frontend project:
    - Change directory back to the frontend folder:
     
 
      cd ../front-main
      
    - Start the frontend development server:
     
 
      npm start
      
    This will start the development server for the frontend project, allowing you to view your React application in your browser at a specific URL (usually http://localhost:3000).
 
 6. Run the backend project:
    - Change directory to the backend folder:
     
 
      cd ../server-main
      
    - Start the backend server:
     
 
      npm start
      
    This will start the Node.js server for the backend project, allowing your frontend application to communicate with the backend APIs.
 
 With these steps, you should be able to run both the frontend and backend projects simultaneously. Remember to keep the respective servers running while you develop and test your application.
