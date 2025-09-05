

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))

};


const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn")

    lessonButtons.forEach((btn) => btn.classList.remove("active"))
    
}


const loadWordDetail = async (id) =>{
    const wordsUrl = `https://openapi.programming-hero.com/api/word/${id}`

    const res = await fetch(wordsUrl);
    const wordDetail = await res.json();
    displayWordDetail(wordDetail.data);
    
    
}

// Synonym array dynamic

const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`);
    return (htmlElements.join(" "));
}

const displayWordDetail = (word) =>{
    console.log(word);
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML = `
        <h1 class="text-lg font-bold">Eager (<i class="fa-solid fa-microphone-lines" style="color: black;"></i>:ইগার)</h1>
            <p class="py-3 font-semibold">Meaning</p>
            <p>${word.word}</p>
            <p class="py-3 font-semibold">partsOfSpeech</p>
            <p>${word.partsOfSpeech}</p>
            <p class="py-3 font-semibold ">Example</p>
            <p>${word.sentence}</p>
            <p class="py-3 font-semibold">সমার্থক শব্দ গুলো</p>
            <div class = "flex gap-3 py-2">
                ${createElements(word.synonyms)}
            </div>
            
    `
    document.getElementById("word_modal").showModal();
    
}


const loadLevelWord = (id) =>{

    manageSpinner(true);
    const levelsUrl = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(levelsUrl)
    .then((res) => res.json())
    .then((levelWord) => {

        removeActive()
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
    

        clickBtn.classList.add("active");

        displayLevelWord(levelWord.data);

    })
        
    
}


const displayLevelWord = (words) => {

    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = `
            <div class="text-center col-span-9">
                <p class="font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="font-semibold font-bangla text-3xl my-4">নেক্সট Lesson এ যান।</h1>
            </div>
        `;
        manageSpinner(false);
        return;
    }

    words.forEach(word => {
        
       const wordCard = document.createElement("div")
       wordCard.innerHTML = `
          <div class="bg-white rounded-xl shadow-md text-center px-5 py-10">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "Word is not here"}</h2>
                <p class="my-4 font-semibold">Meaning / Pronunciation</p>
                <h1 class="font-bangla text-2xl font-medium">${word.meaning ? word.meaning: "Meaning is not here"} / ${word.pronunciation ? word.pronunciation : "Pronunciation is not found "}</h1>

            <div class="flex justify-between items-center my-4">
                <button onclick="loadWordDetail(${word.id})"><i class="fa-solid fa-circle-info" style="color: #000000;"></i></button>
                <button><i class="fa-solid fa-volume-high" style="color: #000000;"></i></button>
            </div>
       `

       wordContainer.appendChild(wordCard)
    });

    manageSpinner(false);
}

// Lesson display - 2nd Step

const displayLesson = (lessons) => {
    // console.log(lessons) - for checking lesson is found 

    // step-1 get the container and empty it
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = " ";

    // step-2 get into every lessons 
    for(let lesson of lessons){

        // step-3 create element

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id = "lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-neutral btn-outline lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        `;

        // step-4 append into container
        levelContainer.appendChild(btnDiv);

    }
   
    manageSpinner(false)

};

loadLessons();