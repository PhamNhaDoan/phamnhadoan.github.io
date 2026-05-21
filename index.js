const baseUrl = "https://phim.nguonc.com/api";

async function getHome() {
    const res = await fetch(`${baseUrl}/films/phim-moi-cap-nhat?page=1`);
    const json = await res.json();
    return json.items.map(item => ({
        name: item.name,
        url: `${baseUrl}/film/${item.slug}`,
        poster: item.thumb_url
    }));
}

async function search(query) {
    const res = await fetch(`${baseUrl}/films/search?keyword=${encodeURIComponent(query)}`);
    const json = await res.json();
    return json.items.map(item => ({
        name: item.name,
        url: `${baseUrl}/film/${item.slug}`,
        poster: item.thumb_url
    }));
}

async function loadDetail(url) {
    const res = await fetch(url);
    const json = await res.json();
    const movie = json.movie;
    
    const episodes = json.episodes.flatMap(server => 
        server.items.map(ep => ({
            name: `Tập ${ep.name}`,
            url: ep.embed, // Hoặc ep.m3u8 tùy thuộc vào dữ liệu API trả về
            description: movie.description
        }))
    );

    return {
        name: movie.name,
        poster: movie.thumb_url,
        description: movie.description,
        episodes: episodes
    };
}

module.exports = { getHome, search, loadDetail };
