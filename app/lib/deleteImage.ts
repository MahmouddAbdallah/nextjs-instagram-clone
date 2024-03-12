import { v2 as cloudinary } from 'cloudinary';


export default async function deleteImage(url: string) {
    try {
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
        // console.log(url);
        // const publicId = cloudinary.url(url)
        // console.log(publicId.);
        const h = url.split('/')
        const public_Id = h[h.length - 2] + "/" + h[h.length - 1].split('.')[0]
        const data = await cloudinary.uploader.destroy(public_Id)
        if (data.result == 'ok')
            return true
        else return false
    } catch (error) {
        return false;
    }
}