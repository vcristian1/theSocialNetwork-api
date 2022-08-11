const { Schema, model, Types } = require('mongoose');

// Reaction is a subdocument of Thought
const ReactionSchema = new Schema(
  {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
      },
      reactionBody: {
          type: String,
          required: true,
          maxlength: 280
      },
      username: {
          type: String,
          required: true
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
  },
  {
      toJSON: {
          virtuals: true,
          getters: true
      },   
  }
);

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
