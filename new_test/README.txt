ASH ANIMATION — INTRODUCTION TO ANIMATION COURSE HUB
=====================================================

This folder is a clean, standalone rebuild of the supplied "Introduction to Animation in Toon Boom Harmony" course page.

UPLOAD / HOSTING
----------------
Upload the entire "introduction_to_animation_site" folder to your web host. Keep the folder structure intact:

index.html
css/styles.css
js/script.js
js/lesson-links.js
images/ash-animation-logo.png
lessons/

ADDING LESSON LINKS LATER
-------------------------
Open:
    js/lesson-links.js

You will see one line for each lesson:
    1: "",
    2: "",
    ...
    25: ""

Put the lesson URL between the quotation marks.

Examples:
    1: "lessons/01-world-of-animation/index.html",
    2: "https://www.yoursite.ca/animation/lesson-2/",

You do NOT have to edit index.html to change lesson URLs.

If a lesson URL is left blank, the course page shows a friendly "Lesson link not set yet" message instead of sending students to a broken page.

IMAGES
------
All images used by this rebuilt page are linked as normal files from the images folder.
There are no Base64/data-image graphics in the site.

The top-left course logo is:
    images/ash-animation-logo.png

COURSE VIDEO & RESOURCES
------------------------
The original ZIP did not include a local copy of the welcome video or the linked PDF/resources. Those remain linked to the original external sources from the supplied course page.

LESSON FOLDER
-------------
The empty "lessons" folder is included as a convenient place to add your self-hosted lesson folders later. You can use a different structure if you prefer; just update js/lesson-links.js.
