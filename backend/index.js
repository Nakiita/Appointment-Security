const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cors = require("cors");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const acceptMultimedia = require("connect-multiparty");
const colors = require('colors');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');
const logRequests = require('./middleware/loggerMiddleware');
const { setupCronJobs } = require("./middleware/cronjobs");
const helmet = require("helmet");
const fs = require('fs');

dotenv.config();

// MongoDB connection
connectDB();

// Express app initialization
const app = express();
app.use(morgan("dev"));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": [],
      },
    },
  }),
);

// Set up Redis client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379', // Ensure REDIS_URL is set for production
});

// Handle Redis errors
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
redisClient.connect().catch(console.error);

redisClient.on('connect', () => {
  console.log('Connected to Redis server'.green);
});

redisClient.on('end', () => {
  console.log('Redis client disconnected'.yellow);
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware for handling multimedia
app.use(acceptMultimedia());

// Set up scheduled tasks
setupCronJobs();

// CORS configuration
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));
app.set('view engine', 'ejs');

// Session configuration
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 5,
    sameSite: 'Strict'
  }
}));

// Accepting JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequests);

// Test route
app.get("/", (req, res) => {
  req.session.isAuth = true;
  res.send("Hello from server");
});

// Routes
app.use("/api/user", require("./routes/user_routes"));
app.use("/api/doctor", require("./routes/admin_routes"));
app.use("/api/appointment", require("./routes/appointment_routes"));
app.use("/api/",require("./routes/log_routes"));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Define port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan.underline.bold);
});

module.exports = app;
