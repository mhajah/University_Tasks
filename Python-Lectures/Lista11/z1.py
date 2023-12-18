from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
import argparse

Base = declarative_base()

class Director(Base):
    __tablename__ = 'Directors'

    DirectorID = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    FirstName = Column(String(50))
    LastName = Column(String(50))
    Nationality = Column(String(50))

    movies = relationship("Movie", back_populates="director")

class Genre(Base):
    __tablename__ = 'Genres'

    GenreID = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    GenreName = Column(String(50))

    movies = relationship("MovieGenre", back_populates="genre")

class Movie(Base):
    __tablename__ = 'Movies'

    MovieID = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    Title = Column(String(100))
    DirectorID = Column(Integer, ForeignKey('Directors.DirectorID'))
    ReleaseYear = Column(Integer)
    MovieLength = Column(Integer)

    director = relationship("Director", back_populates="movies")
    genres = relationship("MovieGenre", back_populates="movie")

class MovieGenre(Base):
    __tablename__ = 'MovieGenres'

    MovieID = Column(Integer, ForeignKey('Movies.MovieID'), primary_key=True)
    GenreID = Column(Integer, ForeignKey('Genres.GenreID'), primary_key=True)

    movie = relationship("Movie", back_populates="genres")
    genre = relationship("Genre", back_populates="movies")

engine = create_engine('sqlite:///movies.db', echo=False)
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

def add_movie(title, director_id, release_year, movie_length):
    movie = Movie(Title=title, DirectorID=director_id, ReleaseYear=release_year, MovieLength=movie_length)
    session.add(movie)
    session.commit()

def list_movies():
    movies = session.query(Movie).all()
    for movie in movies:
        genres = ', '.join([moviegenre.genre.GenreName for moviegenre in movie.genres])
        print(f"({movie.MovieID}) Title: {movie.Title}, \n Director: {movie.director.FirstName} {movie.director.LastName},\n Genres: {genres}")

def add_director(firstname, lastname, nationality):
    director = Director(FirstName=firstname, LastName=lastname, Nationality=nationality)
    session.add(director)
    session.commit()

def list_directors():
    directors = session.query(Director).all()
    for director in directors:
        print(f"({director.DirectorID}) {director.FirstName} {director.LastName}, {director.Nationality}")

def add_genre(name):
    genre = Genre(GenreName=name)
    session.add(genre)
    session.commit()

def list_genres():
    genres = session.query(Genre).all()
    for genre in genres:
        print(f"({genre.GenreID}) {genre.GenreName}")

def bind_movie(movieID, genreID):
    binder = MovieGenre(MovieID=movieID, GenreID=genreID)
    session.add(binder)
    session.commit()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Manage movies.')
    parser.add_argument('entity', choices=['movies', 'directors', 'genres'], help='Entity name')
    parser.add_argument('action', choices=['add', 'list', 'bind'], help='Action to perform')
    parser.add_argument('--title', help='Movie title')
    parser.add_argument('--director_id', type=int, help='Director ID')
    parser.add_argument('--release_year', type=int, help='Release year')
    parser.add_argument('--movie_length', type=int, help='Movie length')

    parser.add_argument('--first_name', help="Director's First Name")
    parser.add_argument('--last_name', help="Director's Last Name")
    parser.add_argument('--nationality', help="Director's nationality")

    parser.add_argument('--genre_name', help="Genre's name")
    parser.add_argument('--movie_id', type=int, help="Movie's id")
    parser.add_argument('--genre_id', type=int, help="genre's id")

    args = parser.parse_args()

    if args.entity == 'movies':
        if args.action == 'add':
            add_movie(args.title, args.director_id, args.release_year, args.movie_length)
        elif args.action == 'list':
            list_movies()

    if args.entity == 'directors':
        if args.action == 'add':
            add_director(args.first_name, args.last_name, args.nationality)
        if args.action == "list":
            list_directors()

    if args.entity == 'genres':
        if args.action == 'add':
            add_genre(args.genre_name)
        if args.action == "list":
            list_genres()
        if args.action == 'bind':
            bind_movie(args.movie_id, args.genre_id)