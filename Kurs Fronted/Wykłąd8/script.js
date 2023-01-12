const getData =  async () => {
    const response = await fetch('http://localhost:3000/books', {
        method: 'GET',
        headers: {
            'Content-Type': 'applcation/json'
        }
    })
    const data = await response.json()

}
