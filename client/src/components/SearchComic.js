import React from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions';

const SearchComic = (props) => {
	const searchTerm = useSelector((state) => state.searchTerm);
	const { loading, error, data } = useQuery(queries.SEARCH_COMICS, {
		variables: {
			searchTerm: searchTerm ? searchTerm : 'default searchTerm to prevent empty string error(no results)'
		}
	});
	const dispatch = useDispatch();

	if (loading) {
		dispatch(actions.isloading());
	} else if (error) {
		dispatch(actions.error(error));
	} else if (data && data.searchComics) {
		dispatch(actions.isloaded());
		dispatch(actions.changeSearchData(data.searchComics));
	}

	const handleChange = (e) => {
		props.searchValue(e.target.value);
	};

	return (
		<form
			method='POST '
			onSubmit={(e) => {
				e.preventDefault();
			}}
			name='formName'
			className='center'
		>
			<label>
				<span>Search by start with: </span>
				<input autoComplete='off' type='text' name='searchTerm' id='searchTerm' onChange={(e) => handleChange(e)} />
			</label>
		</form>
	);
};

export default SearchComic;