import multer from 'multer';
import jimp from 'jimp';

const imageUploadOptions = {
    storage: multer.memoryStorage(),
    limits: {
        //to 3 megabajta
        filesize: 1024 * 1024 * 3
    },
    fileFilter: (req, file, next) => {
        if (file.mimetype.startsWith('image/')) {
            //null- opcije, true- da li je slika?
            next(null, true);
        } else {
            next(null, false);
        }
    }
}
export const uploadImage = multer(imageUploadOptions).single('image');

export const resizeImage = async (req, res) => {
    if (req.file) {
        //multer automatski stavlje req.file
        //posto ide image/vrsta slike(jpg, png...);
        const extension = req.file.mimetype.split('/')[1];
        const imagePath = `/static/uploads/${Date.now()}.${extension}`;
        req.body.image = imagePath;
        const image = await jimp.read(req.file.buffer);
        await image.resize(850, jimp.AUTO);
        await image.write(`./${req.body.image}`);
        res.json({ image: imagePath });
    }
};