# 🏆 AuctionHub - Online Auction Platform

A modern, responsive online auction platform built with Next.js 15, JavaScript, and Tailwind CSS. Features a beautiful UI powered by shadcn/ui components.

## ✨ Features

- **Modern Design**: Clean, professional interface with responsive design
- **Auction Browsing**: Search, filter, and sort through auctions
- **User Dashboard**: Track bids, won auctions, and account statistics
- **Authentication**: Login and registration forms (ready for backend integration)
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Component Library**: Built with shadcn/ui for consistent, accessible components

## 🚀 Tech Stack

- **Framework**: Next.js 15.4.6 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono (Google Fonts)

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes
│   │   └── login/               # Login page
│   ├── auctions/                # Auction routes
│   │   └── page.js              # Browse auctions page
│   ├── dashboard/                # User dashboard
│   │   └── page.js              # Dashboard page
│   ├── layout.js                 # Root layout with header/footer
│   ├── page.js                   # Homepage
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.js            # Button component
│   │   ├── card.js              # Card components
│   │   ├── input.js             # Input component
│   │   ├── badge.js             # Badge component
│   │   ├── avatar.js            # Avatar component
│   │   ├── separator.js         # Separator component
│   │   ├── label.js             # Label component
│   │   └── form.js              # Form components
│   ├── layout/                   # Layout components
│   │   ├── Header.js            # Site header
│   │   └── Footer.js            # Site footer
│   ├── auction/                  # Auction-specific components
│   │   ├── AuctionCard.js       # Auction display card
│   │   └── SearchFilters.js     # Search and filter component
│   └── forms/                    # Form components
│       └── LoginForm.js         # Login form
├── data/                         # Mock data and constants
│   └── auctions.js              # Sample auction data
├── lib/                          # Utility functions
│   └── utils.js                 # Helper functions
└── hooks/                        # Custom React hooks (ready for future use)
```

## 🎯 Key Components

### Layout Components
- **Header**: Navigation bar with search, filters, and user actions
- **Footer**: Site information and links
- **Layout**: Wraps all pages with consistent header/footer

### Auction Components
- **AuctionCard**: Displays auction information in a card format
- **SearchFilters**: Search bar, category filters, and price ranges
- **Browse Page**: Full auction listing with filtering and sorting

### Form Components
- **LoginForm**: User authentication form
- **Form Components**: Reusable form elements using shadcn/ui

### UI Components
- **Button**: Multiple variants (default, outline, ghost, etc.)
- **Card**: Content containers with header, content, and footer
- **Badge**: Status indicators and labels
- **Input**: Form input fields
- **Avatar**: User profile images

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd auction-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Routes

- **`/`** - Homepage with featured auctions
- **`/auctions`** - Browse all auctions with search and filters
- **`/auth/login`** - User login page
- **`/dashboard`** - User dashboard with statistics and activity

## 🎨 Customization

### Colors
The app uses a custom color scheme defined in `tailwind.config.js` with CSS variables for easy theming.

### Components
All UI components are built with shadcn/ui and can be customized by modifying the component files in `src/components/ui/`.

### Styling
The app uses Tailwind CSS for styling. Custom styles can be added to `src/app/globals.css`.

## 🔧 Development

### Adding New Components
1. Create your component in the appropriate directory
2. Import and use shadcn/ui components for consistency
3. Follow the existing naming conventions

### Adding New Pages
1. Create a new directory in `src/app/`
2. Add a `page.js` file
3. The route will be automatically available

### State Management
Currently uses React's built-in state management. Ready for integration with:
- Zustand (lightweight)
- Redux Toolkit (full-featured)
- React Query (server state)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
The app is ready for deployment to Vercel with zero configuration.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository.

---

**Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui**
