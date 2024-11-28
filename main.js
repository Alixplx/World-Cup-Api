const token = '75b0d6021a304674955b3a41bc612931'
const baseUrl = 'https://api.football-data.org/v4/competitions/2000'

const standingElement = document.getElementById('standings')
const matchesElement = document.getElementById('matches')


function getStandings() {

    const url = `${baseUrl}/standings`

    axios.get(url, {

        headers: {

            "X-Auth-Token": token
        }

    }).then((response) => {

        const standings = response.data.standings
        
        standingElement.innerHTML = ''

        for (let standing of standings) {

            let tableContent = ''

            for (row of standing.table) {

                tableContent += `

                    <li class="list-group-item">
                                
                        <div class="row m-0 table_teams">

                            <div class="col-sm-4 d-flex justify-content-center align-items-center"> 
                                        
                                <span class="flag"> <img class="rounded-circle border border-2" src="${row.team.crest}"</span>

                                <h5 class="m-auto">${row.team.tla}</h5>
                            </div>
                                    
                            <div class="col-sm-2">${row.won}</div>
                            <div class="col-sm-2">${row.lost}</div>
                            <div class="col-sm-2">${row.draw}</div>
                            <div class="col-sm-2">${row.points}</div>
                        </div>
                    </li>
                `
            }

            const content = `
                
                <div class="col-sm-6 mb-3">

                    <div class="card shadow border-none">

                        <div class="card-header">${standing.group}</div>

                        <div class="row m-0 table_names">

                            <div class="col-sm-4">Team</div>
                            <div class="col-sm-2">W</div>
                            <div class="col-sm-2">L</div>
                            <div class="col-sm-2">D</div>
                            <div class="col-sm-2">Pts</div>
                        </div>

                        <ul class="list-group list-group-flush">

                            ${tableContent}
                        </ul>
                    </div>

                </div>
                `

            standingElement.innerHTML += content
        }
    })
}


function getMatches() {

    const url = `${baseUrl}/matches`

    axios.get(url, {

        headers: {

            "X-Auth-Token": token
        }

    }).then((response) => {

        const matches = response.data.matches

        matchesElement.innerHTML = ''

        for (let match of matches) {

            const homeTeam = match.homeTeam
            const awayTeam = match.awayTeam

            const utcDate = match.utcDate
            const matchTime = new Date(utcDate)
            const dateString = matchTime.getUTCFullYear() + " /" + (matchTime.getUTCMonth()+1) + "/" + 
                               matchTime.getUTCDate() + "----" + matchTime.getUTCHours() + " : " + matchTime.getUTCMinutes()+0

            if (homeTeam.name == null) {

                continue
            }

            matchesElement.innerHTML += `
            
                <div class="col-sm-12 mb-4">

                    <div class="card shadow rounded-pill">

                        <div class="card-body p-0">

                            <div class="row">

                                <div class="list_one col-sm-3 d-flex flex-direction-column justify-content-center align-items-center">

                                    <div class="d-flex align-items-center justify-content-center">

                                        <div>

                                            <div class="flag">
    
                                                <img src="${homeTeam.crest}" class="rounded-circle">
                                            </div>
        
                                            <h5>${homeTeam.tla}</h5>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div class="list_two col-sm-6">

                                    <div class="row"> 

                                        <div class="col-sm-4" style="margin: auto 0px"> 
                                        
                                            <h3>${match.score.fullTime.home ?? "-"}</h3>
                                        </div>
                                        <div class="col-sm-4" style="margin: auto 0px"> 

                                            <h6>${match.group}</h6>
                                            <h1>X</h1>
                                            <h6>${dateString}</h6>
                                        </div>
                                        <div class="col-sm-4" style="margin: auto 0px"> 
                                        
                                            <h3>${match.score.fullTime.away ?? "-"}</h3> 
                                        </div>
                                    </div>
                                </div>
                                
                                <div style="border-left: solid 5px #5b0d25;" class="list_one col-sm-3 d-flex flex-direction-column justify-content-center align-items-center">

                                    <div class="d-flex align-items-center justify-content-center">

                                        <div>

                                            <div class="flag">
    
                                                <img src="${awayTeam.crest}" class="rounded-circle">
                                            </div>
        
                                            <h5>${awayTeam.tla}</h5>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            `
        }
    })


}

getStandings()
getMatches()