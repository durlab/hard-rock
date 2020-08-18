var apiUrl = 'https://api.lyrics.ovh';
document.getElementById("inputForm").addEventListener('submit', start);
const result = document.getElementById('result')
function start(e) {
    var searchInput = document.getElementById("suggestion").value;
    // console.log(searchInput)
    var fetchUrl = `https://api.lyrics.ovh/suggest/${searchInput}`;

    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => displaySuggestion(data))
        .catch(err => console.log(err))
    e.preventDefault();
}



function displaySuggestion(allData) {
    let data = allData.data;
    console.log(data);
    let list = [];
    for (let i = 0; i <= 9; i++) {
        const item = {
            title: data[i].title,
            albumTitle: data[i].album.title,
            artistName: data[i].artist.name,
            albumType: data[i].album.type,
           
            
        }

        list.push(item);
    }
    console.log(list);


    let display = document.getElementById("display-result");

    while (display.hasChildNodes()) {
        display.removeChild(display.lastChild);  
    }

    for (let i = 0; i < list.length; i++) {
        const { title, albumTitle, artistName ,albumType} = list[i];
        display.innerHTML +=

            
           `<div class="col-md-9 ">
                        <h3 class="lyrics-name"><span id="title">${title}</span></h3>
                        <p class="author lead">Artist: <span id="artistName">${artistName}</span></p>
                        <p class="author lead">Album: <span id="albumTitle">${albumTitle}</span></p>
                        <p class="author lead">Type: <span id="albumType">${albumType}</span></p>
                    </div>
                    <div class ="col-md-3 text-md-right text-center">
                <a href="#" onclick="getLyrics( '${artistName}','${title}')" class="btn btn-success">Get Lyrics</a> 
                 </div>`
                 
    }  
}


// get the lyrics

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
    const data = await res.json();
  
    const lyrics = data.lyrics;

    // result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2><p>${lyrics}</p>`;

    if(lyrics==undefined)
    {
        swal({
            title: "OOOPS!!! Lyrics not found  ╰(⇀‸↼)╯",
          });
    //    swal('OOOPS!!! Lyrics not found -- ╰(⇀‸↼)╯') 
    }
    else{

        swal({
            title:`${artist} - ${songTitle}`,
            text: `${lyrics}`,
            
          });

        
    }
     

}

  