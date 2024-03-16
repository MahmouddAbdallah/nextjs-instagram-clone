
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp'
export default async function uploadImage(file: File) {
    cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const resizedBuffer = await sharp(buffer)
        .resize({ width: 1024, height: 1024 }) // Resize to 1024x1024
        .toBuffer();

    const url = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            folder: 'NextJs',
        },
            function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                if (result) {
                    resolve(result.url);
                }
            }
        ).end(resizedBuffer)
    })
    return url
}