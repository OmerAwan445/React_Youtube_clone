import React, { useEffect, useState } from 'react';

const VideoDescription: React.FC<{ videoDescription: string }> = ({ videoDescription }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleDescriptionClick = () => {
    setExpanded(true);
  };

  useEffect(() => {
    const descriptionElement = document.querySelector('.video-description');

    if (descriptionElement) {
      descriptionElement.addEventListener('click', handleDescriptionClick);
    }

    return () => {
      if (descriptionElement) {
        descriptionElement.removeEventListener('click', handleDescriptionClick);
      }
    };
  }, []);

  const formatText = (text: string) => {
    const linkedText = text.replace(
      /(https:\/\/\S+)/g,
      (url) => `<a href="${url}" class="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">${url}</a>`
    );

    const formattedText = linkedText.replace(/\n/g, '<br/>');
    return formattedText;
  };

  const formattedVideoDescription = formatText(videoDescription);

  return (
    <div
      className={`video-description p-4 rounded-xl bg-slate-800 hover:bg-slate-700 ${
        expanded ? 'rounded-lg max-h-none overflow-visible' : 'max-h-28 overflow-hidden cursor-pointer'
      }`}
    >
      <p dangerouslySetInnerHTML={{ __html: formattedVideoDescription }} className="mb-4"></p>
      {expanded && <button className="p-1 text-gray-300 cursor-pointer" onClick={toggleExpanded}>
        Show Less
      </button>}
    </div>
  );
};

export default VideoDescription;
