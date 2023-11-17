# pip install requests, pip install beatifulsoup
# biblioteki z wykladu
import requests
from bs4 import BeautifulSoup

def crawl(start_page, distance, action):
    visited_urls = set()

    def process_page(url):
        if url in visited_urls:
            return None

        visited_urls.add(url)
        try:
            response = requests.get(url)
            response.raise_for_status()
            content = response.text
            result = action(content)
            return result
        except Exception as e:
            print(f"Error processing {url}: {e}")
            return None

    def get_links_from_page(url):
        try:
            response = requests.get(url)
            response.raise_for_status()
            content = response.text
            soup = BeautifulSoup(content, 'html.parser')
            links = [a['href'] for a in soup.find_all('a', href=True)]
            return links
        except Exception as e:
            print(f"Error getting links from {url}: {e}")
            return []

    queue = [(start_page, 0)]

    while queue:
        current_url, current_distance = queue.pop(0)

        if current_distance <= distance:
            result = process_page(current_url)
            if result is not None:
                yield (current_url, result)

            links = get_links_from_page(current_url)
            for link in links:
                next_url = link if link.startswith('http') else start_page + link
                queue.append((next_url, current_distance + 1))

for url, wynik in crawl("http://www.ii.uni.wroc.pl", 1, lambda tekst: 'Python' in tekst):
    print(f"{url}: {wynik}")
