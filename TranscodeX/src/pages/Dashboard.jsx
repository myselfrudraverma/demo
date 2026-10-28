import React, { useState, useEffect, useRef } from 'react';
import UploadPanel from '../components/processing/UploadPanel';
import ProcessingOptions from '../components/processing/ProcessingOptions';
import ProcessingPipeline from '../components/processing/ProcessingPipeline';
import RenditionProgress from '../components/processing/RenditionProgress';
import VideoOutput from '../components/processing/VideoOutput';
import { SAMPLE_VIDEOS } from '../data/mockData';

export default function Dashboard() {
  // Default to sample video so the prototype is immediately interactive
  const [selectedVideo, setSelectedVideo] = useState(SAMPLE_VIDEOS[0]);

  const [options, setOptions] = useState({
    qualities: ['360p', '720p', '1080p'],
    thumbnail: true,
    captions: true,
    outputFormat: 'hls'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [progressState, setProgressState] = useState({
    stage: 0, // 0: idle, 1: upload, 2: queued, 3: transcoding, 4: packaging, 5: ready
    overallProgress: 0,
    renditions: {
      '360p': { progress: 0, status: 'Queued', segments: '0/32' },
      '720p': { progress: 0, status: 'Queued', segments: '0/32' },
      '1080p': { progress: 0, status: 'Queued', segments: '0/32' }
    },
    thumbnailStatus: 'Queued',
    captionsStatus: 'Queued'
  });

  const timerRef = useRef(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStartProcessing = () => {
    if (!selectedVideo) return;

    setIsProcessing(true);
    setIsComplete(false);

    // Initial reset
    setProgressState({
      stage: 1, // Uploading
      overallProgress: 5,
      renditions: {
        '360p': { progress: 0, status: 'Queued', segments: '0/32' },
        '720p': { progress: 0, status: 'Queued', segments: '0/32' },
        '1080p': { progress: 0, status: 'Queued', segments: '0/32' }
      },
      thumbnailStatus: 'Queued',
      captionsStatus: 'Queued'
    });

    let currentStep = 0;
    const totalSteps = 45; // ~7 seconds total simulation

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      currentStep++;

      // Stage progression calculation
      if (currentStep < 8) {
        // Step 1: Uploading (0 - 1.2s)
        const uploadPct = Math.min(100, Math.round((currentStep / 8) * 100));
        setProgressState(prev => ({
          ...prev,
          stage: 1,
          overallProgress: Math.round((uploadPct * 0.2))
        }));
      } else if (currentStep < 14) {
        // Step 2: Job Queued & SQS allocation (1.2s - 2.1s)
        setProgressState(prev => ({
          ...prev,
          stage: 2,
          overallProgress: 25
        }));
      } else if (currentStep < 36) {
        // Step 3: Distributed Transcoding (2.1s - 5.5s)
        const transcodeProgress = (currentStep - 14) / 22; // 0 to 1

        // 360p completes fastest
        const p360 = Math.min(100, Math.round(transcodeProgress * 135));
        // 720p completes medium
        const p720 = Math.min(100, Math.round(transcodeProgress * 110));
        // 1080p takes longest
        const p1080 = Math.min(100, Math.round(transcodeProgress * 95));

        const seg360 = `${Math.min(32, Math.round((p360 / 100) * 32))}/32`;
        const seg720 = `${Math.min(32, Math.round((p720 / 100) * 32))}/32`;
        const seg1080 = `${Math.min(32, Math.round((p1080 / 100) * 32))}/32`;

        const thumb = transcodeProgress > 0.4 ? 'Generated' : 'Extracting...';
        const captions = transcodeProgress > 0.8 ? 'Ready' : transcodeProgress > 0.2 ? 'Processing' : 'Queued';

        setProgressState(prev => ({
          ...prev,
          stage: 3,
          overallProgress: Math.round(25 + transcodeProgress * 55),
          renditions: {
            '360p': { progress: p360, status: p360 >= 100 ? 'Completed' : 'Processing', segments: seg360 },
            '720p': { progress: p720, status: p720 >= 100 ? 'Completed' : 'Processing', segments: seg720 },
            '1080p': { progress: p1080, status: p1080 >= 100 ? 'Completed' : 'Processing', segments: seg1080 }
          },
          thumbnailStatus: thumb,
          captionsStatus: captions
        }));
      } else if (currentStep < 43) {
        // Step 4: HLS Packaging & Manifest generation (5.5s - 6.8s)
        setProgressState(prev => ({
          ...prev,
          stage: 4,
          overallProgress: 92,
          renditions: {
            '360p': { progress: 100, status: 'Completed', segments: '32/32' },
            '720p': { progress: 100, status: 'Completed', segments: '32/32' },
            '1080p': { progress: 100, status: 'Completed', segments: '32/32' }
          },
          thumbnailStatus: 'Generated',
          captionsStatus: 'Ready'
        }));
      } else {
        // Step 5: Completed & Adaptive Ready!
        clearInterval(timerRef.current);
        setProgressState(prev => ({
          ...prev,
          stage: 5,
          overallProgress: 100,
          renditions: {
            '360p': { progress: 100, status: 'Completed', segments: '32/32' },
            '720p': { progress: 100, status: 'Completed', segments: '32/32' },
            '1080p': { progress: 100, status: 'Completed', segments: '32/32' }
          },
          thumbnailStatus: 'Generated',
          captionsStatus: 'Ready'
        }));
        setIsProcessing(false);
        setIsComplete(true);
      }
    }, 150);
  };

  const getPipelineStageKey = () => {
    if (!isProcessing && !isComplete) return 'idle';
    if (progressState.stage === 1) return 'uploading';
    if (progressState.stage === 2) return 'queued';
    if (progressState.stage === 3) return 'transcoding';
    if (progressState.stage === 4) return 'packaging';
    if (progressState.stage === 5 || isComplete) return 'completed';
    return 'idle';
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Video Processing</h1>
        <p className="page-subtitle">
          Transform source videos into adaptive streaming-ready media.
        </p>
      </div>

      {/* Cloud Pipeline Architecture Visualization */}
      <ProcessingPipeline currentStage={getPipelineStageKey()} />

      {/* Top 2 Columns: Ingestion & Transcode Options */}
      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        <UploadPanel
          selectedVideo={selectedVideo}
          onVideoSelect={(v) => {
            setSelectedVideo(v);
            setIsComplete(false);
            setProgressState({
              stage: 0,
              overallProgress: 0,
              renditions: {
                '360p': { progress: 0, status: 'Queued', segments: '0/32' },
                '720p': { progress: 0, status: 'Queued', segments: '0/32' },
                '1080p': { progress: 0, status: 'Queued', segments: '0/32' }
              },
              thumbnailStatus: 'Queued',
              captionsStatus: 'Queued'
            });
          }}
          onClearVideo={() => {
            setSelectedVideo(null);
            setIsComplete(false);
          }}
          isProcessing={isProcessing}
        />

        <ProcessingOptions
          options={options}
          onOptionsChange={setOptions}
          onStartProcessing={handleStartProcessing}
          isProcessing={isProcessing}
          isComplete={isComplete}
          hasVideo={!!selectedVideo}
        />
      </div>

      {/* Real-time Rendition Worker Progress (Visible when processing or completed) */}
      {(isProcessing || isComplete) && (
        <RenditionProgress
          progressState={progressState}
          selectedOptions={options}
        />
      )}

      {/* Completed Output Card with Player & Manifest */}
      {isComplete && (
        <VideoOutput
          videoData={selectedVideo}
          selectedOptions={options}
        />
      )}
    </div>
  );
}
