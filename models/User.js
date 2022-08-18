const { Schema, model } = require('mongoose');

//Regex function which validates email in text is set equal to validateEmail
const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, "Please fill with a valid email address"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                'Please fill a valid email address'
            ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                // self reference
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        toJSON: {
            virtuals: false,
        },
        id: false
    }
);

// virtual to count friends
userSchema.virtual('friendCount').get(function() {
    return `${this.friends.length}`;
});

const User = model('User', userSchema);

module.exports = User;