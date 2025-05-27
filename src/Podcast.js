import React from "react";

const podcastEpisodes = [
  {
    id: 1,
    title: "The Rise of Zambian Tech",
    guest: "Chipo Mwansa",
    description: "Chipo shares her journey from student to CTO.",
    audioUrl: "https://www.example.com/audio1.mp3"
  },
  {
    id: 2,
    title: "Finance in Africa",
    guest: "John Banda",
    description: "John discusses the future of finance in Zambia.",
    audioUrl: "https://www.example.com/audio2.mp3"
  }
];

const Podcast = () => (
  <div>
    <h2>Making of an Industry Giant: Podcast</h2>
    {podcastEpisodes.map((ep) => (
      <div key={ep.id} style={{ marginBottom: "2em" }}>
        <h3>{ep.title}</h3>
        <p>
          <strong>Guest:</strong> {ep.guest}
        </p>
        <p>{ep.description}</p>
        <audio controls src={ep.audioUrl} style={{ width: "100%" }}>
          Your browser does not support the audio element.
        </audio>
      </div>
    ))}
  </div>
);

export default Podcast;