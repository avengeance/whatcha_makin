import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div
          className="social-media"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "30px",
            marginRight: "40px",
            marginLeft: "40px",
          }}
        >
          <a
            href="https://www.linkedin.com/in/calvin-le-442162140/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              textDecoration: "none",
              gap: "10px",
            }}
          >
            <p style={{ color: "#000000" }}>Owner's LinkedIn:</p>
            <i
              className="fab fa-linkedin"
              style={{ fontSize: "3rem", color: "#000000" }}
            ></i>
          </a>
          <a
            href="https://github.com/avengeance"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              textDecoration: "none",
              gap: "10px",
            }}
          >
            <p style={{ color: "#000000" }}>Project Owner:</p>
            <i
              className="fab fa-github"
              style={{ fontSize: "3rem", color: "#000000" }}
            ></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
