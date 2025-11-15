# Doctour Booking App

Doctour Booking App is a full‑stack doctor appointment booking platform. Patients can browse doctors by speciality, book appointments, manage their profile, and pay online. Admins can manage doctors and view appointments. Doctors can view their schedules and update their profile.

## Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT
- File Storage: Cloudinary (images)
- Payments: Flutterwave
- Frontend: React (Vite), TailwindCSS
- Hosting: Render (backend and frontend)

## Live URLs
- Frontend: https://doctour-booking-app-frontend.onrender.com
- Backend: https://doctour-booking-app-backend.onrender.com

## Features
- User registration and login (JWT)
- Browse doctors and view profiles
- Book and cancel appointments
- Online payment via Flutterwave
- Appointment history and status (paid, completed, cancelled)
- Admin dashboard to add/update doctors and list all appointments
- Doctor dashboard to view appointments and edit profile

## Demo Admin (Read-Only, Simulated Writes)
- Email: `demo-admin@doctour.app`
- Password: `123456789`
- Role: `demo_admin`

Behavior:
- Can sign in and view the admin panel
- All write operations (POST/PATCH/DELETE) return `success: true` with message “Demo Mode: simulated success. Changes not saved.”
- Real data is not modified

Seeded demo data is available (doctors, appointments, and patients) so reviewers can explore the UI.

## Getting Started (Local)
1. Clone the repo and install dependencies
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
2. Run backend
   - `cd backend && npm run dev` or `node server.js`
3. Run frontend
   - `cd frontend && npm run dev`

Note: In production, the frontend is configured to call the backend at `https://doctour-booking-app.onrender.com`.

## Demo Flow and Test Accounts
- To fully test the app’s appointment lifecycle, please use the following:
  - Book an appointment with doctor “Zoe Kelly”
  - Then login as doctor using:
    - Email: `ZKelly@gmail.com`
    - Password: `123456789`
  - As the doctor, you can mark the appointment as “Completed” or “Cancel” it to confirm the flow.

## Limitations / Known Issues
- Users can currently pay for appointments whose dates have already passed. This will be fixed by validating slot date/time before enabling payment and on the server during verification.
- Payments require Flutterwave keys; on local without keys, payment endpoints are disabled.
- Minimal input validation on some forms; further hardening planned.
- Basic CORS setup is restricted to the deployed frontend; adjust if using other domains.

## API Overview
- Base URLs (frontend config):
  - User: `/api/user`
  - Admin: `/api/admin`
  - Doctor: `/api/doctor`
  - Appointments: `/api/appointment`
  - Payments: `/api/payments`
  - General (public data): `/api/doctourApp/general`

Common endpoints:
- User
  - `POST /api/user/user-registration`
  - `POST /api/user/user-login`
  - `GET /api/user/get-user` (auth)
  - `PATCH /api/user/update-user` (auth, multipart)
  - `POST /api/user/book-appointment` (auth)
  - `POST /api/user/cancel-appointment` (auth)
- Admin
  - `POST /api/admin/admin-login`
  - `POST /api/admin/add-doctor` (auth, multipart)
  - `PATCH /api/admin/update-doctor/:id` (auth, multipart)
- Doctor
  - `POST /api/doctor/doctor-login`
  - `GET /api/doctor/doctor-appointments` (auth)
  - `GET /api/doctor/doctor-profile` (auth)
  - `PATCH /api/doctor/update-doctor-profile` (auth)
- Appointments
  - `GET /api/appointment/my-appointments` (auth)
  - `GET /api/appointment/all-appointments` (auth)
  - `POST /api/appointment/complete-appointment` (auth)
- Payments
  - `POST /api/payments/initiate-payment` (auth)
  - `GET /api/payments/verify/:transactionId` (auth)

## Inspiration and Credits
This project draws significant inspiration from the GreatStack tutorial on building a doctor appointment app. I did not follow it word-for-word; I adapted the flow, reworked parts of the UI, and added several features and integrations to suit my needs.

Original tutorial features (credit: GreatStack):
- Three levels of authentication: patient, doctor, admin
- Patient features: account creation, browse/filter doctors by speciality, view doctor details, book appointments with date/time slots, cancel appointments, and online payment integration
- Doctor features: dashboard with earnings, appointments; mark appointments completed/cancelled; update profile
- Admin features: manage doctor profiles and appointments via an admin dashboard
- Additional features: payment gateway integration (Stripe, Razorpay), speciality filtering, related doctor suggestions, status tracking

You can find GreatStack’s work here: `https://www.youtube.com/@GreatStackDev` (all credit for the base idea and guidance goes to GreatStack).

## My Contributions and Differences
Compared to the tutorial, I implemented and/or changed the following:
- Switched online payments to Flutterwave integration and wired frontend verification flow
- Admins can update a doctor’s details including image, speciality, experience, and about
- Doctors can update their own account/profile (address, about), with normalized address handling
- Production-ready URL configuration for frontend/backed deployments on Render
- Navigation and UX improvements (e.g., click-to-toggle user menu usable on mobile, dropdown icon toggles up/down)
- Additional validation and error handling in several controllers and route guards

## License
MIT
