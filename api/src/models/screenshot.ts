import mongoose from 'mongoose';

const { Schema } = mongoose;

interface ScreenshotAttrs {}

interface ScreenshotDoc extends mongoose.Document {
  cloudinary_id: string;
  cloudinary_url: string;
  cloudinary_version: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
}
interface ScreenshotModel extends mongoose.Model<ScreenshotDoc> {
  build(attrs: ScreenshotAttrs): ScreenshotDoc;
}

const screenshotSchema = new mongoose.Schema(
  {
    cloudinary_id: { type: String },
    cloudinary_url: { type: String },
    cloudinary_version: { type: String },
    width: { type: Number },
    height: { type: Number },
    bytes: { type: Number },
    format: { type: String },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

screenshotSchema.statics.build = (attrs: ScreenshotAttrs) => {
  return new Screenshot(attrs);
};

const Screenshot = mongoose.model<ScreenshotDoc, ScreenshotModel>(
  'Screenshot',
  screenshotSchema
);

export { Screenshot };
