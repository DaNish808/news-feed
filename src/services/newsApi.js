const apiKey = '828a05f2cb2243c7bd38e36e7aceb9e5';
const pathTopHeadlines = 'https://newsapi.org/v2/top-headlines';
const pathEverything = 'https://newsapi.org/v2/everything';


// export async function getTopNews(category = 'general') {
//     const url = `${pathTopHeadlines}?apikey=${apiKey}` +
//         'country=us&' +
//         `category=&{category}` + 
//         `apikey=${apiKey}`;
    
//     const response = await fetch(url);
//     return response.json();
// }

export async function searchNews(searchTerm, page = 1, todayOnly = false, byPopularity = false) {
    const today = new Date();
    const url = `${pathEverything}?` +
        `q=${searchTerm}&` +
        'language=en&' +
        'pageSize=10&' +
        `page=${page}&` +
        (byPopularity ? 
            'sortBy=popularity&' : 
            '') +
        (todayOnly ? 
            `from=${today.getYear() + 1900}-${today.getMonth() + 1}-${today.getDate()}&` :
            '') +
        `apikey=${apiKey}`;

    const response = await fetch(url);
    return response.json();
}