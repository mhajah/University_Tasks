from flask import Flask, jsonify, request
import sqlite3
from flask import g

app = Flask(__name__)
DATABASE = 'movies.db'

def connect_db():
    return sqlite3.connect(DATABASE)

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

def get_db():
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

@app.route('/api/movies', methods=['GET'])
def get_movies():
    db = get_db()
    cur = db.execute('SELECT * FROM Movies')
    movies = cur.fetchall()
    return jsonify(movies)

@app.route('/api/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    db = get_db()
    cur = db.execute('SELECT * FROM Movies WHERE MovieID = ?', (movie_id,))
    movie = cur.fetchone()
    if movie:
        return jsonify(movie)
    else:
        return jsonify({'error': 'Movie not found'}), 404
    
@app.route('/api/movies', methods=['POST'])
def add_movie():
    if not request.json or 'title' not in request.json:
        return jsonify({'error': 'Title is required'}), 400
    
    db = get_db()
    db.execute(f"INSERT INTO Movies VALUES (NULL, '{request.json["title"]}', '{request.json["director_id"]}', '{request.json["release_year"]}', '{request.json["movie_length"]}')")
    db.commit()

    cur = db.execute('SELECT last_insert_rowid()')
    new_movie_id = cur.fetchone()

    return jsonify(new_movie_id)

@app.route('/api/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    db = get_db()
    cur = db.execute('SELECT MovieID FROM movies WHERE MovieID = ?', (movie_id,))
    movie = cur.fetchone()
    if not movie:
        return jsonify({'error': 'Movie not found'}), 404

    db.execute(f"DELETE FROM Movies WHERE MovieID = {movie_id}")
    db.commit()

    return jsonify({'message': 'Movie deleted successfully'})

@app.route('/api/movies/<int:movie_id>', methods=['PUT'])
def update_movie(movie_id):
    db = get_db()
    cur = db.execute('SELECT MovieID FROM Movies WHERE MovieID = ?', (movie_id,))
    movie = cur.fetchone()
    if not movie:
        return jsonify({'error': 'Movie not found'}), 404

    if not request.json or 'title' not in request.json:
        return jsonify({'error': 'Title is required'}), 400

    db.execute('UPDATE Movies SET Title = ? WHERE MovieID = ?', (request.json['title'], movie_id))
    db.commit()

    return jsonify({'id': movie_id, 'title': request.json['title']})

if __name__ == '__main__':
    app.run(debug=True)