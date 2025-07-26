// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const TranscriptionApp = () => {
//     const [file, setFile] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [transcript, setTranscript] = useState('');
//     const [error, setError] = useState('');
//     const [progress, setProgress] = useState(0);
//     const abortControllerRef = useRef(null);

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setError('');
//         setProgress(0);

//         if (selectedFile) {
//             const maxSize = 100 * 1024 * 1024; // 100MB
//             const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'video/mp4', 'audio/ogg'];

//             if (!allowedTypes.includes(selectedFile.type)) {
//                 setError('Invalid file type. Please upload .mp3, .wav, .m4a, .mp4, or .ogg files.');
//                 setFile(null);
//                 return;
//             }

//             if (selectedFile.size > maxSize) {
//                 setError('File size exceeds 100MB limit.');
//                 setFile(null);
//                 return;
//             }

//             setFile(selectedFile);
//         } else {
//             setFile(null);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             setError('Please select a valid file.');
//             return;
//         }

//         setIsLoading(true);
//         setError('');
//         setProgress(0);
//         abortControllerRef.current = new AbortController();

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://localhost:5000/transcribe', formData, {
//                 signal: abortControllerRef.current.signal,
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 onUploadProgress: (progressEvent) => {
//                     if (progressEvent.lengthComputable) {
//                         const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
//                         setProgress(percent);
//                     }
//                 },
//             });

//             setTranscript(response.data.transcript || 'No transcription text available.');
//         } catch (err) {
//             if (err.name === 'AbortError') {
//                 setError('Transcription cancelled.');
//             } else {
//                 setError(err.response?.data?.error || 'Error during transcription: ' + err.message);
//             }
//         } finally {
//             setIsLoading(false);
//             setProgress(0);
//             abortControllerRef.current = null;
//         }
//     };

//     const handleCancel = () => {
//         if (abortControllerRef.current) {
//             abortControllerRef.current.abort();
//         }
//     };

//     const handleDownload = () => {
//         const blob = new Blob([transcript], { type: 'text/plain' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'transcript.txt';
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     return (
//         <div className="container">
//             <div className={`loading-modal ${!isLoading ? 'hidden' : ''}`}>
//                 <div style={{ textAlign: 'center' }}>
//                     <div className="spinner"></div>
//                     <p style={{ marginTop: '1rem', fontSize: '1.125rem' }}>
//                         Transcribing... {progress > 0 ? `${progress}%` : ''}
//                     </p>
//                     <button
//                         onClick={handleCancel}
//                         className="button"
//                         style={{ background: '#dc2626', marginTop: '1rem' }}
//                         disabled={!isLoading}
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </div>

//             <h1>Transcription</h1>

//             <div className="card">
//                 <h2>Upload Audio/Video File</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="file"
//                         accept=".mp3,.wav,.m4a,.mp4,.mpeg,.ogg"
//                         onChange={handleFileChange}
//                         className="file-input"
//                     />
//                     <button type="submit" className="button" style={{ marginTop: '1rem' }}>
//                         Transcribe
//                     </button>
//                     {error && <p className="error">{error}</p>}
//                 </form>
//             </div>

//             {transcript && (
//                 <div className="card">
//                     <h2>Transcription Result</h2>
//                     <div style={{ marginBottom: '1.5rem' }}>
//                         <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>
//                             Transcript
//                         </h3>
//                         <p className="transcript">{transcript}</p>
//                     </div>
//                     <button onClick={handleDownload} className="button download-button">
//                         Download Text
//                     </button>
//                 </div>
//             )}

//             <style>
//                 {`
//                     body {
//                         background: linear-gradient(to bottom right, #1f2937, #111827);
//                         color: white;
//                         min-height: 100vh;
//                         font-family: sans-serif;
//                         margin: 0;
//                     }

//                     .container {
//                         max-width: 48rem;
//                         margin: 0 auto;
//                         padding: 1.5rem;
//                     }

//                     h1 {
//                         font-size: 2.25rem;
//                         font-weight: bold;
//                         text-align: center;
//                         margin-bottom: 2rem;
//                     }

//                     .card {
//                         background: #1f2937;
//                         padding: 2rem;
//                         border-radius: 0.75rem;
//                         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//                         margin-bottom: 2rem;
//                     }

//                     h2 {
//                         font-size: 1.5rem;
//                         font-weight: 600;
//                         margin-bottom: 1.5rem;
//                     }

//                     .file-input {
//                         background: #374151;
//                         color: white;
//                         padding: 0.75rem;
//                         border: 1px solid #4b5563;
//                         border-radius: 0.5rem;
//                         width: 100%;
//                     }

//                     .file-input::-webkit-file-upload-button {
//                         background: #2563eb;
//                         color: white;
//                         padding: 0.5rem 1rem;
//                         border: none;
//                         border-radius: 0.5rem;
//                         margin-right: 1rem;
//                         cursor: pointer;
//                     }

//                     .file-input::-webkit-file-upload-button:hover {
//                         background: #1d4ed8;
//                     }

//                     .button {
//                         background: #2563eb;
//                         color: white;
//                         padding: 0.75rem 1.5rem;
//                         border: none;
//                         border-radius: 0.5rem;
//                         cursor: pointer;
//                         font-size: 1rem;
//                         transition: background-color 0.3s;
//                     }

//                     .button:hover {
//                         background: #1d4ed8;
//                     }

//                     .download-button {
//                         background: #16a34a;
//                     }

//                     .download-button:hover {
//                         background: #15803d;
//                     }

//                     .error {
//                         color: #f87171;
//                         margin-top: 1rem;
//                     }

//                     .transcript {
//                         background: #374151;
//                         padding: 1rem;
//                         border-radius: 0.5rem;
//                         color: #d1d5db;
//                         white-space: pre-wrap;
//                     }

//                     .loading-modal {
//                         position: fixed;
//                         inset: 0;
//                         background: rgba(0, 0, 0, 0.5);
//                         display: flex;
//                         align-items: center;
//                         justify-content: center;
//                         z-index: 50;
//                     }

//                     .spinner {
//                         border: 4px solid rgba(255, 255, 255, 0.3);
//                         border-top: 4px solid #ffffff;
//                         border-radius: 50%;
//                         width: 40px;
//                         height: 40px;
//                         animation: spin 1s linear infinite;
//                     }

//                     @keyframes spin {
//                         0% { transform: rotate(0deg); }
//                         100% { transform: rotate(360deg); }
//                     }

//                     .hidden {
//                         display: none;
//                     }
//                 `}
//             </style>
//         </div>
//     );
// };

// export default TranscriptionApp;



import React, { useState, useRef } from 'react';
import axios from 'axios';
import config from '../config';

const TranscriptionApp = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const abortControllerRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setError('');
        setProgress(0);

        if (selectedFile) {
            const maxSize = 100 * 1024 * 1024; // 100MB
            const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'video/mp4', 'audio/ogg'];

            if (!allowedTypes.includes(selectedFile.type)) {
                setError('Invalid file type. Please upload .mp3, .wav, .m4a, .mp4, or .ogg files.');
                setFile(null);
                return;
            }

            if (selectedFile.size > maxSize) {
                setError('File size exceeds 100MB limit.');
                setFile(null);
                return;
            }

            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a valid file.');
            return;
        }

        setIsLoading(true);
        setError('');
        setProgress(0);
        abortControllerRef.current = new AbortController();

        const formData = new FormData();
        formData.append('audio_file', file);

        try {
            const response = await axios.post(config.apiUrl + '/transcribe', formData, {
                signal: abortControllerRef.current.signal,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.lengthComputable) {
                        const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setProgress(percent);
                    }
                },
            });
            console.log("result",response)
            setTranscript(response.data.result || 'No transcription text available.');
        } catch (err) {
            if (err.name === 'AbortError') {
                setError('Transcription cancelled.');
            } else {
                setError(err.response?.data?.error || 'Error during transcription: ' + err.message);
            }
        } finally {
            setIsLoading(false);
            setProgress(0);
            abortControllerRef.current = null;
        }
    };

    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const handleDownload = () => {
        const blob = new Blob([transcript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transcript.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container">
            <div className={`loading-modal ${!isLoading ? 'hidden' : ''}`}>
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner"></div>
                    <p style={{ marginTop: '1rem', fontSize: '1.125rem' }}>
                        Transcribing... {progress > 0 ? `${progress}%` : ''}
                    </p>
                    <button
                        onClick={handleCancel}
                        className="button"
                        style={{ background: '#dc2626', marginTop: '1rem' }}
                        disabled={!isLoading}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <h1>Transcription</h1>

            <div className="card">
                <h2>Upload Audio/Video File</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        accept=".mp3,.wav,.m4a,.mp4,.mpeg,.ogg"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                    <button type="submit" className="button" style={{ marginTop: '1rem' }}>
                        Transcribe
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>

            {transcript && (
                <div className="card">
                    <h2>Transcription Result</h2>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                            Transcript
                        </h3>
                        <p className="transcript">{transcript}</p>
                    </div>
                    <button onClick={handleDownload} className="button download-button">
                        Download Text
                    </button>
                </div>
            )}

            <style>
                {`
                    body {
                        background: linear-gradient(to bottom right, #1f2937, #111827);
                        color: white;
                        min-height: 100vh;
                        font-family: sans-serif;
                        margin: 0;
                    }

                    .container {
                        max-width: 48rem;
                        margin: 0 auto;
                        padding: 1.5rem;
                    }

                    h1 {
                        font-size: 2.25rem;
                        font-weight: bold;
                        text-align: center;
                        margin-bottom: 2rem;
                    }

                    .card {
                        background: #1f2937;
                        padding: 2rem;
                        border-radius: 0.75rem;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        margin-bottom: 2rem;
                    }

                    h2 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin-bottom: 1.5rem;
                    }

                    .file-input {
                        background: #374151;
                        color: white;
                        padding: 0.75rem;
                        border: 1px solid #4b5563;
                        border-radius: 0.5rem;
                        width: 100%;
                    }

                    .file-input::-webkit-file-upload-button {
                        background: #2563eb;
                        color: white;
                        padding: 0.5rem 1rem;
                        border: none;
                        border-radius: 0.5rem;
                        margin-right: 1rem;
                        cursor: pointer;
                    }

                    .file-input::-webkit-file-upload-button:hover {
                        background: #1d4ed8;
                    }

                    .button {
                        background: #2563eb;
                        color: white;
                        padding: 0.75rem 1.5rem;
                        border: none;
                        border-radius: 0.5rem;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: background-color 0.3s;
                    }

                    .button:hover {
                        background: #1d4ed8;
                    }

                    .download-button {
                        background: #16a34a;
                    }

                    .download-button:hover {
                        background: #15803d;
                    }

                    .error {
                        color: #f87171;
                        margin-top: 1rem;
                    }

                    .transcript {
                        background: #374151;
                        padding: 1rem;
                        border-radius: 0.5rem;
                        color: #d1d5db;
                        white-space: pre-wrap;
                    }

                    .loading-modal {
                        position: fixed;
                        inset: 0;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 50;
                    }

                    .spinner {
                        border: 4px solid rgba(255, 255, 255, 0.3);
                        border-top: 4px solid #ffffff;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    .hidden {
                        display: none;
                    }
                `}
            </style>
        </div>
    );
};

export default TranscriptionApp;