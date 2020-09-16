# Skiers Destinations
![Logo](assets/images/logo-skiers-destinations.png)      
[Visit the live **Skiers Destinations** here](https://carina-p.github.io/Skiers-Destinations/)

**UpToDate information about Ski Resorts** for downhill skiers who want 
**inspiration** for their next ski trip, **compare** different ski resorts or just want 
**updated information** about **skiing conditions** and/or **weather forecast** on a 
particular resort.

**Browser requirements** (at least version):|
---------------------------|
Chrome 58|
Edge 14|
Firefox 54|
Safari 10|
Opera 55| 
## Contents
* [UX](#ux)
    + [External users goal](#external-users-goal)
    + [Site owners goal](#site-owners-goal)
    + [User stories](#user-stories)
  * [User requirements and Expectations](#user-requirements-and-expectations)
    + [Requirements](#requirements)
    + [Expectations](#expectations)
  * [Wireframes](#wireframes)
    + [Potential features](#potential-features)
    + [Major changes compared to above wireframes and potential features](#major-changes-compared-to-above-wireframes-and-potential-features)
  * [Design Choices](#design-choices)
    + [Fonts](#fonts)
    + [Colors](#colors)
  * [Features](#features)
    + [Responsive](#responsive)
    + [Interactive elements](#interactive-elements)
    + [Features left to Implement](#features-left-to-implement)
    + [Existing Features](#existing-features)
    + [Features Left to Implement](#features-left-to-implement)
  * [Technologies Used](#technologies-used)
    + [Languages used](#languages-used)
    + [Frameworks, Libraries and Programs used](#frameworks--libraries-and-programs-used)
    + [API (Application Programming Interfaces) used](#api--application-programming-interfaces--used)
  * [Testing](#testing)
    + [Manual testing](#manual-testing)
    + [Automated testing](#automated-testing)
      - [UX testing](#ux-testing)
      - [Test cases/Scenarios](#test-cases-scenarios)
      - [Validation with W3S](#validation-with-w3s)
      - [Validation with JSHint](#validation-with-jshint)
      - [Different browsers](#different-browsers)
    + [Some of the bugs](#some-of-the-bugs)
  * [Deployment](#deployment)
    + [Forking the GitHub Repository](#forking-the-github-repository)
    + [Making a local clone](#making-a-local-clone)
  * [Credits](#credits)
    + [Content](#content)
    + [Media](#media)
    + [Acknowledgements](#acknowledgements)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## UX
<!--
Use this section to provide insight into your UX process, focusing on who this website is for, what it is that they want to achieve and how your project is the best way to help them achieve these things.

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:
- As a user type, I want to perform an action, so that I can achieve a goal.

This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process. These files should themselves either be included as a pdf file in the project itself (in an separate directory), or just hosted elsewhere online and can be in any format that is viewable inside the browser.
-->
### External users goal
- **Easily**, by starting with clicking on markers in a **map**, find **information and up-to-date facts** about some of the
**ski resorts in Europe**.
- Find **inspiration** were to go by **comparing differents ski resorts** both with uptodate information but also by other users **rating of resorts**.
- By using the site frequently the user can see how **snow conditions develop** over time.
- Find **weather forecast**, which is good if you are at a resort or are going to a resort. 

<!--
User can easily compare different resorts, follow how snow conditions develop, see weather forecastscan find **inspiration** where to go on next ski trip by looking at uptodate facts about resorts
seeing how other ski enthusiasts grade the resorts. 
User can also **follow** how the **snow conditions develop** and see **weather forecast** for specific resort.
This is the site where you can **compare resorts** 
to each other, conveniently based on a map. You can find out which resorts 
**others rate high** and you can also find updated snow reports and weather 
forecasts. 
-->
### Site owners goal
To **share information** with other ski lovers, get inspired by their rating
of resorts and **get uptodate information** about skiing conditions and weather
at favourite spots.
 
### User stories 
- US_001: As a user I want to be able to **navigate directly** to the map. If it is the map I am interested in.
- US_002: As a user I want to be able to **navigate directly** to the rating list. So I can go directly to the rating list.
- US_003: As a user I want to be able to **navigate directly** to contact form. So I can go directly to the form.
- US-004: As a user I want to be able to **get back easily to the top** of the page.
- US-005: As a user I want to know **where good skiing places**, in Europe, are situated in a **map**. In this way I know were in Europe the resort is situated.
- US_006: As a user I want a **short description of a resort**. In this way I know if it is a resort that I am interested in.
- US_007: As a user I want **uptodate information** about **snow conditions** at a resort. This is interesting to know if I am at the place or on my way to the place and want to know what to expect. If I am not going to the place it is interesting to follow and compare to other resorts. Deciding were I am going in the future.
- US_008: As a user I want **todays weather forecast** at resort. This is interesting to know if I am at the place or on my way to the place and want to know what to expect. If I am not going to the place it is interesting to follow and compare to other resorts. Deciding were I am going in the future.
- US_009: As a user I want to be able to **compare different ski resorts**. Things to compare:
    - **altitude** at top and at base
    - number of **slopes**
    - number of **lifts**
    These are thing interesting to know e.g. when you are deciding which resort you want to visit.
- US_010: As a user I want to know which skiing places **other users rank as the best**. And I will get inspired on were I want to go or perhaps discover a new place I was not aware of. I can also compare resorts ranking to a resort that I already know about.
- US_011: As a user I want to be able to **cast my on vote** for a resort. And in this I will be able to contribute to other users descision process.
- US_012: As a user I want to be able to **see how I graded each resort**. Thus I can compare my ranking between the resorts.
- US_013: As a user I want to see the **resulting top-list** after I have casted my vote. If my vote affects the order of ski resorts I want to see it immediately. 
- US-014: As a user I want to be able to **send in my ratings** to be added to the list. And I can contribute to others.
- US-014: As a user I want to be able to **influence which ski resorts are shown** on the site. If I am interested in a particular ski resort that does not show on the page. 
- US-015: As a user I want to be **inspired** to go skiing. And in this way more interested and keen on finding out more about resorts.

## User requirements and Expectations

### Requirements
- Navigate the website using **navbar**
- **Carousel with photos** in beginning of page to inspire users.
- **Markers** at ski resorts in the map.
- Beside marker: find **short facts** in InfoWindow about resort. Thus user is able to **compare different resorts**.
- When user **choose a resort** - **information**, as forecast and snow conditions, **about the resort** turns up besides the map.
- An **updated list** of the 10 most popular ski-resorts with name of the 
place, ranking and grade. 
- **Grading is calculated** from users input.
- **Grading is visualised** with the number of **stars** and if applicable "half-star".
- The 10-top list should be **updated immediately** when user grade a resort.
- It is possible for same user to **cast more votes if reloading** the page.
- Possibility to **mail wishes** for other Ski Resorts to be shown on the site. The input should include name of ski resort, why resort is interesting (reason), name of person who is mailing and persons mail address.

### Expectations
- Content is **visually satisfying and informative**
- **Easily understandable navigation** take user to correct place
- **Links and buttons** work as espected
- **Responsive design** fitting on mobile, tablet and desktop 
- **Information** about a ski resort is immediately shown when user **has choosen a resort**.
- **Short information** in map stays open until user choose to close the information.
- **Information beside/below the map** is **updated** every time the user chooses a new resort.
- **New average grade is correctly calculated** after user graded a ski resort.
- **Updating of 10-top-list** works after user grading.
- **Form validation** works correctly

## Wireframes
I used [Balsamiq Wireframes](https://balsamiq.com/) to build rudimentary 
wireframes for a basic understanding. I have made frames for desktop, tablet 
and mobile. Original wireframe design:
- [Wireframe for Desktop](https://github.com/Carina-P/Skiers-Destinations/blob/master/wireframes/wireframe-desktop.pdf)
- [Wireframe for Tablet](https://github.com/Carina-P/Skiers-Destinations/blob/master/wireframes/wirefram-tablet.pdf)
- [Wireframe for Mobile](https://github.com/Carina-P/Skiers-Destinations/blob/master/wireframes/wireframe-mobile.pdf)

### Potential features
- **Header**, fixed at the top of viewport, with:
    - **logo**
    - **navbar**
- **Information**-section with:
    - **Map** with markers on skiing resorts.
    - **Skiing-resort information** matching the label user has 
        **choosen in map**.
- **Recommendation**-section with:
    - **Table with 10-top** skiing resort sorted with the best in the top. 
    Providing possibility to do own ranking of place and **interactive update** 
    of the list. 
- Section for **wishes** were you can **mail** a wish for a **ski resort** that 
    you want the site to show information about.
- **Footer**-section with:
    - **contact and social media** information

### Major changes compared to above wireframes and potential features
- Added a **carousel with pictures** in top of page to inspire user and attract users.

## Design Choices
- Rounded edges is a theme that gives a "softer impression".
- The content belonging to one another is surrounded by a blue border.
- One page: when talking to younger users they preferred one page since
using smaller devices as mobile phones you do not want to use clicks but 
rather scrolling.

### Fonts
I have choosen **Oswald**, because i find it very **useful** on different 
platforms, **clean** and **easy** to read. "Oswald is designed 
to be used freely across the internet by web browsers on desktop computers, 
laptops and mobile devices." (quote from 
[Google fonts](https://fonts.google.com/specimen/Oswald#standard-styles). 
And as the alternative font: Open Sans. 
 
### Colors
I want the colors to match a day in the skiing slope: White for **snow**, 
light-blue for the **sky** and yellow for the **sun**. 
<img src="wireframes/colors-skiers-destinations.png" width="75%">

- **Text** to contrast lighter backgrounds: **Raisin black** #262730
- **Main background**: **White** #ffffff
- **Framing** as borders: **Columbia blue** #cae9ff
- Details to **stick out** as buttons: **Sunglow** #fecf3e

## Features
 
- **Header**:
    - navbar and logo fixed at the top of viewport:
        - **logo**: When hover over it becomes larger
        - **navbar**: When hover over links the font is bold
        ![implementation of navbar](wireframes/navbar.jpg)
        - If smaller width of device links are put in "hamburger".
        ![Implementation of navbar, devices smaller width](wireframes/navbar-hamburger.jpg)
    - The **heading** : 
    - **Carousel** with inspiring photos of skiing and/or Alps
    ![Implementation of heading with carousel](wireframes/heading.jpg)
- **Map** with with markers on popular skiing resorts.
![Implementation of map](wireframes/map.jpg)
- Ski resort for the map with "static information as lat and long position" is for convenience, when adding more resorts, 
saved in a file: [resorts.json](https://github.com/Carina-P/Skiers-Destinations/tree/master/assets/data), from which information is fetched into map. 
- **Skiing-resort information** matching the marker user has **choosen in map**:
    - **Short information** about resort, as altitudes, slopes and pists,
    **in InfoWindow** in the map beside resorts marker. This information stays
    on screen as long as user do not close it.
    ![Implementation of infoWindows in map](wireframes/info-window.jpg)
    - **More information** as short information about resort, snow report and
    wheather forecast in **larger information window**. This information is
    changed every time user clicks on other resort. On devices with larger 
    width the information is shown beside the map. With smaller widths the
    information is shown below map.
    ![Implementation of long resort information](wireframes/long-info.jpg)
    - **File with javaScript** for implementing the rating part of page: 
    assets/js/rating.js - Since it is a lot of code it is easier
    to find specific code and probably easier to add code by keeping the code
    for implementing rating in seperate file. Instead of putting the code 
    togehter with rest of javaScript implementation (assets/js/scripts.js).
    This is to the cost of longer loading with two js-files compared to only 
    one file.
- **Table with 10-top** skiing resort sorted with the **best ranked resort in the
    top and the resort with lowest ranking in bottom**.
    - On devices with **larger width** the information is shown i **table**.
    ![Implementatin of rating list on larger viewports](wireframes/table.jpg)
    - On **smaller devices** it is presented as **"cards"** that also is sorted
    in ranking order.
    ![Implementation rating list on smaller viewports](wireframes/cards.jpg)
    - Ranking is **visualized with stars**:
        - The rankings integer is represented by full stars
        - If remainder is 0.75 or greater another full star is added
        - If remainder is between 0.25 and 0.75 a halv-star is added
        - The rest is represented by "empty stars" adding upp to 5

        ![Implementation of stars to visualize ranking](wireframes/stars.jpg)
    - Providing possibility to do **users own ranking of place**. When user has
    vote the list is interactively sorted and updated on the page.
    ![Implementation of voting](wireframes/pick.jpg)
    - Possibility for user to **send in his/her votes** to be added to the list:
        - When hover the submit button: background is changed to black and 
        font to yellow
    ![Implementation of submitting votes](wireframes/submit-votes.jpg)
        - **Modal** with information if sending mail succeded or not.

        ![Implementation of modal](wireframes/modal.jpg)
- **Form for wishing** new ski resorts on the site.
    - Input fields: 
        - **Name of resort** user wish to add - mandatory
        - The **reason** user wants to highlight to get resort added - voluntary
        - **Name of person** sending in wish - mandatory
        - **Email address** to person - mandatory and must contain a @.
    - **Submit button**: when clicked the information of the form is sent by mail.
        - When hover over the button: background is changed to black and font
        to yellow
        - **Modal** informing user if sending went well or not. (implementation
        looking very similar to modal after submitting votes)
![Implementation of form for resort wishes](wireframes/form.jpg)
- **Footer** with contacts and social media:
    - **Email address** to get in touch with site owners
    - **Social media links** as facebook, twitter, linkedIn, instagram and youtube.
    - When hover over social media links icons are larger and background color
    is changed to Columbia Blue.
![Implementation of footer](wireframes/footer.jpg)

### Responsive
The site is design to fit devices with screen width from 360px to 3840 px.
The following features are designed differently for different devices:
- Navbar: On screen widths smaller than 768px the navbar collapses into 
"hamburger" menu.
- Resort information beside or below map: On larger screens with width over 
768px longer resort information is shown to the right of the map. On smaller
devices the information is shown under the map.
- Rating list: On devices with screen smaller than 768px every resort with 
rating is shown in a "card-layout" ordered from highest ranked resort to
lowest. On larger screens the information is presented in a table.
- On very small devices (width less than 400px) the font size is 14px. 

### Interactive elements
- The navbar and logo: to move around in the page
- When clicking on markers in the map: Both short information and longer
information, for the resort marker points to, appears. The short information
in a infoWindow in the map and the longer information besides the map (if larger
screens) or below map (if smaller screens).
The longer information changes when user clicks at other marker. The shorter 
information stays as long as the user chooses.
- User can cast a vote and rate ski resort and then: 
    - The grade casted is visualized as stars.
    - A new average grading for resort is calculated.
    - If the new average grading for resort affects the resorts place in
    rating list - the rating list is immediately updated.
- User can submit his/her votes by mail, for later adding to average rating 
list.
- User can submit a mail to wish adding of a ski resort to the page.

### Features left to Implement
Adding a **server**:
- to **store** the **rating** information and the user do not have to mail votes
instead the **updating is done instantly to server** as soon as user cast one vote.
- to **store and fetch** map resorts, with information, from

<!--
In this section, you should go over the different parts of your project, and describe each in a sentence or so.
 
### Existing Features
- Feature 1 - allows users X to achieve Y, by having them fill out Z
- ...

For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement
- Another feature idea
-->

## Technologies Used
<!--
In this section, you should mention all of the languages, frameworks, libraries, 
and any other tools that you have used to construct this project. For each, 
provide its name, a link to its official site and a short sentence of why it 
was used.
-->
 
### Languages used
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) 
    - The perfect language to build a static site.
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) 
    - For styling the site
- [JavaScript](https://www.javascript.com/)
    - Bringing interactivity to the site.

### Frameworks, Libraries and Programs used
- [GitPod](https://gitpod.io/)
    - Git was used for version control by utilizing the GitPod terminal to commit to Git and push to GitHub.
- [GitHub](https://github.com)
    - GitHub is used to store the code.
- [Bootstrap](https://getbootstrap.com/)
    - A helpful HTML, CSS (and JS) library that is great for responsive design.
- [JQuery](https://jquery.com/)
    - The project uses **JQuery** to simplify DOM manipulation.
- [JSON](https://www.json.org/json-en.html)
    - A data-interchange format used when retrieve information from other 
    sources as [Weather Unlocked](http://www.weatherunlocked.com/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
    - Fetch API provides an interface for fetching resources. In this project it is used for fetching data across the network from API sources but also to fetch from data file in this repository.
- [Jasmine](https://jasmine.github.io/)
    - Supports behavior-driven development, makes it easy to build unit test. 
- [Font-Awesome](https://fontawesome.com/icons?d=gallery)
    - From this library I picked the icons 
- [Google fonts](https://fonts.google.com/)
    - For inspiration and fonts
- [Balsamiq Wireframes](https://balsamiq.com/)
    - For designing the wireframes
- [Coolors](https://balsamiq.com/)
    - To generate color-schemes
- [Emailjs](https://www.emailjs.com/)
    - Used for sending email from "Add ski resort"-section

### API (Application Programming Interfaces) used
- [Google Maps Platform](https://developers.google.com/maps/documentation)
    - Provides the map and possibility to create markers and cluster of markers.
- [Wheater Unlocked](http://www.weatherunlocked.com/)
    - From this API uptodate snow report and weather forecast for each resort is received.

## Testing
The testing has mainly been conducted manually. Some automated testing has been
constructed and used. 

The TDD, testdriven development, process was followed. The development/
implementation cycles have been very short and test cases have
been developed/thought off before code was implemented. Test cases are documented here:
[Test cases](https://github.com/Carina-P/Skiers-Destinations/tree/master/testing/test-cases/test-cases.pdf).

Before new code was commited, testing of all code developed earlier was
tested again. And of course the automated tests were run repeatedly.

When all features were implemented and tested the following tests were 
performed:
- Went througt the **test cases**, for functional testing and testing of
responsiveness, as described below
- HTML-code validated by [W3S Markup validation service](https://validator.w3.org/)
- CSS-cod validated by [W3S CSS validation service](https://jigsaw.w3.org/css-validator/)
- JavaScript-code validated by [JSHint](https://jshint.com/)
- The site was tested on different browsers, as described below
- The **deployed version** was tested

### Manual testing
The manually testing was performed **regularly** in an **iterative** manner adding a small part of code every time. 
Then **thorough** after all features were in place. 

### Automated testing
The tests were developed ahead of implementing features. And obviously the 
first tests failed all the time. Then features are implemented and
automatically tested in an iterative process with small parts of code every
time.

The following automated tests have been developed:
- The calculating of new average rating when user casts av vote. The function
is called calculateNewRating and belongs to the object: RatedResort.
- Test that function hasVoted, belonging to Object: RatedResort, returns right value.
- Automated testing have been used on following functions to test what happens
if they are given wrong conditions as eg. something is wrong with input 
parameters (this was hard to test manually). The functions all belong to the 
object: RatedResort:
    - starsToHTML
    - rowToHTML
    - noVoteHTML



<!--In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.
-->  
### UX testing
UX testing was conducted by watching and interviewing users when they used the page. Examples of issues/discussions:
- Wish for a header above map with resorts. (fixed)
- User could submit/mail votes when no votes where casted. (fixed)
- Discussed if user should be able to submit several times instead of once. Decided that it is enough with once.
- On smaller viewport widths initial instruction is presented under the map (in larger viewports to the right).
    - Discussed with users if should move the initial instruction and also the longer information about resort to above the map instead.
    - Users agreed they wanted longer information below map. They wanted to see the map first.
    - The solution was to add a short instruction also above map.
- Sometimes confusing that the list is updated as soon as user cast a vote. Especially if the resort moves up or down
in rating list:
    - Users still wanted the list to be updated at once.
    - Did a trial where the "href was moved" to top of list after every time user casted a vote. The users thought it was better
    without this feature.
    - The solution was to add a "notice" in head of list.
 
### Test cases/Scenarios
26 test cases with protocol for functional testing and test of responsiveness is documented here:
[Test cases](https://github.com/Carina-P/Skiers-Destinations/tree/master/testing/test-cases/test-cases.pdf)
Test of responsiveness was mainly performed with help of Chrome Developers Tool. But also with
ipad and iPhone7.

### Validation with W3S
- HTML: Validated with no errors but got a warning, described above
- CSS: Validated with no errors.

### Validation with JSHint 
JavaScript validated with no errors. 
- There is four undefined variables: google, $, MarkerClusterer and emailjs:
These are all global variables from sources that is linked.
- There is two unused variables:
    - clusterOfMarkers: used when call to a constructor from googles API.
    Must call constructor of MarkerClusterer to get cluster of markers in map.
    -  initMap is a callback-function initiated from the HTML code.

### Different browsers
The code is mainly tested with Chrome. But also Firefox and Safari.
- According to [W3 Schools](https://www.w3schools.com/js/js_es6.asp) the 
JavaScript code will probably not work well on browsers less than the 
following versions: Chrome 58, Edge 14, Firefox 54, Safari 10 and Opera 55 
And that is because following features from ECMAScriptS6 is used: 
- let
- const
- template literal syntax
- arrow function

### Some of the bugs
**Example of solved bugs:**
- Syncronosly creating markers to map that depended on asyncronos fetching of information is done first:
Solved by using fetch.then and Promise.all. 
- To calculate average rating number who has voted has to be known.
- User could submit/email ratings when no votes where casted.

**Remaining "bugs":**
- Sometimes a **CORS**, Cross Origin Resource Sharing,-problem appears when
**fetching information from API: Weather Unlocked**. The problem happens randomly
to different resorts. When the problem occurs the **user is informed** which 
information could not be fetched.
- W3S validation of HTML-code gives a warning of **empty heading**:
`<h4 class="modal-title" id="mail-answer"></h4>`
Text is put in the heading **from JavaScript**.
- Files under assets/images/weather/ is copied from [Weather Unlocked](http://www.weatherunlocked.com/).
Forecast information is fetched from Weather Unlockeds API and this forecast refers to these files.
File names should only contain lowercase letters but these file names starts with capital letter. The file names
are not changed since they are referenced to in fetched information.
- The site has issues with cookies in cross-site requests since SamSite attribute is not set.

## Deployment 
Skiers Destinations was developed on GitPod [GitPod](https://www.gitpod.io/), using git and GitHub to host the repository. The code was pushed
to GitHub Pages.
 
When deploying Skiers Destinations using GitHub Pages the following steps were made:

* Opened up **[GitHub](https://github.com/** in the browser and signed in. 
* Navigated to [Skier Destinations repository](https://github.com/Carina-P/Skiers-Destinations)
* In the top navigation selected **'Settings'**.
* Scrolled down the Settings page until the **"GitHub Pages"** area was located. 
* Under "Source", the dropdown showing **"None"** was selected and then **'Master Branch'** was chosen.
* The selection was saved and the page automatically refreshened. And the published site is found by **scrolling back down the "Settings" again** to "GitHub Pages". Where it says **"Your site is published at.."**

Here is the live site: [Skiers Destinations](https://carina-p.github.io/Skiers-Destinations/) 

### Forking the GitHub Repository
A copy of the GitHub repository is made by forking the account. The copy can then be viewed and changed without affecting the original code. Forking is done by:
* Log in to **GitHub** and locate **[Skiers Destination Repository](https://github.com/Carina-P/Skiers-Destinations)**
* At top right above the "Settings button" find **"Fork button"**
* **Click** on the "Fork" to **create a copy** in your own account.

### Making a local clone
* Log in to **GitHub** and locate **[Skiers Destination Repository](https://github.com/Carina-P/Skiers-Destinations)**
* Under repository name, locate **"Code"** and click on it.
* To the top right: locate green button called **"Code"** and click on the button. 
* There are some choices:
    * Checkout with **SVN using web URL**: 
        * Copy the **url** shown or copy this: https://github.com/Carina-P/Skiers-Destinations.git 
        * Use the url to import the code into your favourite **IDE**. Note that different Code Editors have different processes for making the clone. 
    * Using **GitHub Desktop**:
        * Save the clone directly by chosing **"Open with GitHub Desktop"**
    * Downloading **zip file**:
        * Select **"Download ZIP"** and all the files will be saved, zipped, to local computer. 

<!--
This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.
-->

## Credits

### Content
<!--
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)
-->
- The information about altitudes, nr of pists and slopes was received from [Skiresort.info](https://www.skiresort.info/)

### Media
The photos used in this site were obtained from:
- [Can Stock](https://www.canstockphoto.se) - used to make a logo
- [Pixabay](https://pixabay.com/) - pictures in carousel and beside 
rating table on devices with medium and larger viewports

### Acknowledgements
I recived inspiration for this project from: 
- [dcode: How to use JSDoc -Basics & Introduction](https://www.youtube.com/watch?v=Nqv6UkTROak)
- [Web Dev Simplified: Learn fetch API in 6 Minutes](https://www.youtube.com/watch?v=cuEtnrL9-H0)
- [Jake Archibald: Introduction to JavaScript Promises](https://web.dev/promises/) 
- [MDN web docs: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

<!--
- I received inspiration for this project from X
-->