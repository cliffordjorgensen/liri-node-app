# liri node app

##LIRI (node app HW)
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### Run the App

to run the app clone the repository and  Navigate to liri-node-app/assets/js folder
In the 'js' folder run 'npm init -y' and 'npm i' to install required packages
then type 'node liriApp.js'
Follow on screen instructions. The user is prompted to select an operation from a list.

list options are:
   * `concert-this`
   * `spotify-this-song`
   * `movie-this`
   * `do-what-it-says`
   * `quit`

**concert-this** prompts the user for the name of a band/artist.
Displays:
   * `venue`
   * `city`
   * `and event date for all up coming events.`

**spotify-this-song** prompts the user for the name of a song.
Displays:
  * `artist(s)`
  * `the song's name` 
  * `a preview link of the song from Spotify`
  * `and the album that the song is from`
**movie-this** prompts the user for the name of a movie.
Displays:
  * `Title of the movie.`
  * `Year the movie came out.`
  * `IMDB Rating of the movie.`
  * `Rotten Tomatoes Rating of the movie.`
  * `Country where the movie was produced.`
  * `Language of the movie.`
  * `Plot of the movie.`
  * `Actors in the movie.`
  
**do-what-it-says** will read the txt from the file random.txt. 
the text is split into an array and then passed as input for spotify-this.
Displays spotify-this search response. 


