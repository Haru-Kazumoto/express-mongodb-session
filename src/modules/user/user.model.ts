import mongoose, { PassportLocalDocument, PassportLocalModel }  from "mongoose";
import bcrypt from "bcrypt";
import passportLocalMongoose from "passport-local-mongoose";

export interface UserInput {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, select: false},
    }
);

userSchema.plugin(passportLocalMongoose);

//Exclude password
userSchema.set('toJSON', {
    transform: function(doc,ret,options) {
        delete ret.password;

        return ret;
    }
})

/**
 * It will hashing the password before the user object saved
 * 
 * @param next
 * @return next
 */
userSchema.pre("save", async function(next) {
    let user = this as UserDocument;

    if(!user.isModified("password")){
        return next();
    } 

    const doHash = bcrypt.hashSync(user.password, 15);

    user.password = doHash;

    return next();
});

/**
 * 
 * @param candidatePassword 
 * @returns Promise<booelan>
 */
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean>{
    const user = this as UserDocument;

    return await bcrypt.compare(candidatePassword, user.password).catch(
        () => false
    );
}

export const User = mongoose.model<UserDocument>("Users", userSchema);