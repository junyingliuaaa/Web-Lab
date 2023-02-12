const inpTitle = document.getElementById("inpTitle");
const inpArtist = document.getElementById("inpArtist");
const btnInsert = document.getElementById("btnInsert");
const lsOutput = document.getElementById("lsOutput");




btnInsert.onclick = function () {
    const key = inpTitle.value;
    const value= inpArtist.value;

    if(key == "" || value == "")
    {
        alert("Input the info on it!")
        return false;
    }
    lsOutput.innerHTML += `${key}:  ${value} <br />`;
};





