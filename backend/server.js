// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const session = require('express-session');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const errorHandler = require('./middlewares/errorHandler');

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:5174'],
//   credentials: true
// }));

// app.use(express.json());
// connectDB();

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { 
//     secure: process.env.NODE_ENV === 'production', 
//     httpOnly: true,
//     maxAge: 7 * 24 * 60 * 60 * 1000 
//   }
// }));

// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');

// Charger les variables d'environnement avant tout
dotenv.config();

// Import des modules qui utilisent process.env
// const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Initialiser l'application Express
const app = express();

const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database Connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};
// Connexion à la base de données APRÈS avoir chargé les variables d'environnement
connectDb();

// CORS : autorise frontend (Vite) à faire des requêtes vers l'API
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

// Body parser
app.use(express.json());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-not-for-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
  }
}));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));