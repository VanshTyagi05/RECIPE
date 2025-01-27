import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.js"
import { Subscription } from "../models/subscription.js"
import { asyncHandler } from "../utilities/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
// Import all exports from auth.middleware.js
import * as AuthMiddleware from "../middlewares/auth.middleware.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.query;
    const authorId = req.user._id;
  
    try {
      // Check if subscription already exists
      const SubscriptionExistOrNot = await Subscription.findOne({
        subscriber: authorId,
        channel: channelId
      });
  
      if (!SubscriptionExistOrNot) {
        // If subscription does not exist, create a new subscription
        await Subscription.create({
          subscriber: authorId,
          channel: channelId
        });
  
        return res.status(201).json(new ApiResponse(201, "Successfully subscribed"));
      } else {
        // If subscription exists, delete it (unsubscribe)
        await Subscription.deleteOne({
          subscriber: authorId,
          channel: channelId
        });
  
        return res.status(200).json(new ApiResponse(200, "Successfully unsubscribed"));
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      throw new ApiError(500, "error");
    }
  });


//
  const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    // const subscriberCount = await Subscription.countDocuments({ channel: channelId });
    // console.log(subscriberCount); // Log the count for debugging
    const subscriberCount= 699

    // Return the subscriber count as a response
    res.status(200).json({ subscriberCount });
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    // console.log(subscriberId)
   
    
    // const subscribedToCount = await Subscription.countDocuments({ subscriber: subscriberId });
      //  console.log(subscribedToCount);
     const subscribedToCount = 69
      res.status(200).json({subscribedToCount });

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}