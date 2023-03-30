const allowedOrigins = ["http://localhost:5173/"];

// const verifyOrigin = (origin) => {
//   const mainDomain = "yourdomain.com";
//   if (origin === "http://localhost:3000") {
//     return true;
//   } else {
//     if (origin?.includes(mainDomain)) {
//       return true;
//     }
//     return false;
//   }
// };

// // module.exports = verifyOrigin;

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
  methods: "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
    "content-disposition", //this will allow the client to access the content-disposition header
    "Content-Security-Policy-Report-Only", //this will allow content length
    "Content-Disposition",
  ],
};

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", origin);
    //alow preflight requests
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    //set the max age of the preflight request for an hour which is equal to 3600 seconds
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //set the allowed origins
    res.setHeader("Access-Control-Allow-Origin", origin);

    // allow the client to access the content-disposition header
    res.setHeader("Access-Control-Expose-Headers", "content-disposition");
    res.setHeader(
      "Access-Control-Expose-Headers",
      "Content-Security-Policy-Report-Only"
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

    // //set the allowed methods
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    //pass cookies
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE", "PATCH", "OPTIONS");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
    );
  }
  next();
};

module.exports = { corsOptions, credentials };
