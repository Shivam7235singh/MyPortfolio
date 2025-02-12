import { Button, Typography } from "@mui/material";
import React from "react";
import "./Projects.css";
import { AiOutlineProject } from "react-icons/ai";
import { Delete } from "@mui/icons-material";
import { FaRegSmileWink } from "react-icons/fa";
import { deleteProject, getUser } from "../../actions/user";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export const ProjectCard = ({
  url,
  projectImage,
  projectTitle,
  description,
  technologies,
  isAdmin = false,
  id,
}) => {
  const dispatch = useDispatch();

  // Memoized delete handler
  const deleteHandler = useCallback(async () => {
    try {
      console.log("Deleting project with ID:", id);
      await dispatch(deleteProject(id));
      await dispatch(getUser());
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }, [dispatch, id]);

  return (
    <div className="projectCard">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className="projectImageWrapper">
          <img
            src={projectImage || "/fallback-image.jpg"}
            alt={projectTitle || "Project Image"}
          />
          <Typography variant="h5" component="h3">
            {projectTitle}
          </Typography>
        </div>
        <div className="projectDetails">
          <Typography variant="h4" component="h2">
            About Project
          </Typography>
          <Typography component="p">{description}</Typography>
          <Typography variant="h6" component="p">
            Tech Stack: {technologies}
          </Typography>
        </div>
      </a>
      {isAdmin && (
        <Button className="adminButton" onClick={deleteHandler}>
          <Delete />
        </Button>
      )}

    </div>
  );
};
const Projects = ({ projects }) => {
  return (
    <div className="projects">
      <Typography variant="h3">
        Projects <AiOutlineProject />
      </Typography>

      <div className="projectsWrapper">
        {projects?.length > 0 ? (
          projects.map((item) => (
            <ProjectCard
              key={item._id} // Unique key for React
              id={item._id}
              url={item.url}
              projectImage={item.image.url} // Correctly access nested property
              projectTitle={item.title}
              description={item.description}
              technologies={item.techStack}
              isAdmin={item.isAdmin || false} // Default to false if undefined
            />
          ))
        ) : (
          <p>No projects found</p>
        )
        (<Typography>No projects found</Typography>
        )}
      </div>

      <Typography variant="h3" style={{ font: "100 1.2rem 'Ubuntu Mono'" }}>
        All The Projects Shown Above Are Made By Me <FaRegSmileWink />
      </Typography>
    </div>
  );
};

export default Projects;
