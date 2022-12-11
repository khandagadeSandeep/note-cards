console.log("Notes App");
showNotes(); // to show existing note cards 

let addBtn = document.getElementById("addBtn");  // select the button
addBtn.addEventListener("click", function (e) {
  let noteText = document.getElementById("addTxt"); // get note data
  let notes = localStorage.getItem("notes"); // set localstorage
  if (notes == null) {
    notesObj = []; // if note is null then set a blank array
  } else {
    notesObj = JSON.parse(notes); // parse the note data
  }
  notesObj.push(noteText.value); // insert input box's data into object "notesObje"
  localStorage.setItem("notes", JSON.stringify(notesObj)); // set note in localStorage
  noteText.value = ""; // to empty the input box after ading a note
  // console.log(notesObj);
  showNotes(); // to show note cards 
});

// ----------To show the note cards------------

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id = "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
  });
  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Nothing to Show you, add note from above section`;
  }
}

//------------ Delete Notes-------
function deleteNote(index) {
  // console.log("i am deleting", index);
  let notes = localStorage.getItem("notes"); //
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1); // To rempve item

  // again update local storage after deleting the note
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


// -------Search Notes--------------

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  // let inputValue = search.value.toLowerCase();
  let inputValue = search.value;
  let noteCrads = document.getElementsByClassName("noteCard");
  Array.from(noteCrads).forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText;
    if (cardText.includes(inputValue)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });

  console.log("input event fired");
});
