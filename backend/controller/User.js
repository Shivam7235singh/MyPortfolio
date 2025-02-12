import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../middlewares/sendMail.js";
import cloudinary from "cloudinary";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged In Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    // Fetch a user from the database and exclude sensitive fields
    const user = await User.findOne().select("-password -email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const userMessage = `Hey, I am ${name}. My email is ${email}. My message is ${message}.`;

    await sendMail(userMessage);

    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, password, skills, about } = req.body;

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    if (skills) {
      for (let i = 1; i <= 6; i++) {
        const imageKey = `image${i}`;

        let imageUrl;
        if (typeof skills[imageKey] === "string") {
          imageUrl = skills[imageKey]; // image is already a URL
        } else if (skills[imageKey] && skills[imageKey].url) {
          imageUrl = skills[imageKey].url; // image object contains URL
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid image format",
          });
        }

        if (imageUrl) {
          await cloudinary.v2.uploader.destroy(user.imageUrl.public_id);
          
          const myCloud = await cloudinary.v2.uploader.upload(imageUrl, {
            folder: "portfolio",
          });
    
          user.skills[imageKey] = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
          }
        }
     }
    
    if (about) {
      
      const {quote, avatar, name, title, subtitle, description} = about;
      if (name) {
        user.about.name = name;
      }
      if (about.title) {
        user.about.title = title;
      }
      if (about.subtitle) {
        user.about.subtitle = subtitle;
      }

      if (about.description) {
        user.about.description = description;
      }
      if (about.quote) {
        user.about.quote = quote;
      }

      if (avatar) {

        let imageUrl;
        if (typeof avatar === "string") {
          imageUrl = avatar; // image is already a URL
        } else if (avatar && avatar.url) {
          imageUrl = avatar.url; // image object contains URL
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid image format",
          });
        }
        
        await cloudinary.v2.uploader.destroy(user.imageUrl.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(imageUrl, {
          folder: "portfolio",
        });

        user.about.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addTimeline = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const user = await User.findById(req.user._id);

    user.timeline.unshift({
      title,
      description,
      date,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Timline",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addProject = async (req, res) => {
  try {
    const { url, title, image, description, techStack } = req.body;

    // Ensure image is a string (URL)
    let imageUrl;
    if (typeof image === "string") {
      imageUrl = image; // image is already a URL
    } else if (image && image.url) {
      imageUrl = image.url; // image object contains URL
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid image format",
      });
    }

    // Upload image to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(imageUrl, {
      folder: "portfolio",
    });

    // Get the user from the database
    const user = await User.findById(req.user._id);

    // Add the new project to the user's project list
    user.projects.unshift({
      url,
      title,
      description,
      techStack,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    // Save the updated user document
    await user.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Project added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    user.timeline = user.timeline.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Timline",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const project = user.projects.find((item) => item._id == id);

    await cloudinary.v2.uploader.destroy(project.image.public_id);

    user.projects = user.projects.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
