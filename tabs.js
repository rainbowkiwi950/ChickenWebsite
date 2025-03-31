
//Funtion to open tabs in the website
function openTab(event, tabName) {
    var i, tabContent, tabButtons;

    // Hide all tab contents
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Remove "active-tab" class from all tab buttons
    tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active-tab");
    }

    // Show the current tab and add the "active-tab" class to the button
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active-tab");
}
