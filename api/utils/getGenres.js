
function getGenres(data) {
    const arrayGenres = data.results
    const genres = []
    arrayGenres.forEach(obj => {
        genres.push(obj.name)
    });
    return genres
}

function getGenderDb(data) {
    const genres = []
    data.forEach(obj => {
        genres.push(obj.name)
    });
    return genres
}

module.exports = {
    getGenres,
    getGenderDb
}