export let PopularAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(sort : POPULARITY_DESC, type: ANIME) {
				idMal
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					medium
        	large
        	extraLarge
				}
				description
				episodes
				season
				seasonYear
			}
		}
	}
`;

export let TrendingAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media (sort :TRENDING_DESC, type : ANIME){
				idMal
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					medium
        	large
        	extraLarge
				}
				description
				episodes
				genres
				season
				seasonYear
			}
		}
	}
`;

export let top100AnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media (sort :SCORE_DESC, type : ANIME){
				idMal
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					medium
        	large
        	extraLarge
				}
				description
				episodes
				season
				seasonYear
			}
		}
	}
`;

export let favouritesAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(sort: FAVOURITES_DESC, type: ANIME) {
				idMal
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					medium
					large
					extraLarge
				}
				description
				episodes
				season
				seasonYear
			}
		}
	}
`;

export let searchAnimeQuery = `
	query($search: String) {
		Page(page: 1, perPage: 100) {
			media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
				idMal
				title {
					romaji
					english
					native
					userPreferred
				}
				genres
				bannerImage
				coverImage {
					extraLarge
					large
				}
				season
				seasonYear
			}
		}
	}
`;

export let searchByIdQuery = `
	query($id: Int) {
		Media(idMal: $id, type: ANIME){
			title {
				romaji
				english
				native
				userPreferred
			}
			episodes
			type
			status
			genres
			season
			seasonYear
			description
			startDate {
				year
				month
				day
			}
			endDate {
				year
				month
				day
			}
			averageScore
			bannerImage
			coverImage {
				extraLarge
				large
			}
			relations{
				nodes{
					id
					idMal
					title{
						userPreferred
					}
					format
					type
					status(version:2)
					bannerImage
					coverImage{
						large
					}
				}
			}
			recommendations {
        nodes {
          mediaRecommendation {
						id
						idMal
						title{
							userPreferred
						}
						format
						type
						status(version:2)
						bannerImage
						coverImage{
							large
						}
          }
        }
      }
		}
	}
`;

export let searchWatchedId = `
	query($ids: [Int]) {
		Page(page: 1, perPage: 100) {
			media(idMal_in: $ids, type: ANIME, sort: SEARCH_MATCH){
				title {
					romaji
					userPreferred
					english
				}
				coverImage {
					large
					extraLarge
				}
				idMal
				season
				seasonYear
			}
		}
	}
`;

export let ListAnimeById = `
	query($ids: [Int], $perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			media(idMal_in: $ids, type: ANIME) {
				idMal
				title {
					romaji
					english
					native
					userPreferred
				}
				type
				genres
				bannerImage
				coverImage {
					medium
					large
				}
				season
				seasonYear
			}
		}
		genres: GenreCollection
	}
`;

export let GenresCollectionQuery = `
	{
		genres: GenreCollection
	}
`;
