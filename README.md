# AirdropFinder

AirdropFinder is a clean, SEO-optimized directory site built with Next.js and Firebase that helps users discover crypto earning opportunities like airdrops, faucets, and learn-to-earn platforms.

## 🔧 Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Backend/Database**: Firebase Firestore
- **Styling**: Tailwind CSS
- **Content Generation**: Google Gemini API
- **Analytics**: Google Analytics (optional)

## 🧩 Core Features

- **No Auth Required** - No login/signup needed for viewing or managing data
- **Admin Interface** - Easy no-code style management of directory entries
- **Directory Listings** - Comprehensive platform details including:
  - Name, Category, Logo/Icon
  - Description, Reward Type, Estimated Earning
  - Referral Link (optional)
  - SEO Title and Description
- **SEO Features**:
  - Auto-generated content using Gemini API
  - Structured data (schema.org)
  - Dynamic meta tags
  - Auto-generated sitemap.xml and robots.txt
  - Category-based routing
- **Clean, Responsive Design** - Mobile-friendly interface with Tailwind CSS

## 📋 Project Structure

```
airdropfinder/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin interface (hidden route)
│   ├── api/                # API routes
│   ├── category/           # Category pages
│   ├── platform/           # Platform detail pages
│   ├── search/             # Search functionality
│   └── server-sitemap.xml/ # Dynamic sitemap generation
├── components/             # Reusable UI components
├── lib/                    # Utility functions and services
│   ├── firebase.ts         # Firebase configuration
│   ├── firestore.ts        # Firestore service
│   ├── gemini.ts           # Gemini API integration
│   └── seo.ts              # SEO utilities
├── public/                 # Static assets
└── types/                  # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase project with Firestore enabled
- Google Gemini API key (for content generation)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your_domain.com

# Site URL
SITE_URL=https://airdropfinder.vercel.app
```

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

## 🧪 Admin Interface

Access the admin interface at `/admin` to manage platforms:

- View all platforms
- Add new platforms
- Edit existing platforms
- Delete platforms
- Auto-generate content with Gemini API

## 📈 SEO Features

- **Dynamic Meta Tags**: Each page has optimized meta tags
- **Structured Data**: Schema.org markup for better search visibility
- **Sitemap Generation**: Automatically updated sitemap.xml
- **Content Generation**: AI-generated content for each platform

## 🚢 Deployment

The project is configured for easy deployment on Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org)
- [Firebase](https://firebase.google.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Gemini API](https://ai.google.dev/)
- [Heroicons](https://heroicons.com)
- [Headless UI](https://headlessui.com)
