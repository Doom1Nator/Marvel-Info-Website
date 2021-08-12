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

const Character = (props) => {

	const regex = /(<([^>]+)>)/gi;
	const classes = useStyles();
	const dispatch = useDispatch();
	const { loading, error, data } = useQuery(queries.GET_CHARACTER_BY_ID, {
		variables: {
			id: Number(props.match.params.id)
		}
	});

	if (data && data.getCharacter) {
		dispatch(actions.changeShowingData(data.getCharacter));
	}
	const showingData = useSelector((state) => state.data);

	if (data) {
		return (
			<Card className={classes.card} variant="outlined">
				<CardHeader className={classes.titleHead} title={showingData.name} />
				<CardMedia
					className={classes.media}
					component="img"
					image={showingData.thumbnail ? `${showingData.thumbnail.path}/landscape_incredible.${showingData.thumbnail.extension}` : noImage}
					title="character image"
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
							<dt className="title">Related Comics:</dt>
							{showingData && showingData.comics && showingData.comics.items.length !== 0 ? (
								<dd>
									<ul>
										{showingData.comics.items.map((child) => {
											var comicId = child.resourceURI.split("/")[6];
											return <li key={comicId}><Link key={comicId} className="navlink" to={`/comics/${comicId}`}>{child.name}</Link></li>
										})}
									</ul>
								</dd>
							) : (
								<dd>N/A</dd>
							)}
						</dl>

						<dl>
							<dt className="title">Related Series:</dt>
							{showingData && showingData.series && showingData.series.items.length !== 0 ? (
								<dd>
									<ul>
										{showingData.series.items.map((child) => {
											var serieId = child.resourceURI.split("/")[6];
											return <li key={serieId}><Link key={serieId} className="navlink" to={`/series/${serieId}`}>{child.name}</Link></li>
										})}
									</ul>
								</dd>
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
				<h2>Error 404, there is no such character</h2>
				<p>{error.message}</p>
			</div>
		);
	}
};

export default Character;
