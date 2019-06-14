let supplementUrl = 'https://raw.githubusercontent.com/bokibokan/FULLFITNESSFINALTEST/master/FullFitnessFinalTest/Supplements.json';
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

$("#proteinForm").hide();
$("#creatineForm").hide();
$("#bcaaForm").hide();



//#region funckii za event listeneri
function proteinFormShow() {
    let value = "protein";
    document.getElementById("proteinDropdown").addEventListener("click", proteinForm.show());
    $("#search").remove();
    $("#proteinParagraph").empty();
    $("#creatineForm").hide();
    $("#bcaaForm").hide();
    appendFiles(value, supplements);
}

function backButtonProtein() {
    document.getElementById("backBtnProtein").addEventListener("click", proteinForm.hide());
}

function creatineFormShow() {
    let value = "creatine";
    document.getElementById("creatineDropdown").addEventListener("click", creatineForm.show());
    $("#search").remove();
    $("#creatineParagraph").empty();
    $("#proteinForm").hide();
    $("#bcaaForm").hide();
    appendFiles(value, supplements);
}

function backButtonCreatine() {
    document.getElementById("backBtnCreatine").addEventListener("click", creatineForm.hide());
}

function bcaaFormShow() {
    let value = "bcaa";
    document.getElementById("bcaaDropdown").addEventListener("click", bcaaForm.show());
    $("#search").remove();
    $("#bcaaParagraph").empty();
    $("#creatineForm").hide();
    $("#proteinForm").hide();
    appendFiles(value, supplements);
}

function backButtonBcaa() {
    document.getElementById("backBtnBcaa").addEventListener("click", bcaaForm.hide());
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
        $(`#${value}Paragraph`).append(`
            ${key} : ${Object.values(selectedSupplement[key])}<br>
        `)
    })
}

//searchInput
$("#searchBtn").click(()=>{
    let value = $("#searchInput").val();
    console.log(value);
})

//exercises
$("#exercises").click(exercisesFn);

function exercisesFn(){
    $("#creatineForm").hide();
    $("#proteinForm").hide();
    $("#bcaaForm").hide();
    $(".navbar").append(`
    <div id="search">
        <input type="text" id="searchInput">
        <button type="submit" id="searchBtn">Search</button>
    </div>
    `)
}