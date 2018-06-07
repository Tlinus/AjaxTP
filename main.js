(function() {

var data = {};
var tableTeams =  document.getElementById('tableTeams');
var selectCountry = document.getElementById('selectCountry');
var searchInput = document.getElementById('search');

function  init(){
  fetch('http://localhost:5000/teams')
  .then(res => res.json())
  .then(teams => {

    data.teams = teams;
    data.teamsToDisplays = data.teams;
    CreateTableTeams();
    CreateSelectCountry();

  })

}


function CreateTableTeams(){
  let header = '<tr><th>Blason</th><th>Equipe</th><th>Pays</th><th>Stade</th><th>coach</th><th>Date de création</th><th>coupes</tr>';
  let s = '<table class="table table-bordered table-striped">';
  s += header;
  data.teamsToDisplays.forEach(team => {
    s += '<tr><td><img class="logo" style="width:100px;" src="'+team.logo+'" alt="logo '+team.logo+'"></td>';
    s += '<td>'+team.name+'</td>';
    s += '<td>'+team.country+'</td>';
    s += '<td>'+team.stadium+'</td>';
    s += '<td>'+team.coach+'</td>';
    s += '<td>'+team.founded+'</td>';
    s += '<td>';
    for (var i = 0; i < parseInt(team.nbCup); i++) {
      s+='<img class="cup" style="width:25px" src="http://s1.static-footeo.com/uploads/cslagorgue/news/coupe-de-la-ligue-300x226__nd4zml.jpg">';
    }
    s+='</td></th>';
  })
  s += '</table>';

  tableTeams.innerHTML = s;
}

function CreateSelectCountry(){
  let All = new Option("All", "All");
  selectCountry.options.add(All);

  let Selected = []
  data.teams.forEach(team => {
    if(!Selected[team.country.toLowerCase()]){
      let opt = new Option(team.country, team.country);
      selectCountry.options.add(opt);
      Selected[team.country.toLowerCase()] = 1;
    }
  })


}

selectCountry.addEventListener('change', function() {
  let selectedCountry = this.value;

  if (selectedCountry == 'All') {
    data.teamsToDisplays = data.teams;

  } else {
    let countriesFiltered = data.teams.filter(function(team){
      return team.country.indexOf(selectedCountry) != -1;
    })
    data.teamsToDisplays = countriesFiltered;

  }

  CreateTableTeams();
});

searchInput.addEventListener('keyup', function() {

  if (this.value.length > 1) {
    let countryFiltered = data.teams.filter(team => team.name.toLowerCase().indexOf(this.value.toLowerCase()) != -1 || team.coach.toLowerCase().indexOf(this.value.toLowerCase()) != -1 || team.stadium.toLowerCase().indexOf(this.value.toLowerCase()) != -1);
  data.teamsToDisplays = countryFiltered;
  } else {
    data.teamsToDisplays = data.teams;
  }
    CreateTableTeams();
})

init();
console.log(data);


})()
