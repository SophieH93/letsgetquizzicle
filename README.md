 # **Let's Get Quizzicle**  

![](assets/images/mockup.JPG)


This project is an interactive frontend Trivia Game suitable for people of all ages from the Opan Trivia API. The game is
a fun way for players to test their knowledge and learn something new.

# UX
The goal of this project is to provide users with a fun, easy to use trivia game based on their favourite categories. 
As the game is suitable for people of all ages, the webiste needs to be visually appealing to encourage user interaction and suitability for all different age groups.

### **User Goals:**
* For the game to be responsive on mobile, tablet & desktop.
* Visual interaction to draw the player in.
* Different choice of categories and difficulty levels to suit a wider ranger of players.
* Countdown timer to make the game more exciting as not only will the player have the
  challenge of answering the correct question but also be restricted in time.
* Point system to reward the player with the correct answer to the question.
* Scoreboard at the end of the game to show the top 5 players.

### **User Story:**
* As a user, I would like to see a game where I can pick my preferred Category and Level difficulty.
* As a user. I would like a game that's easy to navigate through.
* As a user, I would enjoy a game that is visually appealing.
* As a user, I would like a game that does not take too long to complete.
* As a suer, I would like a game that involves a challenge and a reward for completion.
* As a user, I would like to be able to re-play a game and be provided with different questions.

## **Strategy**

Target Audience - The target audience for this project can be anyone between the age of 15+.

Primary Audience-Peiple who want to see how much they know about a particular topic and share this information with their friends.

The primary site goals are to offer a fun experience to users while teaching them some facts about different categories.


## Scope




## **Structure**
The game consists of 4 pages.   
 The **first Page** which is the landing pages consists of 3 selects options for the game *Category*, *Difficulty* and *Number of questions* and a button to 
start the game.       
When the button is clicked the player is brought to the next page which conaitns the **questions** along with a progress bar so the player knows how far along in the game they are, a Score system and a Countdown timer.   
Once the game is over the user is brought to the **last Page** that consists of a form for the player to save their name to the system and two buttons, one to go to the Scoreboard page and the other to go home.  
The **Scoreboard Page** contains a list of the top 5 players.


## **Skeleton** 
My Wireframes:   
[Desktop](https://github.com/SophieH93/letsgetquizzicle/tree/master/wireframes/desktop)   
[Tablet](https://github.com/SophieH93/letsgetquizzicle/tree/master/wireframes/tablet)  
[Mobile](https://github.com/SophieH93/letsgetquizzicle/tree/master/wireframes/mobile)  
I created my wireframes on [MockFlow](https://www.mockflow.com/) for Desktop, Tablet and Mobie.  
 
The wireframes were originally created for a Marvel Theme trivia game but upon further research I realised that this was not possible as there was not a API for Marvel trivial questions.
The layout of the game has been slightly altered to compliment the Open Trivia API.

## **Surface**

### **Design Choice:**
    
**Font:** Roboto for the body and Anton for H1 headings. These fonts where choosen from [Google Fonts](https://fonts.google.com/). 
I initally chose Anton first for the heading and Google Fonts recommended Roboro as it's complimentary font.

**Colors:**    
Background Color - #F0F0FB   
Font Color - #2A2AA0   
Text shadow with color #FF0000 is used for the headings.   
Border, Submit, Select color - #0A0A84   
Submit hover has a box shadow with the colors - #2196f3,  #fa00d9, #7c21f3
Select options, button border hover, username hover, - #02024C   
Button & container background color - #B6B6FD


### **Features of the Website**

**landing Page-** Consists of a breif introduction to the game with 3 different select options for the player to choose from such as *Categories*, *Difficulty Level* and *Number of Questions*.
The page also has a *Play Game* button the user can click once they select the different options for the game.

**Game Page-** This page consists of the questions along with a *progress bar* so the player knows how much longer they have left.   
A **Countdown Timer**, if the player does not select an answer before the time runs out they will be brought to the next question and lose a point.   
A **Point System**, when the player selects the correct answer they will win 10 points and if they select the wrong answer they will loose 2 points.  
A **Quit** button, if the player decided they do not want to play the game, they can click on the button and be brought back to the home page.   

**Game Over Page**- This page will display the players total number of points.
It will have a form where the player can add/save their username, and two buttons, one for the scoreboard the other to go back to the home page.   

**Scoreboard**
This page consists of the top 5 players.

# Technologies used
## Languages
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://www.javascript.com/)

## Frameworks
* [JSON](https://www.json.org/json-en.html)
* [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
* [Google Fonts](https://fonts.google.com/)
* [Open Trivia DB](https://opentdb.com/)

## Tools
* [GitHub](https://github.com/)
* [GitPod](https://www.gitpod.io/)
* [Git](https://git-scm.com/about)
* [W3C Markup Validation](https://validator.w3.org/)
* [WSC CSS Validaion](https://jigsaw.w3.org/css-validator/)
* [Dirty Markup Formatter](https://www.10bestdesign.com/dirtymarkup/)
* [W3School](https://www.w3schools.com/)

# Testing

I used [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) to test the styling and layout and responsiveness of the website on the different devices-Mobile, Tablet and Desktop.
I also used this to test my Javscript and fix any errors that arised.

[WSC CSS Validaion](https://jigsaw.w3.org/css-validator/) was used to validate my HTML & CSS code.

The console displays no errors during site testing

Devices Landscape-
Currently responsive on Moto G4, Galexy S5, Pixel 2, Pixel 2XL, iPhone, 5/SE, iPhone 6/7/8, iPhone 6/7/8 Plus, iPhone X,




# Bugs
1. I wanted to create a score system that added points when the player selected the correct answer and minus a point if the players 
selected the wrong answer. I was able to increment the score but encountered a issue when I tried to minus a point. DevTols console
was showing that my function was correct.  
**The Fix:** With the help of a fellow student, the bug was eventually resolved by adding a cosole.log into the else statement. 

2. When fetching the questions from the API there was a bug in the questions that had different symbols between the text e.g &%#
that I needed to remove.   
**The Fix:** I replaced the 'innerText' with innerHTML whicih then retrieves and sets the content in HTML format. 

3. My Scoreboard page was not showing when the user clicked on the button.   
**The Fix:** After a couple days I realised that I had 'display:none' in my css. Once this was removed the bug was fixed.


# Deployment
I deployed the websit using GitHub's pages. The steps are as follows:

1. Open GitHub in the browser.
2. Sign into my account.
3. Select my repositories.
4. Navigate to letsgetquizzicle.
5. On the top right select settings.
6. Scroll down to the GitHub Pages area.
7. From the Source dropdown menu click on Master Branch.
8. Refresh the page and scroll back down to the GitHub Pages area to view the link to your live website.
 
 ### Running the website Locally:

To clone the quizgame from GitHub:

1. Navigate to SophieH93/letsgetquizzicle.
2. Click the green Clone or Download button.
3. Copy the url in the dropdown box.
4. Using your favourite IDE open up your preferred terminal.
5. Navigate to your desired file location.
6. Copy the following code and input it into your terminal to clone the game.


# Credits
* **Simen Daehlin** my mentor.
* **Stack Overview**
* **Slack Overview** for particularly helping me with my score count.

# Disclaimer
**This websit is for educational purposes only.**

