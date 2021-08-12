const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const publickey = '04748c91df8ca4fb1140cac082993f08';
const privatekey = '7a24bb7cde068a744f9bfc57f3608b8e405f31a2';
const baseUrl = 'https://gateway.marvel.com:443/v1/public/';


/* data fetch functions */
const fetchCharacters = async (pageNum) => {
    try {
        const md5 = require('blueimp-md5');
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const url = baseUrl + 'characters?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + '&offset=' + pageNum * 20;
        const { data } = await axios.get(url);
        return data.data.results;
    } catch (e) {
        console.log(e)
    }
}

const fetchCharacterById = async (id) => {
    try {
        const md5 = require('blueimp-md5');
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const url = baseUrl + 'characters?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + '&id=' + id;
        const { data } = await axios.get(url);
        return data.data.results[0];
    } catch (e) {
        console.log(e)
    }
}

const fetchComics = async (pageNum) => {
    try {
        const md5 = require('blueimp-md5');
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const url = baseUrl + 'comics?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + '&offset=' + pageNum * 20;
        const { data } = await axios.get(url);
        return data.data.results;
    } catch (e) {
        console.log(e)
    }
}

const fetchComicById = async (id) => {
    try {
        const md5 = require('blueimp-md5');
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const url = baseUrl + 'comics?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + '&id=' + id;
        const { data } = await axios.get(url);
        return data.data.results[0];
    } catch (e) {
        console.log(e)
    }
}

const fetchSeries = async (pageNum) => {
    try {
        const md5 = require('blueimp-md5');
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const url = baseUrl + 'series?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + '&offset=' + pageNum * 20;
        const { data } = await axios.get(url);
        return data.data.results;
    } catch (e) {
        console.log(e)
    }
}

const fetchSerieById = async (id) => {
    try {
        const md5 = require('blueimp-md5');
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const url = baseUrl + 'series?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + '&id=' + id;
        const { data } = await axios.get(url);
        return data.data.results[0];
    } catch (e) {
        console.log(e)
    }
}

const searchCharacters = async (searchTerm) => {
    try {
        const md5 = require('blueimp-md5');
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const url = baseUrl + 'characters?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + '&nameStartsWith=' + searchTerm;
        const { data } = await axios.get(url);
        return data.data.results;
    } catch (e) {
        console.log(e)
    }
}

const searchComics = async (searchTerm) => {
    try {
        const md5 = require('blueimp-md5');
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const url = baseUrl + 'comics?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + '&titleStartsWith=' + searchTerm;
        const { data } = await axios.get(url);
        return data.data.results;
    } catch (e) {
        console.log(e)
    }
}

const searchSeries = async (searchTerm) => {
    try {
        const md5 = require('blueimp-md5');
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const url = baseUrl + 'series?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + '&titleStartsWith=' + searchTerm;
        const { data } = await axios.get(url);
        return data.data.results;
    } catch (e) {
        console.log(e)
    }
}

const typeDefs = gql`
    type Query {
        getCharacters(pageNum: Int): [Character]
        getComics(pageNum: Int): [Comic]
        getSeries(pageNum: Int): [Serie]
        getCharacter(id: Int): Character
        getComic(id: Int): Comic
        getSerie(id: Int): Serie
        searchCharacters(searchTerm: String): [Character]
        searchComics(searchTerm: String): [Comic]
        searchSeries(searchTerm: String): [Serie]
    }

    type Character {
        id: Int!
        name: String!
        thumbnail: Thumbnail
        description: String
        comics: RelatedComics
        series: RelatedSeries
    }

    type Comic {
        id: Int!
        title: String!
        thumbnail: Thumbnail
        description: String
        characters: RelatedCharacters
        series: RelatedSerie
    }

    type Serie {
        id: Int!
        title: String!
        thumbnail: Thumbnail
        description: String
        characters: RelatedCharacters
        comics: RelatedComics
    }

    type Thumbnail {
        extension: String
        path: String
    }

    type RelatedCharacters {
        items: [RelatedCharacter]
    }

    type RelatedCharacter {
        resourceURI: String!
        name: String!
    }

    type RelatedComics {
        items: [RelatedComic]
    }

    type RelatedComic {
        resourceURI: String!
        name: String!
    }

    type RelatedSeries {
        items: [RelatedSerie]
    }

    type RelatedSerie {
        resourceURI: String!
        name: String!
    }
`

