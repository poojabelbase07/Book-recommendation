// Function to fetch books from the server based on the search term (genre)
async function fetchBooks() {
    const genre = document.getElementById('genre').value; // Get the input value
    const response = await fetch(`/api/books?genre=${genre}`);
    const data = await response.json();
  
    // Clear previous results
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
  
    // Handle no results
    if (!data || data.length === 0) {
      const noResults = document.createElement('div');
      noResults.id = 'no-results';
      noResults.textContent = 'Sorry, result not found.';
      bookList.appendChild(noResults);
      return;
    }
  
    // Display the fetched books
    data.forEach((book) => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
  
      const title = book.volumeInfo.title || 'No Title Available';
      const authors = book.volumeInfo.authors
        ? book.volumeInfo.authors.join(', ')
        : 'Unknown';
      const categories = book.volumeInfo.categories
        ? book.volumeInfo.categories.join(', ')
        : 'Unknown';
      const description = book.volumeInfo.description || 'No description available.';
  
      // Populate the card with book details
      bookCard.innerHTML = `
        <h3>${title}</h3>
        <p class="author"><strong>Author:</strong> ${authors}</p>
        <p class="genre"><strong>Genre:</strong> ${categories}</p>
        <p class="description">${description}</p>
      `;
  
      bookList.appendChild(bookCard);
    });
  }
  