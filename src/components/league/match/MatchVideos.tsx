import { Video } from 'lucide-react';
import { MatchInterface } from '../../../utils/types';

interface MatchVideosProps {
  match: MatchInterface;
}

export default function MatchVideos({ match }: MatchVideosProps) {
  // Parse video URLs from the string (assuming comma-separated URLs)
  const videoUrls = match.videosUrls
    ? match.videosUrls.split(',').map((url) => url.trim())
    : [];

  // Function to extract YouTube video ID from URL
  const getYoutubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div>
      <h3 className="text-xl font-display font-semibold text-brand-700 mb-6 flex items-center gap-2">
        <Video className="w-5 h-5 text-court-500" />
        Match Videos
      </h3>

      {videoUrls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoUrls.map((url: string, index: number) => {
            const videoId = getYoutubeVideoId(url);

            if (videoId) {
              return (
                <div
                  key={index}
                  className="bg-brand-50 rounded-lg overflow-hidden"
                >
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`Match Video ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-brand-700">
                      Match Highlight {index + 1}
                    </h4>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="bg-brand-50 rounded-lg p-4">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-court-500 hover:text-court-400 flex items-center gap-2"
                  >
                    <Video className="w-5 h-5" />
                    <span>Watch Video {index + 1}</span>
                  </a>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div className="text-center py-8 bg-brand-50 rounded-lg">
          <p className="text-brand-400">No videos available for this match.</p>
        </div>
      )}
    </div>
  );
}
