let supplementUrl = 'https://raw.githubusercontent.com/bokibokan/ProektFin/master/ProektFinalno/Supplements.json';
let supplements;
function saveSupplements(data) {
    supplements = data;
}

//ajax povik
function ajaxCall(url) {
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: 'true',
        success: function (data) {
            let results = JSON.parse(data);
            saveSupplements(results);
        },
        error: function () {
            console.log("error");
        }
    })
}

//Windows on load
$(document).ready(function () { ajaxCall(supplementUrl); });
/* When the user clicks on the button, 
  toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}

let proteinForm = $("#proteinForm");
let creatineForm = $("#creatineForm");
let proteinDropdown = $("proteinDropdown");
let creatineDropdown = $("creatineDropdown");
let bcaaForm = $("#bcaaForm");
let bcaaDropdown = $("bcaaDropdown");
let gainerForm = $("#gainerForm");
let gainerDropdown = $("#gainerDropdown");
let glutamineForm = $("#glutamineForm");
let glutamineDropdown = $("#glutamineDropdown");

$("#proteinForm").hide();
$("#creatineForm").hide();
$("#bcaaForm").hide();
$("#gainerForm").hide();
$("#glutamineForm").hide();



//#region SLIDER
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
//#endregion SLIDER

//#region funckii za event listeneri
function proteinFormShow() {
    let value = "protein";
    document.getElementById("proteinDropdown").addEventListener("click", proteinForm.show());
    $(".container").addClass("hidden");
    $("#proteinParagraph").empty();
    $("#creatineForm").hide();
    $("#gainerForm").hide();
    $("#glutamineForm").hide();

    $("#bcaaForm").hide();
    $("#homeDiv").hide();
    appendFiles(value, supplements);
}

function backButtonProtein() {
    document.getElementById("backBtnProtein").addEventListener("click", proteinForm.hide());
    $("#homeDiv").show();
}

function creatineFormShow() {
    let value = "creatine";
    document.getElementById("creatineDropdown").addEventListener("click", creatineForm.show());
    $(".container").addClass("hidden");
    $("#creatineParagraph").empty();
    $("#proteinForm").hide();
    $("#bcaaForm").hide();
    $("#gainerForm").hide();
    $("#glutamineForm").hide();

    $("#homeDiv").hide();
    appendFiles(value, supplements);
}

function backButtonCreatine() {
    document.getElementById("backBtnCreatine").addEventListener("click", creatineForm.hide());
    $("#homeDiv").show();

}

function bcaaFormShow() {
    let value = "bcaa";
    document.getElementById("bcaaDropdown").addEventListener("click", bcaaForm.show());
    $(".container").addClass("hidden");
    $("#bcaaParagraph").empty();
    $("#creatineForm").hide();
    $("#proteinForm").hide();
    $("#gainerForm").hide();
    $("#glutamineForm").hide();

    $("#homeDiv").hide();
    appendFiles(value, supplements);
}

function backButtonBcaa() {
    document.getElementById("backBtnBcaa").addEventListener("click", bcaaForm.hide());
    $("#homeDiv").show();
}

function gainerFormShow() {
    let value = "gainer";
    document.getElementById("gainerDropdown").addEventListener("click", gainerForm.show());
    $(".container").addClass("hidden");
    $("#bcaaParagraph").empty();
    $("#creatineForm").hide();
    $("#proteinForm").hide();
    $("#bcaaForm").hide();
    $("#glutamineForm").hide();

    $("#homeDiv").hide();
    $("#gainerParagraph").empty();
    appendFiles(value, supplements);
}
function backButtonGainer() {
    document.getElementById("backBtnGainer").addEventListener("click", gainerForm.hide());
    $("#homeDiv").show();
}

function glutamineFormShow() {
    let value = "glutamine";
    document.getElementById("glutamineDropdown").addEventListener("click", glutamineForm.show());
    $(".container").addClass("hidden");
    $("#bcaaParagraph").empty();
    $("#creatineForm").hide();
    $("#proteinForm").hide();
    $("#bcaaForm").hide();
    $("#gainerForm").hide();


    $("#homeDiv").hide();
    $("#glutamineParagraph").empty();
    appendFiles(value, supplements);
}

function backButtonGlutamine() {
    document.getElementById("backBtnGlutamine").addEventListener("click", glutamineForm.hide());
    $("#homeDiv").show();
}

//#endregion

function appendFiles(value, supplements) {
    let selectedSupplement;
    Object.keys(supplements).forEach(key => {
        if (key.toLowerCase() == value.toLowerCase()) {
            selectedSupplement = supplements[key];
        }
    })

    Object.keys(selectedSupplement).forEach(key => {
        if (key == "img") {
            $(`#${value}Paragraph`).append(`
            ${key} : <img src="${selectedSupplement[key]}" width="150px" height="150px"><br>
            `)
        } else {
            $(`#${value}Paragraph`).append(`
            ${key} : ${Object.values(selectedSupplement[key])}<br>
        `)
        }
    })
}

//searchInput
$("#searchBtn").click(() => {
    let value = $("#searchInput").val();
    console.log(value);
})

//exercises
$("#exercises").click(exercisesFn);

function exercisesFn() {
    $("#searchDiv").show();
    $(".container").removeClass("hidden");
    $("#creatineForm").hide();
    $("#proteinForm").hide();
    $("#bcaaForm").hide();
    $("#gainerForm").hide();
    $("#glutamineForm").hide();

    $("#homeDiv").hide();

    var availableTags = [];
    let data;

    //se povikuva vo ajax povikot da ja napolni varijablata data
    function fillData(result) {
        data = result;
        return data;
    }

    $.ajax({
        url: "https://raw.githubusercontent.com/bokibokan/ProektFin/master/ProektFinalno/exercises.json",
        type: 'GET',
        crossDomain: 'true',
        async: false,
        success: function (data) {
            let filledData = fillData(JSON.parse(data));
            //gi polni availableTags
            for (const item of filledData.exercises) {
                //proveruva dali go ima vekje vo availableTags
                if (availableTags.indexOf(item.musclegroup) === -1) {
                    availableTags.push(item.musclegroup);
                }
            }
        },
        error: function () {
            console.log("error");
        }
    });



    $("#search").autocomplete({
        source: availableTags,
        select: function (event, ui) {
            $("#result").empty();
            for (const item of data.exercises) {
                if(item.musclegroup.includes(ui.item.value)){
                    //ako go sodrzi prikazi go
                    appendExercise(item);
                }
            }
        }
    });
}

//funkcija za prikazuvanje na vezbi
function appendExercise(exercise) {
    $(`#result`).append(`<div>
            <div >
                <div>
                    <h2>${exercise.name.toUpperCase()}</h2>
                </div>
                <div>
                <iframe width="560" height="315" src="${exercise.video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>`)
}



function homeFunction() {
    $("#creatineForm").hide();
    $("#proteinForm").hide();
    $("#bcaaForm").hide();
    $("#homeDiv").show();
    $("#gainerForm").hide();
    $("#glutamineForm").hide();
    $(".container").addClass("hidden");
}

$("#homeButton").click(homeFunction);



$(document).ready(function () {
    $('search').keyup(function () {
        $('result').html('');
        var searchField = $('search').val();
        var expression = new RegExp(searchField, "i");

        $.getJSON('https://raw.githubusercontent.com/bokibokan/ProektFin/master/ProektFinalno/exercises.json', function (data) {
            $.each(data, function (key, value) {
                if (value.name.search(expression) != -1 || value.musclegroup.search(expression) != -1) {
                    $('result').append('<li class="listgroupitem"><img src="" ' + value.image + ' height="40" width="40"/>' + value.name + '' + value.musclegroup + '');
                }
            })
        })


    });
});