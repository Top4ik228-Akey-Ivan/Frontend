import React, { useMemo } from "react";
import ProjectCard from "../components/projectCard";
import { projectsData } from "../data/projectsInfo";
import { StyledProjects } from "../App";
import { StyledH1, StyledSpan } from "./home";
import { StyledLink } from "../components/header";

export const Projects = () => {
    const memoizedProjectCards = useMemo(() => {
        return projectsData.map((project) => (
            <StyledLink to={project.title} style={{ border: "none" }} key={project.title}>
                <ProjectCard props={project} />
            </StyledLink>
        ));
    }, []); // Зависимость от projectsData

    return (
        <>
            <StyledH1>
                <StyledSpan>Projects</StyledSpan>
            </StyledH1>
            <StyledProjects>
                {memoizedProjectCards}
            </StyledProjects>
        </>
    );
};
