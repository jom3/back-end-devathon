import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  try {
    // create two dummy articles
    const tableNames = [
      'Movie',
      'Cinema',
      'CinemaHall',
      'CinemaSeat',
      'User',
      'Show',
      'ShowSeat',
      'Payment',
      'Booking',
    ];
    for (const tableName of tableNames)
      await prisma.$queryRawUnsafe(
        `Truncate "${tableName}" restart identity cascade;`,
      );

    await prisma.user.create({
      data: {
        fullName: 'karol',
        email: 'karol@hotmail.com',
        password: 'Estocolmo123!',
        dni: '12345678A',
        role: 'USER',
      },
    });

    await prisma.cinema.create({
      data: {
        cinemaID: 1,
        name: 'Cinemas Ocean Drive',
        email: 'ocean-drive-cinemas@example.es',
        address: 'Calle Ocean Drive, 23, Madrid, Spain',
        phone: '1234567890',
      },
    });

    await prisma.cinemaHall.create({
      data: {
        cinemaHallID: 1,
        cinemaID: 1,
        name: 'Cine Hall 1',
        totalSeats: 50,
      },
    });

    for (let index = 10; index < 50; index++) {
      await prisma.cinemaSeat.create({
        data: {
          cinemaSeatID: parseInt(index.toString()),
          seatNumber: parseInt(index.toString()),
          type: 'STANDARD',
          cinemaHallID: 1,
        },
      });
    }
    for (let index = 0; index < 4; index++) {
      await prisma.cinemaSeat.create({
        data: {
          cinemaSeatID: parseInt(index.toString()),
          seatNumber: parseInt(index.toString()),
          type: 'VIP',
          cinemaHallID: 1,
        },
      });
    }

    for (let index = 4; index < 6; index++) {
      await prisma.cinemaSeat.create({
        data: {
          cinemaSeatID: parseInt(index.toString()),
          seatNumber: parseInt(index.toString()),
          type: 'PREMIUM',
          cinemaHallID: 1,
        },
      });
    }
    for (let index = 6; index < 10; index++) {
      await prisma.cinemaSeat.create({
        data: {
          cinemaSeatID: parseInt(index.toString()),
          seatNumber: parseInt(index.toString()),
          type: 'VIP',
          cinemaHallID: 1,
        },
      });
    }

    for (let index = 0; index < 50; index++) {
      await prisma.showSeat.create({
        data: {
          showSeatID: parseInt(index.toString()),
          cinemaSeatID: parseInt(index.toString()),
          bookingID: 0,
          status: 'LIBRE',
          price: 15,
          showID: 1,
        },
      });
    }

    for (let index = 50; index < 100; index++) {
      await prisma.showSeat.create({
        data: {
          showSeatID: index,
          cinemaSeatID: index - 50,
          bookingID: 0,
          status: 'LIBRE',
          price: 15,
          showID: 2,
        },
      });
    }

    for (let index = 100; index < 150; index++) {
      await prisma.showSeat.create({
        data: {
          showSeatID: index,
          cinemaSeatID: index - 100,
          bookingID: 0,
          status: 'LIBRE',
          price: 15,
          showID: 3,
        },
      });
    }

    for (let index = 150; index < 200; index++) {
      await prisma.showSeat.create({
        data: {
          showSeatID: index,
          cinemaSeatID: index - 150,
          bookingID: 0,
          status: 'LIBRE',
          price: 15,
          showID: 4,
        },
      });
    }

    for (let index = 200; index < 250; index++) {
      await prisma.showSeat.create({
        data: {
          showSeatID: index,
          cinemaSeatID: index - 200,
          bookingID: 0,
          status: 'LIBRE',
          price: 15,
          showID: 5,
        },
      });
    }
    // Bad Boys

    for (let index = 250; index < 300; index++) {
      await prisma.showSeat.create({
        data: {
          showSeatID: index,
          cinemaSeatID: index - 250,
          bookingID: 0,
          status: 'LIBRE',
          price: 15,
          showID: 6,
        },
      });
    }

    for (let index = 300; index < 350; index++) {
      await prisma.showSeat.create({
        data: {
          showSeatID: index,
          cinemaSeatID: index - 300,
          bookingID: 0,
          status: 'LIBRE',
          price: 15,
          showID: 7,
        },
      });
    }

    for (let index = 350; index < 400; index++) {
      await prisma.showSeat.create({
        data: {
          showSeatID: index,
          cinemaSeatID: index - 350,
          bookingID: 0,
          status: 'LIBRE',
          price: 15,
          showID: 8,
        },
      });
    }

    for (let index = 400; index < 450; index++) {
      await prisma.showSeat.create({
        data: {
          showSeatID: index,
          cinemaSeatID: index - 400,
          bookingID: 0,
          status: 'LIBRE',
          price: 15,
          showID: 9,
        },
      });
    }

    for (let index = 450; index < 500; index++) {
      await prisma.showSeat.create({
        data: {
          showSeatID: index,
          cinemaSeatID: index - 450,
          bookingID: 0,
          status: 'LIBRE',
          price: 15,
          showID: 10,
        },
      });
    }

    // End Bad Boys
    await prisma.movie.create({
      data: {
        movieID: 533535,
        externalID: 533535,
        adult: false,
        backdrop_path:
          'https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg',
        genre_ids: [28, 12, 878],
        original_language: 'en',
        original_title: 'Deadpool & Wolverine',
        overview:
          'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
        desc: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
        popularity: 0,
        poster_path:
          'https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
        releaseDate: new Date(),
        title: 'Deadpool & Wolverine',
        video: false,
        duration: 180,
        language: 'English',
        vote_average: 0,
        vote_count: 0,
        cast: ['Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang'],
        trailler: 'https://www.youtube.com/watch?v=5PSNL1qE6VY',
        revenue: 0,
        runtime: '00:00:00',
        status: 'Released',
        genres: ['Action', 'Adventure', 'Fantasy', 'Science Fiction'],
      },
    });

    await prisma.movie.create({
      data: {
        movieID: 718821,
        externalID: 718821,
        adult: false,
        backdrop_path:
          'https://image.tmdb.org/t/p/original/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg',
        genre_ids: [28, 12, 878],
        original_language: 'en',
        original_title: 'Twisters',
        overview:
          'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine',
        desc: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine',
        popularity: 0,
        poster_path:
          'https://image.tmdb.org/t/p/original/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg',
        releaseDate: new Date(),
        title: 'Twisters',
        video: false,
        duration: 180,
        language: 'English',
        vote_average: 0,
        vote_count: 0,
        cast: ['Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang'],
        trailler: 'https://www.youtube.com/watch?v=58D6ZAvOKxlHjyX9S8qNKSBE9Y',
        revenue: 0,
        runtime: '00:00:00',
        status: 'Released',
        genres: ['Action', 'Adventure', 'Fantasy', 'Science Fiction'],
      },
    });

    await prisma.movie.create({
      data: {
        movieID: 1022789,
        externalID: 1022789,
        adult: false,
        backdrop_path:
          'https://image.tmdb.org/t/p/original/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg',
        genre_ids: [28, 12, 878],
        original_language: 'en',
        original_title: 'Inside Out 2',
        overview:
          "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",

        desc: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",

        popularity: 0,
        poster_path:
          'https://image.tmdb.org/t/p/original/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
        releaseDate: new Date(),
        title: 'Avatar',
        video: false,
        duration: 180,
        language: 'English',
        vote_average: 0,
        vote_count: 0,
        cast: ['Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang'],
        trailler: 'https://www.youtube.com/watch?v=5PSNL1qE6VY',
        revenue: 0,
        runtime: '00:00:00',
        status: 'Released',
        genres: ['Action', 'Adventure', 'Fantasy', 'Science Fiction'],
      },
    });

    await prisma.show.create({
      data: {
        showID: 1,
        date: '2024-08-24T00:09:00-05:00',
        startTime: '2024-08-24T00:00:00-09:00',
        endTime: '2024-08-24T00:00:00-11:00',
        cinemaHall: 1,
        movieID: 533535,
      },
    });

    await prisma.show.create({
      data: {
        showID: 2,
        date: '2024-08-24T00:09:00-05:00',
        startTime: '2024-08-24T00:00:00-12:00',
        endTime: '2024-08-24T00:00:00-14:00',
        cinemaHall: 1,
        movieID: 533535,
      },
    });

    await prisma.show.create({
      data: {
        showID: 3,
        date: '2024-08-24T00:09:00-05:00',
        startTime: '2024-08-24T00:00:00-15:00',
        endTime: '2024-08-24T00:00:00-17:00',
        cinemaHall: 1,
        movieID: 533535,
      },
    });

    await prisma.show.create({
      data: {
        showID: 4,
        date: '2024-08-24T00:09:00-05:00',
        startTime: '2024-08-24T00:00:00-18:00',
        endTime: '2024-08-24T00:00:00-20:00',
        cinemaHall: 1,
        movieID: 533535,
      },
    });

    await prisma.show.create({
      data: {
        showID: 5,
        date: '2024-08-24T00:09:00-05:00',
        startTime: '2024-08-24T00:00:00-21:00',
        endTime: '2024-08-24T00:20:00-23:00',
        cinemaHall: 1,
        movieID: 533535,
      },
    });

    // BAD BOYS
    await prisma.show.create({
      data: {
        showID: 6,
        date: '2024-08-24T00:09:00-05:00',
        startTime: '2024-08-24T00:00:00-09:00',
        endTime: '2024-08-24T00:00:00-11:00',
        cinemaHall: 1,
        movieID: 718821,
      },
    });

    await prisma.show.create({
      data: {
        showID: 7,
        date: '2024-08-24T00:09:00-05:00',
        startTime: '2024-08-24T00:00:00-12:00',
        endTime: '2024-08-24T00:00:00-14:00',
        cinemaHall: 1,
        movieID: 718821,
      },
    });

    await prisma.show.create({
      data: {
        showID: 8,
        date: '2024-08-24T00:09:00-05:00',
        startTime: '2024-08-24T00:00:00-15:00',
        endTime: '2024-08-24T00:00:00-17:00',
        cinemaHall: 1,
        movieID: 718821,
      },
    });

    await prisma.show.create({
      data: {
        showID: 9,
        date: '2024-08-24T00:09:00-05:00',
        startTime: '2024-08-24T00:00:00-18:00',
        endTime: '2024-08-24T00:00:00-20:00',
        cinemaHall: 1,
        movieID: 718821,
      },
    });

    await prisma.show.create({
      data: {
        showID: 10,
        date: '2024-08-24T00:09:00-05:00',
        startTime: '2024-08-24T00:00:00-21:00',
        endTime: '2024-08-24T00:20:00-23:00',
        cinemaHall: 1,
        movieID: 718821,
      },
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((err) => {
  console.warn('Error While generating Seed: \n', err);
});
