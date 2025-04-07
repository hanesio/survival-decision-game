import mongoose from "mongoose"

const singleSchema = mongoose.Schema(
    {
        id: {
        type:Number,
        required:true
        },
  username: {
        type:String,
        required:true
        },
  items: {
    type: [{
      description: String, 
      explanation: String, 
      rank: Number
      }],
    required:true
    },
  sessionId:{
          type:Number,
          required:true
          },
  groupId: {
      type:Number,
      required:false
      },
  result: {
      type:Number,
      required:true
      }
    }
);

const Single = mongoose.model('singles', singleSchema);
export default Single;

