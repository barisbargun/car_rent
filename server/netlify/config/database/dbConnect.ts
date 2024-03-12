import mongoose from "mongoose";

const dbConnect = async () => {
    mongoose.set("strictQuery", true);
    mongoose.set('toJSON', {
        virtuals: true,
        transform: (doc, converted) => {
            delete converted._id;
        }
    });
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: "car_rent"
        });

    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;