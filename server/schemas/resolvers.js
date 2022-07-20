const { AuthenticationError } = require('apollo-server-express');
const { Users, Tags, Comments } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    // Queries
    Query: {

        // Find a user
        user: async (parent, args, context) => {
            if (context.user) {
              const user = await Users.findById(context.user.id);
      
              return user;
            }
        },

        // Get all tags
        tags: async () => Tags.find(),

        // Find a tag
        tag: async (parent, { _id }) => {
            const tag = await Tags.findById(_id);

            return tag
        },

        // Get all comments
        comments: async () => Comments.find(),

        // Get a comment
        comment: async (parent, { _id }) => {
            const comment = await Comments.findById(_id);

            return comment
        }

    },

    // Mutations
    Mutation: {

        // Add new user
        addUser: async (parent, args) => {
            const user = await Users.create(args);
            const token = signToken(user);
      
            return { token, user };
        },

        // Update user details
        updateUser: async (parent, args, context) => {
            if (context.user) {

                return Users.findByIdAndUpdate(context.user.id, args, { new: true });

            }
        },

        // Remove a user
        removeUser: async (parent, args, context) => {
            if (context.user) {

                return Users.findByIdAndDelete(context.user.id)

            }
        },

        login: async (parent, { username, password }) => {
            const user = await Users.findOne({ username });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },

        // Add a new tag
        addTag: async (parent, args, context) => {
            if (context.user) {
                const tag = new Tags({ ...args });

                await Users.findByIdAndUpdate(context.user.id, {
                    $push: { tags: tag },
                });

                return tag;
            }
            
            throw new AuthenticationError('Not logged in');
        },

        // Remove a tag
        removeTag: async (parent, args, context) => {
            if (context.user) {

                return Tags.findByIdAndDelete(args._id)

            }
        },

        // Update existing tag
        updateTag: async (parent, args, context) => {
            if (context.user) {

                return Tags.findByIdAndUpdate(args._id, args, { new: true });

            }
        },

        // Add a new comment
        addComment: async (parent, args, context) => {
            if (context.user) {
                const comment = new Comments(args.description);

                await Tags.findByIdAndUpdate(args._id, {
                    $push: { comments: comment },
                });

                return comment
            }
        },

        // Remove a comment
        removeComment: async (parent, args, context) => {
            if (context.user) {

                return Comments.findByIdAndDelete(args._id)

            }
        },
    }
};

module.exports = resolvers;

