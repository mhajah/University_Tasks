import requests
import sys

API_BASE_URL = 'http://127.0.0.1:5000/api/movies'

def api_get_movies():
    response = requests.get(API_BASE_URL)
    return response.json()

def api_add_movie(title, director_id, release_year, length):
    payload = {'title': title, 
               'director_id': director_id, 
               'release_year': release_year, 
               'movie_length': length}
    response = requests.post(API_BASE_URL, json=payload)
    print(response.json())

def api_delete_movie(movie_id):
    response = requests.delete(f'{API_BASE_URL}/{movie_id}')
    print(response.json())

def api_update_movie(movie_id, title):
    payload = {'title': title}
    response = requests.put(f'{API_BASE_URL}/{movie_id}', json=payload)
    print(response.json())