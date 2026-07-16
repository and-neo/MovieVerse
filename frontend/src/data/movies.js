import cast from "./shared/cast";
import reviews from "./shared/reviews";

/**
 * Temporary movie data used during frontend development.
 * These objects will later be replaced with data fetched from the TMDb API.
 */

const movies = [
    {
        id: 1,

        type: "movie",

        title: "The Dark Knight",

        tagline: "Why So Serious?",

        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",

        overview:
            "Batman raises the stakes in his war on crime with the help of Lieutenant James Gordon and District Attorney Harvey Dent. Their alliance proves effective, but they soon find themselves facing the Joker, a criminal mastermind who plunges Gotham City into chaos.",

        releaseDate: "2008-07-16",

        status: "Released",

        originalLanguage: "en",

        voteAverage: 9.0,

        voteCount: 34000,

        genres: ["Action ", "Crime ", "Drama "],

        runtime: 152,

        seasons: null,

        adult: false,

        cast: [...cast],

        reviews: [...reviews],
    },
    {
        id: 2,

        type: "movie",

        title: "Interstellar",

        tagline: "Mankind was born on Earth. It was never meant to die here.",

        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",

        overview:
            "As humanity faces extinction, a team of explorers travels through a wormhole in search of a new home for mankind. Their journey pushes the limits of science, time, and human endurance.",

        releaseDate: "2014-11-05",

        status: "Released",

        originalLanguage: "en",

        voteAverage: 8.5,

        voteCount: 38000,

        genres: ["Adventure ", "Drama ", "Science Fiction "],

        runtime: 169,

        seasons: null,

        adult: false,

        cast: [...cast],

        reviews: [...reviews],
    },
    {
        id: 3,

        type: "movie",

        title: "Inception",

        tagline: "Your mind is the scene of the crime.",

        poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",

        overview:
            "A skilled thief who specializes in stealing secrets through dream-sharing technology is offered a chance to erase his criminal past by planting an idea into the mind of a powerful businessman.",

        releaseDate: "2010-07-15",

        status: "Released",

        originalLanguage: "en",

        voteAverage: 8.4,

        voteCount: 37000,

        genres: ["Action ", "Science Fiction ", "Adventure"],

        runtime: 148,

        seasons: null,

        adult: false,

        cast: [...cast],

        reviews: [...reviews],
    },
    {
        id: 4,

        type: "movie",

        title: "Oppenheimer",

        tagline: "The world forever changes.",

        poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",

        overview:
            "The story of J. Robert Oppenheimer and his pivotal role in the development of the atomic bomb during World War II, exploring the scientific achievement and its profound consequences.",

        releaseDate: "2023-07-19",

        status: "Released",

        originalLanguage: "en",

        voteAverage: 8.1,

        voteCount: 11000,

        genres: ["Drama ", "History"],

        runtime: 181,

        seasons: null,

        adult: false,

        cast,

        reviews,
    },
    {
        id: 5,

        type: "movie",

        title: "The Shawshank Redemption",

        tagline: "Fear can hold you prisoner. Hope can set you free.",

        poster: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",

        overview:
            "Imprisoned for a crime he did not commit, banker Andy Dufresne forms a lasting friendship with fellow inmate Red while never giving up hope of reclaiming his freedom.",

        releaseDate: "1994-09-23",

        status: "Released",

        originalLanguage: "en",

        voteAverage: 8.7,

        voteCount: 29000,

        genres: ["Drama ", "Crime"],

        runtime: 142,

        seasons: null,

        adult: false,

        cast: [...cast],

        reviews: [...reviews],
    },
    {
        id: 6,

        type: "movie",

        title: "LOTR: The Return of the King",

        tagline: "The eye of the enemy is moving.",

        poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",

        backdrop:
            "https://image.tmdb.org/t/p/original/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg",

        overview:
            "Gandalf and Aragorn lead the forces of good against Sauron's army while Frodo and Sam make their final journey toward Mount Doom to destroy the One Ring.",

        releaseDate: "2003-12-17",

        status: "Released",

        originalLanguage: "en",

        voteAverage: 8.5,

        voteCount: 25000,

        genres: ["Adventure ", "Fantasy ", "Action"],

        runtime: 201,

        seasons: null,

        adult: false,

        cast: [...cast],

        reviews: [...reviews],
    },
];

export default movies;
