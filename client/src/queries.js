import { gql } from '@apollo/client';

const GET_CHARACTERS = gql`
    query getCharacterList($pageNum: Int){
        getCharacters(pageNum: $pageNum){
            id
            name
            thumbnail{
                extension
                path
            }
            description
            comics{
                items{
                    resourceURI
                    name
                }
            }
            series{
                items{
                    resourceURI
                    name
                }
            }
        }
    }
`;

const GET_CHARACTER_BY_ID = gql`
    query getSingleCharacter($id: Int){
        getCharacter(id: $id){
            id
            name
            thumbnail{
                extension
                path
            }
            description
            comics{
                items{
                    resourceURI
                    name
                }
            }
            series{
                items{
                    resourceURI
                    name
                }
            }
        }
    }
`;

const GET_COMICS = gql`
    query getComicsList($pageNum: Int){
        getComics(pageNum: $pageNum){
            id
            title
            thumbnail{
                extension
                path
            }
            description
            characters{
                items{
                    resourceURI
                    name
                }
            }
            series{
                resourceURI
                name
            }
        }
    }
`;

const GET_COMIC_BY_ID = gql`
    query getSingleComic($id: Int){
        getComic(id: $id){
            id
            title
            thumbnail{
                extension
                path
            }
            description
            characters{
                items{
                    resourceURI
                    name
                }
            }
            series{
                resourceURI
                name
            }
        }
    }
`;

const GET_SERIES = gql`
    query getSeriesList($pageNum: Int){
        getSeries(pageNum: $pageNum){
            id
            title
            thumbnail{
                extension
                path
            }
            description
            characters{
                items{
                    resourceURI
                    name
                }
            }
            comics{
                items{
                    resourceURI
                    name
                }
            }
        }
    }
`;

const GET_SERIE_BY_ID = gql`
    query getSingleSerie($id: Int){
        getSerie(id: $id){
            id
            title
            thumbnail{
                extension
                path
            }
            description
            characters{
                items{
                    resourceURI
                    name
                }
            }
            comics{
                items{
                    resourceURI
                    name
                }
            }
        }
    }
`;

const SEARCH_CHARACTERS = gql`
    query searchCharacterList($searchTerm: String){
        searchCharacters(searchTerm: $searchTerm){
            id
            name
            thumbnail{
                extension
                path
            }
            description
            comics{
                items{
                    resourceURI
                    name
                }
            }
            series{
                items{
                    resourceURI
                    name
                }
            }
        }
    }
`;

const SEARCH_COMICS = gql`
    query searchComicList($searchTerm: String){
        searchComics(searchTerm: $searchTerm){
            id
            title
            thumbnail{
                extension
                path
            }
            description
            characters{
                items{
                    resourceURI
                    name
                }
            }
            series{
                resourceURI
                name
            }
        }
    }
`;

const SEARCH_SERIES = gql`
    query searchSerieList($searchTerm: String){
        searchSeries(searchTerm: $searchTerm){
            id
            title
            thumbnail{
                extension
                path
            }
            description
            characters{
                items{
                    resourceURI
                    name
                }
            }
            comics{
                items{
                    resourceURI
                    name
                }
            }
        }
    }
`;

export default {
    GET_CHARACTERS,
    GET_CHARACTER_BY_ID,
    GET_COMICS,
    GET_COMIC_BY_ID,
    GET_SERIES,
    GET_SERIE_BY_ID,
    SEARCH_CHARACTERS,
    SEARCH_COMICS,
    SEARCH_SERIES
};