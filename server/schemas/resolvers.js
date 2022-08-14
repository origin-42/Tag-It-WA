const { AuthenticationError } = require('apollo-server-express');
const { Users, Tags, Comments } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // Queries
    Query: {

        // Find a user
        user: async (parent, args, context) => {
           
            if (context.user) {
              const user = await Users.findById(context.user._id).populate('tags').populate('comments');
                
              return user;
            }
        },

        queryAUser: async (parent, { _id }) => {
            
            if (_id) {
                const user = Users.findById(_id).populate('tags').populate('comments');

                return user
            }

            return

        },

        // Get all tags
        tags: async () => Tags.find().populate('user').populate({ path: 'comments', populate: { path: "user", model: "Users" } }),

        // Find a tag
        tag: async (parent, { _id }) => {

            try {

                const tag = await Tags.findById(_id).populate('user').populate({
                    path: 'comments',
                    populate: {
                        path: 'user',
                        model: 'Users'
                    }
                });
              
                return tag

            } catch (err) {
                console.log(err)
            }

        },

        getAllTags: async (parent, args) => {
            try {
                const userData = await Users.find().populate('tags').populate({
                    path: 'tags',
                    populate: {
                        path: 'user',
                        model: 'Users'
                    }
                });
      
                return userData;
            } catch(err) {
                console.log(err)
            }
            
        },

        getCriteria: async (parent, { criteria }) => {

            const subString = criteria[0].toUpperCase() + criteria.substring(1);

            const tags = await Tags.find({ criteria: subString }).populate('comments').populate('user')
 
            return tags
        },

        // Get all comments
        comments: async () => Comments.find().populate('user').populate('tag'),

        // Get a comment
        comment: async (parent, { _id }) => {
            const comment = await Comments.findById(_id).populate('tag').populate('user')

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

                return Users.findByIdAndDelete(context.user._id)

            }
        },

        login: async (parent, { username, password }) => {
            const user = await Users.findOne({ username }).populate('tags').populate('comments');
    
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
                const unbase = args.image;
                args.image = ""
                console.log(unbase)

                const user = await Users.findById(context.user._id)
                args.user = user._id
          
                const tag = await Tags.create(args);

                await Users.findByIdAndUpdate(context.user._id, {
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
                const updateTag = await Tags.findByIdAndUpdate(args._id, args, { new: true });
                
                return updateTag
            }
        },

        // Add a new comment
        addComment: async (parent, args, context) => {

            if (context.user) {
                const newComment = {
                    description: args.description,
                    user: context.user._id,
                    tag: args._id,
                    repliedUser: args.repliedUser || null,
                    date: Date.now()
                }
               
                const createdComment = await Comments.create(newComment);
              
                await Tags.findByIdAndUpdate(args._id, {
                    $push: { comments: createdComment }
                });
                await Users.findByIdAndUpdate(context.user._id, {
                    $push: { comments: createdComment }
                });
                const updatedTag = await Tags.findById(args._id).populate('comments').populate('user');
             
                return updatedTag
            }

            return
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

