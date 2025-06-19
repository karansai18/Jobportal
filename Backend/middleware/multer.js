// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("profilePhoto");


import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const singleUpload = (req, res, next) => {
    upload.single("file")(req, res, (err) => {
        if (err) {
            console.log("Multer error:", err);
            return res.status(500).json({ message: "Multer error", error: err });
        }
        console.log("Multer received file:", req.file); // Debugging line
        next();
    });
};
