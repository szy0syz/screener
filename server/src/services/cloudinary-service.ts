import cloudinary from "cloudinary";

class CloudinaryService {
  private _cloudinary?: any;

  get client() {
    if (!this._cloudinary) {
      throw new Error("Cannot access Cloudinary client before connecting");
    }
    return this._cloudinary;
  }

  connect() {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error("process.env.CLOUDINARY_CLOUD_NAME muse be defined");
    }
    if (!process.env.CLOUDINARY_API_KEY) {
      throw new Error("process.env.CLOUDINARY_API_KEY muse be defined");
    }
    if (!process.env.CLOUDINARY_API_SECRET) {
      throw new Error("process.env.CLOUDINARY_API_SECRET muse be defined");
    }

    this._cloudinary = cloudinary.v2;

    this._cloudinary.confit({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
  }
}

export const cloudinaryService = new CloudinaryService();
