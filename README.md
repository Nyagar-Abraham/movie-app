# CineSphere

CineSphere is a dynamic web application for movie and TV series enthusiasts. It leverages the TMDB API to display popular, top-rated, and trending content in an engaging, responsive interface. With secure user authentication and personalized dashboards, CineSphere makes discovering and tracking movies and TV shows an enjoyable experience.

---

## Table of Contents

- [Overview](#overview)
- [Pages](#pages)
- [Key Features](#key-features)
- [Technologies](#technologies)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Authentication](#authentication)
- [API Integration & Data Storage](#api-integration--data-storage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

CineSphere provides a one-stop hub for exploring movies and TV series. Users can easily switch between movies and TV series, filter content, search for specific titles, and view detailed information including trailers, view counts, bookmarks, and favorites.

---

## Pages

1. **Home Page**  
   - Displays the 20 most popular and top-rated movies or TV shows.
   - The default category is set to **movies**.
   - Users can switch the category to TV series.

2. **Movies Page**  
   - Shows paginated movie data (20 movies per page).
   - Includes filtering options based on time (latest or oldest).

3. **Search Page**  
   - Allows users to search for movies.
   - For each search term, both the term and its results are stored in a MongoDB database.
   - This data is later used by an algorithm to display top-searched movies and TV series, sorted by the number of searches.

4. **User Dashboard Page**  
   - Displays personalized data for the logged-in user.
   - Includes the user’s favorite shows, bookmarked shows, and search history.

5. **Details Page**  
   - Accessed when a user clicks on a movie or TV series card.
   - Tracks a “view” and saves this data to the database.
   - Users can bookmark the content.
   - If available, a YouTube trailer is displayed.

---

## Key Features

- **Dynamic Content Display:**  
  Switch seamlessly between movies and TV series.
  
- **Trending Analytics:**  
  Search terms are logged in MongoDB, and an algorithm identifies top-searched titles.

- **Personalized Dashboard:**  
  Manage favorites, bookmarks, and search history in one place.

- **Detailed Views:**  
  Each detail page visit is tracked, contributing to recommendations and analytics.

- **Responsive & Animated UI:**  
  Built with Tailwind CSS and enhanced with GSAP animations for a smooth user experience.

- **Secure User Authentication:**  
  Ensures that user data (favorites, bookmarks, etc.) is protected.

---

## Technologies

- **Frontend:**  
  - HTML  
  - Tailwind CSS  
  - React.js  
  - Next.js  
  - GSAP

- **Backend:**  
  - MongoDB  
  - Mongoose  
  - TypeScript  
  - Next.js API Routes

- **Authentication:**  
  - Secure user authentication mechanisms integrated with Next.js.

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nyagar-Abraham/movie-app.git
   cd movie-app

Check out the live site at [CineSphere Live](https://movie-app-flame-five-31.vercel.app/).
