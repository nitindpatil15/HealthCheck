# Health Metrics Dashboard

This is a full-stack(MERN) application that allows users to manage health records, including adding, viewing, updating, and deleting records. The app also provides search functionality to filter records based on the date or specific health metrics like heart rate.

## Features

### Frontend (React):
1. **Dashboard**:
   - Lists all recorded health metrics.
   - Displays:
     - Date of the record.
     - Body temperature.
     - Blood pressure (systolic/diastolic).
     - Heart rate.
   - Allows users to edit or delete each entry. (Only Logged User can View)

2. **Add Health Record Form**:(Only Logged User can Add)
   - A form to add new health records with fields for:
     - Date.
     - Body temperature (Celsius or Fahrenheit).
     - Blood pressure (systolic/diastolic).
     - Heart rate (BPM).
   - A "Submit" button to save the record.

3. **Health Record Detail Page**:
   - Clicking on a record opens a page or modal showing detailed metrics and Logged User will get options to edit or delete the record.

4. **Search Functionality**:
   - Users can search for records by date or filter by health metrics (e.g., heart rate above a certain threshold).
   - Auto-search is implemented for instant filtering as the user types.

### Backend (Node.js & Express):
1. **API Endpoints**:
   - `POST /health-records`: Create a new health record.
   - `GET /health-records`: Retrieve all health records.
   - `GET /health-records/:id`: Retrieve a specific health record by ID.
   - `PUT /health-records/:id`: Update a health record.
   - `DELETE /health-records/:id`: Delete a health record.

2. **Database**:
   - **MongoDB** is used to store health records.
   - Each health record includes:
     - Patient Name
     - Date.
     - Body temperature.
     - Blood pressure (systolic/diastolic).
     - Heart rate.
     - Created and updated timestamps (auto-generated).

## Technologies Used

### Frontend:
- React.js with functional components and hooks (`useState`, `useEffect`).
- Axios for HTTP requests.
- React Router for navigation.
- TailwindCss fro Design
  
### Backend:
- Node.js with Express.js framework.
- MongoDB for database storage (with Mongoose ORM for MongoDB).
  
### Deployment:
- **Client**: https://health-check-swart.vercel.app (Vercel)
- **Server**: https://healthcheck-cvuf.onrender.com (Render)

## Note for Users
If you're not seeing the latest data after performing an operation (such as adding, updating, or deleting a record), please **refresh the page**. This is because the server is hosted on Render, which may occasionally cause a brief delay (up to a minute) in processing requests or waking up the server from an idle state.
We appreciate your patience and understanding!


