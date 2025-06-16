import React, { useState } from "react";
import { motion } from "framer-motion";

const GuideAvatar = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Define animation variants
  const animationVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.1 },
    idle: {
      y: [0, -10, 0], // Bouncing effect
      transition: { repeat: Infinity, duration: 2 },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={animationVariants}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        textAlign: "center",
        cursor: "pointer",
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Avatar Image */}
      <motion.img
        src="https://i.imgur.com/nbApXar.png" // Direct link to the avatar image
        alt="Guide Avatar"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        animate="idle"
        variants={animationVariants}
      />
      <p style={{ color: "#fff", fontWeight: "bold", marginTop: "0.5rem" }}>
        Your Guide
      </p>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            bottom: "180px",
            right: "0",
            background: "#1a237e",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            fontSize: "0.9rem",
          }}
        >
          Welcome to ZBRIDGE! I'm here to guide you through this amazing journey.
        </motion.div>
      )}
    </motion.div>
  );
};

export default GuideAvatar;