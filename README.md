# PostPal: AI Smart Photo Selector

**PostPal** is an AI-powered web application that helps you select the best photos for your social moments. Whether it's for Instagram, Facebook, WhatsApp, or any special occasion, PostPal analyzes your images and recommends the most share-worthy ones using advanced AI models.

## Features

- **AI-Powered Photo Selection:** Upload up to 6 photos and let the AI analyze facial expressions, background, and mood to suggest the best image for your chosen occasion and relation.
- **Occasion & Relation Based Suggestions:** Pick your event (Birthday, Graduation, Festival, etc.) and your relation (Friend, Family, Partner, etc.), and get personalized photo recommendations.
- **Modern, Responsive UI:** Simple drag-and-drop interface built with React and Tailwind CSS for a clean, mobile-friendly experience.
- **Instant Visual Feedback:** See previews of your selected images and get results in a beautiful card layout.

## How It Works

1. **Upload Photos:** Drag and drop or browse up to 6 photos you want to compare.
2. **Choose Occasion & Relation:** Select the event and who the photos are for.
3. **Get AI Recommendations:** The app uses Google Gemini AI APIs (server-side) to analyze images and return the best suggestion, formatted for easy posting on social media.
4. **Download & Share:** Use the recommended photo for your next social media post!

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js, Express, Google Gemini Model API, Cloudinary (for image uploads)
- **Other:** Multer (file uploads), Mongoose (image metadata storage)

## Getting Started

### Prerequisites

- Node.js
- Cloudinary account (for image storage)
- Google Gemini AI API key

### Quick Start

1. Clone this repo:  
   `git clone https://github.com/ronak232/ai-smart-photos-selectors.git`
2. Install dependencies for both `client` and `server` directories.
3. Configure your environment variables (API keys, etc.).
4. Run the backend server and frontend client.

## Project Structure

```
client/   # React frontend (UI, components, upload logic)
server/   # Express backend (AI image analysis, uploads)
```

## Why PostPal?

- Saves time picking the right photo for every occasion.
- Helps you shine on social media with AI-curated recommendations.
- Clean, privacy-first workflow: your images are only analyzed for selection, not stored or shared.

---

**Made with ❤️ for your favorite social moments!**
