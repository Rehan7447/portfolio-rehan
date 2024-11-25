import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import discord from "../../Assets/Projects/discord.png";
import books from "../../Assets/Projects/books.jpg";
import flower from "../../Assets/Projects/image_flower.png";
import gemini from "../../Assets/Projects/gemini.png";
import bank from "../../Assets/Projects/image_bank.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={flower}
              isBlog={false}
              title="Flower Shop"
              description="A beautifully designed website offers a seamless experience for browsing, selecting, and purchasing stunning flower arrangements for every occasion. Whether you're celebrating a birthday, anniversary, or just want to brighten someone's day, with a wide variety of bouquets and floral decorations to suit your needs."
              demoLink="https://flower-shop-syed.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bank}
              isBlog={false}
              title="Auto Bank"
              description="Auto Bank is an advanced banking platform built with the MERN stack and Flask, integrating AI, ML, and OCR technologies to revolutionize cheque-based transactions. This innovative solution allows users to scan and process cheques digitally, enabling secure and seamless fund transfers while offering comprehensive banking services. With a focus on efficiency and cutting-edge technology, Auto Bank showcases the potential of modern tools to transform traditional banking systems."
              demoLink="https://auto-bank.herokuapp.com/login"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={books}
              isBlog={false}
              title="Book Store"
              description="Online Bookstore is a dynamic e-commerce platform developed using the MERN stack, offering a seamless experience for book enthusiasts. It features a robust catalog system, secure user authentication, and efficient checkout processes. With intelligent search and filtering powered by AI and ML, the platform ensures personalized recommendations, enhancing the user experience. Perfect for browsing, purchasing, and discovering books online."
              ghLink="https://github.com/Rehan7447/bookstore-cody"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={discord}
              isBlog={false}
              title="Discord Social Ranking and LeaderBoard"
              description="Discord Social Ranking and Leaderboard is an innovative system designed for Discord servers, enabling dynamic ranking and leaderboard features tailored to server games. Built with modern javascript frameworks it shows player activity, performance, and engagement, generating real-time rankings and rewarding top performers. This feature-rich tool enhances community interaction, competitiveness, and user engagement within gaming servers."
              ghLink="https://github.com/Rehan7447/Social-website-discord"
              demoLink="https://rehan7447.github.io/Social-website-discord/welcome.html"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={gemini}
              isBlog={false}
              title="Health Care App"
              description="A demo of an app I built for a client. The app focuses on woman health care and addresses their various health needs. Including massage, therapy, couple therapy and relationship advices"
              demoLink="https://rehan7447.github.io/milanLee-woman-healthcare/"
            />
          </Col>

          {/* <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here
            />
          </Col> */}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
