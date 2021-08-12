const changeShowingData = (data) => ({
    type: 'CHANGE_DATA',
    payload: {
        data: data
    }
})

const changeSearchTerm = (searchTerm) => ({
    type: 'CHANGE_SEARCHTERM',
    payload: {
        searchTerm: searchTerm
    }
})

const resetSearchTerm = () => ({
    type: 'RESET_SEARCHTERM',
})

const changeSearchData = (searchData) => ({
    type: 'CHANGE_TO_SEARCHDATA',
    payload: {
        searchData: searchData
    }
})

const isloading = () => ({
    type: 'LOADING'
})

const isloaded = () => ({
    type: 'LOADED'
})

const error = (error) => ({
    type: 'ERROR',
    payload: {
        error: error
    }
})

module.exports = {
    changeShowingData,
    changeSearchTerm,
    changeSearchData,
    resetSearchTerm,
    isloading,
    isloaded,
    error
}