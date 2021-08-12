import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import '../App.css';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions';
const useStyles = makeStyles({
	card: {
		maxWidth: 550,
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

const Comic = (props) => {

	const regex = /(<([^>]+)>)/gi;
	const classes = useStyles();
	const dispatch = useDispatch();
	const { loading, error, data } = useQuery(queries.GET_COMIC_BY_ID, {
		variables: {
			id: Number(props.match.params.id)
		}
	});

	if (data && data.getComic) {
		dispatch(actions.changeShowingData(data.getComic));
	}
	const showingData = useSelector((state) => state.data);

	if (data) {
		return (
			<Card className={classes.card} variant="outlined">
				<CardHeader className={classes.titleHead} title={showingData.title} />
				<CardMedia
					className={classes.media}
					component="img"
					image={showingData.thumbnail ? `${showingData.thumbnail.path}/landscape_incredible.${showingData.thumbnail.extension}` : noImage}
					title="comic image"
				/>

				<CardContent>
					<Typography variant="body2" color="textSecondary" component="span">
						<dl>
							<dt className="title">Description:</dt>
							{showingData && showingData.description ? (
								<dd>{showingData.description.replace(regex, '')}</dd>
							) : (
								<dd>No description</dd>
							)}
						</dl>
						<dl>
							<dt className="title">PageCount:</dt>
							{showingData && showingData.pageCount ? (
								<dd>{showingData.pageCount}</dd>
							) : (
								<dd>No page count</dd>
							)}
						</dl>
						<dl>
							<dt className="title">Related Characters:</dt>
							{showingData && showingData.characters && showingData.characters.items.length !== 0 ? (
								<dd>
									<ul>
										{showingData.characters.items.map((child) => {
											var charId = child.resourceURI.split("/")[6];
											return <li key={charId}><Link key={charId} className="navlink" to={`/characters/${charId}`}>{child.name}</Link></li>
										})}
									</ul>
								</dd>
							) : (
								<dd>N/A</dd>
							)}
						</dl>

						<dl>
							<dt className="title">Related Series:</dt>
							{showingData && showingData.series ? (
								<dd><Link key={showingData.series.resourceURI.split("/")[6]} className="navlink"
									to={`/series/${showingData.series.resourceURI.split("/")[6]}`}>{showingData.series.name}</Link></dd>
							) : (
								<dd>N/A</dd>
							)}
						</dl>
					</Typography>
				</CardContent>
			</Card>
		);
	} else if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else if (error) {
		return (
			<div>
				<h2>Error 404, there is no such comic</h2>
				<p>{error.message}</p>
			</div>
		);
	}
};

export default Comic;


