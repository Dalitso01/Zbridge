import React, { useState } from "react";

const TaskSubmission = () => {
  const [task, setTask] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send this to Firestore with user/internship info
    setSubmitted(true);
  };

  return (
    <div>
      <h2>Submit Your Internship Task</h2>
      {submitted ? (
        <p>Task submitted! Thank you.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Describe your work or paste a link to your project"
            required
            rows={5}
            style={{ width: "100%" }}
          />
          <br />
          <button type="submit">Submit Task</button>
        </form>
      )}
    </div>
  );
};

export default TaskSubmission;