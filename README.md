# 🎟️ Event Registration System

A full-stack event management system with user authentication, event registration, and admin capabilities. Built with Node.js, Express, and MongoDB.

![System Architecture](https://i.imgur.com/JqQX6z0.png) *(Add your own diagram later)*

## ✨ Features

- ✅ **User Authentication** (JWT)
- 🎯 **Event Management** (Create/View/Register)
- 👥 **User Profiles** with registered events
- 🔐 **Role-Based Access** (Admin/User)
- 📅 **Date Management** for events

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Authentication:**
- JSON Web Tokens (JWT)
- Bcrypt password hashing


# 🔍 API Endpoints


Endpoint	Method	Description

/api/v1/auth/register	POST	User registration
/api/v1/auth/login	POST	User login
/api/v1/events	GET	List all events
/api/v1/events	POST	Create new event (Admin)
/api/v1/events/:id/register	POST	Register for event
