import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import SearchComic from './SearchComic';
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
const ComicList = (props) => {

	let card = null;
	let pagination = null;
	const regex = /(<([^>]+)>)/gi;
	const classes = useStyles();
	const [pageNum, setPageNum] = useState(Number(props.match.params.pagenum));
	const { loading, error, data } = useQuery(queries.GET_COMICS, {
		variables: {
			pageNum: pageNum
		}
	});

	const dispatch = useDispatch();
	if (data && data.getComics) {
		dispatch(actions.changeShowingData(data.getComics));
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

	const bulidCard = (comic) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={comic.id}>
				<Card className={classes.card} variant='outlined'>
					<CardActionArea>
						<Link to={`/comics/${comic.id}`}>
							<CardMedia
								className={classes.media}
								component='img'
								image={comic.thumbnail ? `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}` : noImage}
								title='comic image'
							/>

							<CardContent>
								<Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
									{comic.title}
								</Typography>
								<Typography variant='body2' color='textSecondary' component='p'>
									{comic.description ? comic.description.replace(regex, '').substring(0, 150) + '...' : 'No Description   '}
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
				<Link className='paginations' onClick={() => setPageNum(pageNum + 1)} to={`/comics/page/${pageNum + 1}`} >Next page</Link>
			</div>
	} else if (Number(pageNum) === 74) {
		pagination =
			<div className='pagiDiv'>
				<Link className='paginations' onClick={() => setPageNum(pageNum - 1)} to={`/comics/page/${pageNum - 1}`} >Previous page</Link>
			</div>
	} else if (Number(pageNum) > 74) {
		pagination =
			<div>
				<h2>Error 404, there is no such comics</h2>
			</div>
	} else {
		pagination =
			<div className='pagiDiv'>
				<Link className='paginations' onClick={() => setPageNum(pageNum - 1)} to={`/comics/page/${pageNum - 1}`} >Previous page</Link>
				<span> | </span>
				<Link className='paginations' onClick={() => setPageNum(pageNum + 1)} to={`/comics/page/${pageNum + 1}`} >Next page</Link>
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
			searchData.map((comic) => {
				return bulidCard(comic);
			});
	} else {
		card =
			showingData &&
			showingData.map((comic) => {
				return bulidCard(comic);
			});
	}


	if (data) {
		if (searchTerm && searchTerm.trim() !== '') {
			if (searchLoading) { //Loading
				return (
					<div>
						<h2><SearchComic searchValue={searchValue} /></h2>
						<button className="stop-search-button" onClick={() => stopSearching()}>Stop searching</button>
						<h2>Loading....</h2>
					</div>
				)
			} else if (searchError) { //error
				return (
					<div>
						<h2><SearchComic searchValue={searchValue} /></h2>
						<button className="stop-search-button" onClick={() => stopSearching()}>Stop searching</button>
						<h2>{error.message}</h2>
					</div>
				)
			} else {
				if (searchData.length === 0) { //loaded but no results
					return (
						<div>
							<h2><SearchComic searchValue={searchValue} /></h2>
							<button className="stop-search-button" onClick={() => stopSearching()}>Stop searching</button>
							<br />
							<h2>No such comic, please try another search term!</h2>
						</div >
					);
				} else {
					return ( //loaded with results
						<div>
							<h2><SearchComic searchValue={searchValue} /></h2>
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
					<h2><SearchComic searchValue={searchValue} /></h2>
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
				<h2>Error 404, there is no such comics</h2>
				<p>{error.message}</p>
			</div>
		);
	}
};

export default ComicList;