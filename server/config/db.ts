import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      autoIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

mongoose.plugin((schema: { pre: (arg0: string, arg1: any) => void }) => {
  schema.pre("findOneAndUpdate", setRunValidators);
  schema.pre("updateMany", setRunValidators);
  schema.pre("updateOne", setRunValidators);
  schema.pre("update", setRunValidators);
});

function setRunValidators(this: any) {
  this.setOptions({ runValidators: true });
}

export default connectDB;
