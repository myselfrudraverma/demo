/**
 * TranscodeX - Centralized Mock Data
 * Realistic data for video processing infrastructure prototype
 */

export const INITIAL_JOBS = [
  {
    id: "VID-2048",
    filename: "product-launch.mp4",
    inputResolution: "1080p",
    outputs: ["360p", "720p", "1080p"],
    format: "HLS (m3u8)",
    size: "428 MB",
    duration: "2m 41s",
    status: "Completed",
    progress: 100,
    created: "3 mins ago",
    bitrates: "800k / 2500k / 5000k",
    thumbnails: 12,
    captions: "en-US (VTT)",
    workerId: "enc-worker-us-east-04"
  },
  {
    id: "VID-2049",
    filename: "interview-recording.mov",
    inputResolution: "1080p",
    outputs: ["360p", "720p"],
    format: "HLS (m3u8)",
    size: "1.2 GB",
    duration: "8m 15s",
    status: "Processing",
    progress: 67,
    created: "7 mins ago",
    bitrates: "800k / 2500k",
    thumbnails: 24,
    captions: "Processing...",
    workerId: "enc-worker-us-east-09"
  },
  {
    id: "VID-2050",
    filename: "demo.webm",
    inputResolution: "720p",
    outputs: ["360p", "720p"],
    format: "HLS (m3u8)",
    size: "184 MB",
    duration: "1m 12s",
    status: "Queued",
    progress: 0,
    created: "12 mins ago",
    bitrates: "800k / 2500k",
    thumbnails: 6,
    captions: "Queued",
    workerId: "pending allocation"
  },
  {
    id: "VID-2047",
    filename: "conference.mp4",
    inputResolution: "1080p",
    outputs: ["1080p"],
    format: "HLS (m3u8)",
    size: "2.1 GB",
    duration: "18m 40s",
    status: "Failed",
    progress: 42,
    created: "45 mins ago",
    errorReason: "FFmpeg segment worker timeout at segment 084",
    workerId: "enc-worker-eu-west-02"
  },
  {
    id: "VID-2046",
    filename: "onboarding-guide.mp4",
    inputResolution: "1080p",
    outputs: ["360p", "720p", "1080p"],
    format: "HLS (m3u8)",
    size: "610 MB",
    duration: "4m 50s",
    status: "Completed",
    progress: 100,
    created: "1 hour ago",
    bitrates: "800k / 2500k / 5000k",
    thumbnails: 18,
    captions: "en-US, es-ES",
    workerId: "enc-worker-us-east-01"
  },
  {
    id: "VID-2045",
    filename: "keynote-highlights.mp4",
    inputResolution: "4K",
    outputs: ["720p", "1080p", "4K"],
    format: "HLS (m3u8)",
    size: "3.4 GB",
    duration: "14m 20s",
    status: "Completed",
    progress: 100,
    created: "3 hours ago",
    bitrates: "2500k / 5000k / 14000k",
    thumbnails: 45,
    captions: "en-US (VTT)",
    workerId: "enc-worker-us-west-07"
  }
];

export const DEVELOPER_METRICS = {
  videosProcessed: {
    label: "Videos Processed",
    value: "42",
    change: "+14% this week",
    subtext: "Master files transcoded"
  },
  encodingMinutes: {
    label: "Encoding Minutes",
    value: "318",
    change: "+28% vs last month",
    subtext: "Distributed worker compute"
  },
  storageUsed: {
    label: "Storage Used",
    value: "4.7 GB",
    change: "HLS multi-renditions",
    subtext: "Object storage footprint"
  },
  apiRequests: {
    label: "API Requests",
    value: "782",
    change: "99.98% success rate",
    subtext: "REST & Webhook triggers"
  }
};

export const SAMPLE_VIDEOS = [
  {
    name: "product-demo.mp4",
    size: 448790528, // 428 MB
    sizeFormatted: "428 MB",
    type: "video/mp4",
    typeLabel: "MP4",
    duration: "02:41",
    resolution: "1920x1080"
  },
  {
    name: "cloud-architecture-overview.mov",
    size: 786432000, // 750 MB
    sizeFormatted: "750 MB",
    type: "video/quicktime",
    typeLabel: "MOV",
    duration: "05:18",
    resolution: "1920x1080"
  },
  {
    name: "tech-deepdive.webm",
    size: 192937984, // 184 MB
    sizeFormatted: "184 MB",
    type: "video/webm",
    typeLabel: "WebM",
    duration: "01:12",
    resolution: "1280x720"
  }
];

export const API_DOCS = {
  apiKey: "tx_live_8Kj29xP4m9Q2vL8n3R7tY1w",
  maskedKey: "tx_live_8Kj29xP4••••••••••••",
  webhookUrl: "https://example.com/webhooks/video",
  webhookEvent: "video.processing.completed",
  codeExamples: {
    curl: `curl -X POST https://api.transcodex.io/v1/videos \\
  -H "Authorization: Bearer tx_live_8Kj29xP4..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "sourceUrl": "s3://my-bucket/raw/product-demo.mp4",
    "qualities": ["360p", "720p", "1080p"],
    "captions": true,
    "thumbnail": true,
    "output": "hls"
  }'`,
    javascript: `import { TranscodeX } from '@transcodex/sdk';

const client = new TranscodeX({ apiKey: 'tx_live_8Kj29xP4...' });

const job = await client.videos.createJob({
  sourceUrl: 's3://my-bucket/raw/product-demo.mp4',
  qualities: ['360p', '720p', '1080p'],
  captions: true,
  thumbnail: true,
  output: 'hls',
});

console.log(\`Job created: \${job.id} - Status: \${job.status}\`);`,
    python: `from transcodex import TranscodeXClient

client = TranscodeXClient(api_key="tx_live_8Kj29xP4...")

job = client.videos.create_job(
    source_url="s3://my-bucket/raw/product-demo.mp4",
    qualities=["360p", "720p", "1080p"],
    captions=True,
    thumbnail=True,
    output="hls"
)

print(f"Job created: {job.id} - Status: {job.status}")`
  },
  responseExample: `{
  "jobId": "job_83hd72",
  "status": "queued",
  "source": "product-demo.mp4",
  "renditions": ["360p", "720p", "1080p"],
  "format": "hls",
  "estimatedTimeSec": 12,
  "createdAt": "2026-08-16T20:58:00Z"
}`,
  webhookPayloadExample: `{
  "event": "video.processing.completed",
  "videoId": "vid_2048",
  "status": "ready",
  "playbackUrl": "https://cdn.transcodex.io/streams/vid_2048/master.m3u8",
  "thumbnailUrl": "https://cdn.transcodex.io/streams/vid_2048/thumbnail.jpg",
  "captionsUrl": "https://cdn.transcodex.io/streams/vid_2048/captions.vtt",
  "renditions": [
    { "resolution": "360p", "bitrate": "800k", "segments": 32 },
    { "resolution": "720p", "bitrate": "2500k", "segments": 32 },
    { "resolution": "1080p", "bitrate": "5000k", "segments": 32 }
  ],
  "durationSeconds": 161.4,
  "processedAt": "2026-08-16T20:58:12Z"
}`
};
