import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import SearchCharacter from './SearchCharacter';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions';

const useStyles = makeStyles({
	card: {
		maxWidth: 250,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
	},
	titleHead: {
		borderBottom: '1px solid #1e8678',
		fontWeight: 'bold'
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row'
	},
	media: {
		height: '100%',
		width: '100%'
	},
	button: {
		color: '#1e8678',
		fontWeight: 'bold',
		fontSize: 12
	}
});
const CharacterList = (props) => {

	let card = null;
	let pagination = null;
	const regex = /(<([^>]+)>)/gi;
	const classes = useStyles();
	const [pageNum, setPageNum] = useState(Number(props.match.params.pagenum));
	const { loading, error, data } = useQuery(queries.GET_CHARACTERS, {
		variables: {
			pageNum: pageNum
		}
	});

	const dispatch = useDispatch();
	if (data && data.getCharacters) {
		dispatch(actions.changeShowingData(data.getCharacters));
	}

	const searchValue = async (value) => {
		if (value !== '') {
			dispatch(actions.changeSearchTerm(value));
		}
	};
	const stopSearching = async () => {
		dispatch(actions.resetSearchTerm());
		document.getElementById('searchTerm').value = ''
	}

	const bulidCard = (char) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={char.id}>
				<Card className={classes.card} variant='outlined'>
					<CardActionArea>
						<Link to={`/characters/${char.id}`}>
							<CardMedia
								className={classes.media}
								component='img'
								image={char.thumbnail ? `${char.thumbnail.path}/portrait_incredible.${char.thumbnail.extension}` : noImage}
								title='character image'
							/>

							<CardContent>
								<Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
									{char.name}
								</Typography>
								<Typography variant='body2' color='textSecondary' component='p'>
									{char.description ? char.description.replace(regex, '').substring(0, 150) + '...' : 'No Description   '}
								</Typography>
							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	/* pagination */
	if (Number(pageNum) === 0) {
		pagination =
			<div className='pagiDiv'>
				<Link className='paginations' onClick={() => setPageNum(pageNum + 1)} to={`/characters/page/${pageNum + 1}`} >Next page</Link>
			</div>
	} else if (Number(pageNum) === 74) {
		pagination =
			<div className='pagiDiv'>
				<Link className='paginations' onClick={() => setPageNum(pageNum - 1)} to={`/characters/page/${pageNum - 1}`} >Previous page</Link>
			</div>
	} else if (Number(pageNum) > 74) {
		pagination =
			<div>
				<h2>Error 404, there is no such characters</h2>
			</div>
	} else {
		pagination =
			<div className='pagiDiv'>
				<Link className='paginations' onClick={() => setPageNum(pageNum - 1)} to={`/characters/page/${pageNum - 1}`} >Previous page</Link>
				<span> | </span>
				<Link className='paginations' onClick={() => setPageNum(pageNum + 1)} to={`/characters/page/${pageNum + 1}`} >Next page</Link>
			</div>
	}

	const searchTerm = useSelector((state) => state.searchTerm);
	const showingData = useSelector((state) => state.data);
	const searchData = useSelector((state) => state.searchData);
	const searchLoading = useSelector((state) => state.loading);
	const searchError = useSelector((state) => state.error);

	if (searchTerm && searchTerm.trim() !== '') {
		card =
			searchData &&
			searchData.map((char) => {
				return bulidCard(char);
			});
	} else {
		card =
			showingData &&
			showingData.map((char) => {
				return bulidCard(char);
			});
	}


	if (data) {
		if (searchTerm && searchTerm.trim() !== '') {
			if (searchLoading) { //Loading
				return (
					<div>
						<h2><SearchCharacter searchValue={searchValue} /></h2>
						<button className="stop-search-button" onClick={() => stopSearching()}>Stop searching</button>
						<h2>Loading....</h2>
					</div>
				)
			} else if (searchError) { //error
				return (
					<div>
						<h2><SearchCharacter searchValue={searchValue} /></h2>
						<button className="stop-search-button" onClick={() => stopSearching()}>Stop searching</button>
						<h2>{error.message}</h2>
					</div>
				)
			} else {
				if (searchData.length === 0) { //loaded but no results
					return (
						<div>
							<h2><SearchCharacter searchValue={searchValue} /></h2>
							<button className="stop-search-button" onClick={() => stopSearching()}>Stop searching</button>
							<br />
							<h2>No such character, please try another search term!</h2>
						</div >
					);
				} else {
					return ( //loaded with results
						<div>
							<h2><SearchCharacter searchValue={searchValue} /></h2>
							<button className="stop-search-button" onClick={() => stopSearching()}>Stop searching</button>
							<br />
							<Grid container className={classes.grid} spacing={5}>
								{card}
							</Grid>
						</div >
					);
				}
			}
		} else {
			return (
				<div>
					<h2><SearchCharacter searchValue={searchValue} /></h2>
					<button className="stop-search-button" onClick={() => stopSearching()}>Stop searching</button>
					<br />
					{pagination}
					<br />
					<Grid container className={classes.grid} spacing={5}>
						{card}
					</Grid>
				</div >
			)
		}
	} else if (loading) {
		return (
			<div>
				{pagination} {/* incase user want to change page quickly without former page loaded */}
				<h2>Loading....</h2>
			</div>
		);
	} else if (error) {
		return (
			<div>
				<h2>Error 404, there is no such characters</h2>
				<p>{error.message}</p>
			</div>
		);
	}
};

export default CharacterList;