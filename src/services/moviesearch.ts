import axios from "axios";

interface Media {
    name: string;
    shortDescription: string;
    poster: {
        url: string;
    },
}

export async function getRandom() {
  const response = await axios.get<Media>(
    "https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=id&notNullFields=externalId.kpHD&notNullFields=name&notNullFields=shortDescription&notNullFields=year&notNullFields=poster.url",
    {
      headers: {
        "X-API-KEY": process.env.MOVIE_API_KEY,
      },
    },
  );
  return response.data;
}