const resolvers = {
    Query: {
        getCharacters: async (_, args) => {
            const redisData = await client.HGETAsync('characters', args.pageNum);
            if (redisData) {
                console.log('from redis')
                return JSON.parse(redisData);
            } else {
                console.log('from api')
                const apiData = await fetchCharacters(args.pageNum);
                const jsonApiData = JSON.stringify(apiData);
                await client.HSETAsync('characters', args.pageNum, jsonApiData);
                return apiData;
            }
        },
        getComics: async (_, args) => {
            const redisData = await client.HGETAsync('comics', args.pageNum);
            if (redisData) {
                console.log('from redis')
                return JSON.parse(redisData);
            } else {
                console.log('from api')
                const apiData = await fetchComics(args.pageNum);
                const jsonApiData = JSON.stringify(apiData);
                await client.HSETAsync('comics', args.pageNum, jsonApiData);
                return apiData;
            }
        },
        getSeries: async (_, args) => {
            const redisData = await client.HGETAsync('series', args.pageNum);
            if (redisData) {
                console.log('from redis')
                return JSON.parse(redisData);
            } else {
                console.log('from api')
                const apiData = await fetchSeries(args.pageNum);
                const jsonApiData = JSON.stringify(apiData);
                await client.HSETAsync('series', args.pageNum, jsonApiData);
                return apiData;
            }
        },
        getCharacter: async (_, args) => {
            const redisData = await client.HGETAsync('characterById', args.id);
            if (redisData) {
                console.log('from redis')
                return JSON.parse(redisData);
            } else {
                console.log('from api')
                const apiData = await fetchCharacterById(args.id);
                const jsonApiData = JSON.stringify(apiData);
                await client.HSETAsync('characterById', args.id, jsonApiData);
                return apiData;
            }
        },
        getComic: async (_, args) => {
            const redisData = await client.HGETAsync('comicById', args.id);
            if (redisData) {
                console.log('from redis')
                return JSON.parse(redisData);
            } else {
                console.log('from api')
                const apiData = await fetchComicById(args.id);
                const jsonApiData = JSON.stringify(apiData);
                await client.HSETAsync('comicById', args.id, jsonApiData);
                return apiData;
            }
        },
        getSerie: async (_, args) => {
            const redisData = await client.HGETAsync('serieById', args.id);
            if (redisData) {
                console.log('from redis')
                return JSON.parse(redisData);
            } else {
                console.log('from api')
                const apiData = await fetchSerieById(args.id);
                const jsonApiData = JSON.stringify(apiData);
                await client.HSETAsync('serieById', args.id, jsonApiData);
                return apiData;
            }
        },
        searchCharacters: async (_, args) => {
            const redisData = await client.HGETAsync('searchCharacters', args.searchTerm);
            if (redisData) {
                console.log('from redis')
                return JSON.parse(redisData);
            } else {
                console.log('from api')
                const apiData = await searchCharacters(args.searchTerm);
                const jsonApiData = JSON.stringify(apiData);
                await client.HSETAsync('searchCharacters', args.searchTerm, jsonApiData);
                return apiData;
            }
        },
        searchComics: async (_, args) => {
            const redisData = await client.HGETAsync('searchComics', args.searchTerm);
            if (redisData) {
                console.log('from redis')
                return JSON.parse(redisData);
            } else {
                console.log('from api')
                const apiData = await searchComics(args.searchTerm);
                const jsonApiData = JSON.stringify(apiData);
                await client.HSETAsync('searchComics', args.searchTerm, jsonApiData);
                return apiData;
            }
        },
        searchSeries: async (_, args) => {
            const redisData = await client.HGETAsync('searchSeries', args.searchTerm);
            if (redisData) {
                console.log('from redis')
                return JSON.parse(redisData);
            } else {
                console.log('from api')
                const apiData = await searchSeries(args.searchTerm);
                const jsonApiData = JSON.stringify(apiData);
                await client.HSETAsync('searchSeries', args.searchTerm, jsonApiData);
                return apiData;
            }
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} 🚀`)
});