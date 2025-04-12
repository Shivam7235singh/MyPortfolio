# 🌐 MERN Stack Portfolio Website

A dynamic and responsive portfolio website built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) to showcase projects, skills, and experiences. This website includes **interactive 3D elements using Three.js**, **Cloudinary** for media uploads, and **Mailtrain** integration for email subscriptions — providing a seamless and engaging user experience.

---

## 🔧 Tech Stack

- **Frontend**: React.js, Tailwind CSS / Styled Components
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **3D Graphics**: Three.js
- **Media Hosting**: Cloudinary
- **Email Subscriptions**: Mailtrain

---

## 🚀 Features

- Dynamic project and blog management
- Fully responsive design
- Three.js 3D interactive elements
- Secure media uploads via Cloudinary
- Newsletter/email subscription via Mailtrain
- Admin functionality (optional)
- Clean and modern UI

---

## 📁 Project Structure

📦 root/ ├── 📂 client/ # React frontend ├── 📂 server/ # Express backend ├── 📂 models/ # Mongoose schemas ├── 📂 routes/ # API endpoints ├── 📂 controllers/ # Request handlers ├── 📂 utils/ # Utility files ├── .env # Environment variables └── README.md # Project documentation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shivam7235singh/MyPortfolio.git
   cd MyPortfolio
Configure Environment Variables

Create .env files in both /client and /server directories and add:

MongoDB URI

Cloudinary credentials

Mailtrain API keys

Install Dependencies

bash
Copy
Edit
cd client && npm install
cd ../server && npm install
Run the Application

bash
Copy
Edit
# In /server
npm run dev

# In /client (new terminal)
npm start
📌 Future Enhancements
Admin dashboard for project/blog management

Resume PDF viewer & download feature

Dark/light theme toggle

Animated transitions using Framer Motion

✨ Live Demo
🔗 Live Portfolio

🤝 Contributing
Contributions are welcome!
Feel free to fork this repository and open a pull request with improvements or fixes.

📄 License
This project is licensed under the MIT License.
