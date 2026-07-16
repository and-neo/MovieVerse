import cast from "./shared/cast";
import reviews from "./shared/reviews";

/**
 * Temporary TV show data used during frontend development.
 * These objects will later be replaced with data fetched from the TMDb API.
 */

const tvShows = [
    {
        id: 1,

        type: "tv",

        title: "Breaking Bad",

        tagline: "Remember my name.",

        poster: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",

        overview:
            "A high school chemistry teacher diagnosed with terminal cancer turns to manufacturing methamphetamine with a former student to secure his family's future.",

        releaseDate: "2008-01-20",

        status: "Ended",

        originalLanguage: "en",

        voteAverage: 9.5,

        voteCount: 16000,

        genres: ["Drama ", "Crime"],

        runtime: null,

        seasons: 5,

        adult: false,

        cast: [...cast],

        reviews: [...reviews],
    },

    {
        id: 2,

        type: "tv",

        title: "Game of Thrones",

        tagline: "Winter Is Coming.",

        poster: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/suopoADq0k8YZr4dQXcU6pToj6s.jpg",

        overview:
            "Nine noble families wage war against each other in order to gain control over the mythical land of Westeros while an ancient enemy returns after being dormant for millennia.",

        releaseDate: "2011-04-17",

        status: "Ended",

        originalLanguage: "en",

        voteAverage: 9.2,

        voteCount: 25000,

        genres: ["Sci-Fi & Fantasy ", "Drama ", "Action & Adventure "],

        runtime: null,

        seasons: 8,

        adult: false,

        cast: [...cast],

        reviews: [...reviews],
    },

    {
        id: 3,

        type: "tv",

        title: "Stranger Things",

        tagline: "The world is turning upside down.",

        poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",

        overview:
            "When a young boy mysteriously disappears, a small town uncovers secret experiments, terrifying supernatural forces, and one extraordinary girl.",

        releaseDate: "2016-07-15",

        status: "Returning Series",

        originalLanguage: "en",

        voteAverage: 8.6,

        voteCount: 18500,

        genres: ["Drama ", "Mystery ", "Sci-Fi & Fantasy"],

        runtime: null,

        seasons: 5,

        adult: false,

        cast: [...cast],

        reviews: [...reviews],
    },
    {
        id: 4,

        type: "tv",

        title: "The Last of Us",

        tagline: "When you're lost in the darkness, look for the light.",

        poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",

        overview:
            "Twenty years after modern civilization has been destroyed, Joel is hired to smuggle Ellie out of a quarantine zone. What begins as a simple mission soon becomes a brutal and heartbreaking journey across a post-apocalyptic America.",

        releaseDate: "2023-01-15",

        status: "Returning Series",

        originalLanguage: "en",

        voteAverage: 8.6,

        voteCount: 6200,

        genres: ["Drama ", "Action & Adventure ", "Sci-Fi & Fantasy"],

        runtime: null,

        seasons: 2,

        adult: false,

        cast: [...cast],

        reviews: [...reviews],
    },

    {
        id: 5,

        type: "tv",

        title: "Dark",

        tagline: "The question is not where. The question is when.",

        poster: "https://image.tmdb.org/t/p/original/5kgamCow9xWaD3pxqByXp9UUyqr.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/3lBDg3i6nn5RjQ4QEl1tM3G8l4F.jpg",

        overview:
            "A missing child sets four families on a frantic hunt for answers as they uncover a mind-bending mystery spanning multiple generations in the small German town of Winden.",

        releaseDate: "2017-12-01",

        status: "Ended",

        originalLanguage: "de",

        voteAverage: 8.4,

        voteCount: 4700,

        genres: ["Crime ", "Drama ", "Mystery ", "Sci-Fi & Fantasy"],

        runtime: null,

        seasons: 3,

        adult: false,

        cast: [...cast],

        reviews: [...reviews],
    },

    {
        id: 6,

        type: "tv",

        title: "Sherlock",

        tagline: "A new sleuth for the 21st century.",

        poster: "https://image.tmdb.org/t/p/w500/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",

        overview:
            "Modern-day adaptation of Sir Arthur Conan Doyle's legendary detective. Sherlock Holmes and Dr. John Watson solve London's most challenging crimes using brilliant deduction and forensic science.",

        releaseDate: "2010-07-25",

        status: "Ended",

        originalLanguage: "en",

        voteAverage: 8.5,

        voteCount: 5600,

        genres: ["Crime ", "Drama ", "Mystery"],

        runtime: null,

        seasons: 4,

        adult: false,

        cast: [...cast],

        reviews: [...reviews],
    },
];

export default tvShows;
