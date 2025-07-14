import db from "#db/client";
import { base, de, de_CH, en, Faker } from "@faker-js/faker";
import { createPlaylist, getPlaylists } from "./query/playlists.js";
import { createSong, getSongs } from "./query/songs.js";
import { addToPlaylist } from "./query/playlist_songs.js";
import { createArtist } from "./query/artists.js";

const customLocale = {
  title: "My custom locale",
  internet: {
    domainSuffix: ["test"],
  },
};

export const customFaker = new Faker({
  locale: [customLocale, de_CH, de, en, base],
});

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const playlists = [
    { name: "Chill", owner_id: 1 },
    { name: "Summer", owner_id: 1 },
    { name: "Vibes", owner_id: 1 },
  ];

  const artists = [
    {
      name: "Bryson Tiller",
      bio: customFaker.lorem.paragraph(),
      avatar_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
    {
      name: "Jhene Aiko",
      bio: customFaker.lorem.paragraph(),
      avatar_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
    {
      name: "Miguel",
      bio: customFaker.lorem.paragraph(),
      avatar_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
    {
      name: "SZA",
      bio: customFaker.lorem.paragraph(),
      avatar_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
    {
      name: "Tory Lanes",
      bio: customFaker.lorem.paragraph(),
      avatar_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
    {
      name: "Veto",
      bio: customFaker.lorem.paragraph(),
      avatar_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
  ];

  const songs = [
    {
      title: "Let Em' Know",
      duration: 60.0 * 4.0 + 23.0,
      file_url: `songs/https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/songs/Bryson Tiller - Let Em' Know (Audio).mp4`,
      artist_id: 1,
      thumbnail_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
    {
      title: "Moments",
      duration: 60.0 * 3.0,
      file_url: `songs/https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/songs/Jhené Aiko - Moments ft. Big Sean (Official Audio).mp4`,
      artist_id: 2,
      thumbnail_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
    {
      title: "coffee",
      duration: 60.0 * 4.0 + 48.0,
      file_url: `songs/https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/songs/Miguel - coffee (Official Audio).mp4`,
      artist_id: 3,
      thumbnail_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
    {
      title: "2AM",
      duration: 60.0 * 4.0 + 4.0,
      file_url: `songs/https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/songs/SZA - 2AM (Official Audio).mp4`,
      artist_id: 4,
      thumbnail_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
    {
      title: "This is Just The Intro",
      duration: 60.0 * 5.0 + 26.0,
      file_url: `songs/https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/songs/Tory Lanez - And This is Just The Intro [Official Visualizer].mp4`,
      artist_id: 5,
      thumbnail_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
    {
      title: "You Got It",
      duration: 60.0 * 3.0 + 40.0,
      file_url: `songs/https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/songs/Vedo - You Got It (Official Music Video).mp4`,
      artist_id: 6,
      thumbnail_url: "https://www.gravatar.com/avatar/?d=mp&s=32",
    },
  ];

  for (const index in playlists) {
    const playlist = playlists[index];

    await createPlaylist(playlist);
  }

  for (const index in artists) {
    const artist = artists[index];

    await createArtist(artist);
  }

  for (const index in songs) {
    const song = songs[index];

    await createSong(song);
  }

  await seedPlaylistSongs();
}

async function seedPlaylistSongs() {
  const playlists = await getPlaylists();
  const songs = await getSongs();

  for (const playlist_index in playlists) {
    const playlist = playlists[playlist_index];

    for (let index = 0; index < 3; index++) {
      const song = songs[getRandomInt(0, songs.length - 1)];

      try {
        await addToPlaylist({ playlist_id: playlist.id, song_id: song.id });
      } catch (error) {}
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
